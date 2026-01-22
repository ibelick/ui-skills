import { useState } from "react";
import { TextMorph } from "./text-morph";

type CopyButtonProps = {
  content: string;
  className?: string;
  showText?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function CopyButton({
  content,
  className,
  showText = true,
  ...props
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Ignore error
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`flex h-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-neutral-900 ${className}`}
      aria-label="Copy to clipboard"
      {...props}
    >
      {showText ? (
        <div className="flex w-[70px] items-center justify-center text-sm font-medium">
          <TextMorph>{isCopied ? "Copied" : "Copy"}</TextMorph>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isCopied ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>
          )}
        </svg>
      )}
    </button>
  );
}
