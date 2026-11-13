import { AnimatePresence, motion } from "motion/react";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Props = {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
};

function LoaderIcon({
  className = "",
  size = 14,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 0.8,
        ease: "linear",
      }}
      className={className}
      style={{ display: "inline-flex" }}
    >
      <ArrowPathIcon className="size-4" width={size} height={size} aria-hidden="true" />
    </motion.span>
  );
}

export default function NewsletterInput({
  title = "Get updates",
  description = "Fresh design engineering skills, news and jobs",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "subscribing" | "subscribed">(
    "idle",
  );
  const [botField, setBotField] = useState("");
  const [error, setError] = useState("");
  const startedAtRef = useRef(Date.now());
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const submit = async () => {
    if (!email.trim() || status !== "idle") return;

    setError("");
    setStatus("subscribing");

    try {
      const response = await fetch(
        "https://api.interfaceoffice.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            source: "ui-skills",
            honeypot: botField,
            startedAt: startedAtRef.current,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus("subscribed");
      setEmail("");

      resetTimerRef.current = window.setTimeout(() => {
        setError("");
        setStatus("idle");
      }, 1600);
    } catch {
      setError("Couldn't subscribe right now. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="pt-16 sm:pt-20" data-newsletter-widget>
      <hr className="border-line-default border-px mx-auto w-1/4 pb-16 sm:pb-20" />
      <div className="container-3xl">
        <div className="mx-auto w-full max-w-xl">
          <h2 className="type-body-md w-full text-content-primary text-center font-medium text-balance">
            {title}
          </h2>
          <p className="type-body-md w-full text-content-secondary mt-0.5 text-center text-pretty">
            {description}
          </p>
        </div>

        <div className="mt-5">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>

          <div className="relative">
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              name="website"
              value={botField}
              onChange={(event) => setBotField(event.target.value)}
              className="pointer-events-none absolute inset-0 -z-10 h-0 w-0 opacity-0"
            />

            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={placeholder}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              disabled={status !== "idle"}
              aria-invalid={error ? "true" : "false"}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void submit();
                }
              }}
              className="type-body-md text-content-primary placeholder:type-body-md placeholder:text-content-muted focus:border-[#A5A5A5]/40 relative z-0 h-12 w-full rounded-full border border-line-default bg-surface-default px-4 pr-36 transition-colors outline-none"
            />

            <button
              type="button"
              disabled={status !== "idle"}
              onClick={() => void submit()}
              className={`type-body-md bg-fill-inverse text-content-inverse hover:bg-fill-inverse focus-visible:outline-content-primary disabled:hover:bg-fill-inverse absolute top-1/2 right-1 z-10 inline-flex h-10 min-w-[112px] -translate-y-1/2 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent px-5 transition-[opacity,background-color] duration-150 ease-out focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-not-allowed ${status === "subscribing" ? "opacity-70" : "opacity-100"
                }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {status === "idle" ? (
                  <motion.span
                    key="idle-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="pointer-events-none inline-flex items-center whitespace-nowrap"
                  >
                    {buttonLabel}
                  </motion.span>
                ) : null}

                {status === "subscribing" ? (
                  <motion.span
                    key="loading-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="pointer-events-none inline-flex items-center whitespace-nowrap"
                  >
                    <LoaderIcon />
                  </motion.span>
                ) : null}

                {status === "subscribed" ? (
                  <motion.span
                    key="success-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="pointer-events-none inline-flex items-center whitespace-nowrap"
                  >
                    <CheckCircleIcon className="size-4 shrink-0" aria-hidden="true" />
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>
          </div>

          {error ? (
            <p className="mt-2 text-sm text-red-700 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
