import { Menu } from "./menu";
import {
  CheckIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useId, useRef, useState } from "react";
import {
  addSkillToCollection,
  createCollection,
  fetchLibrary,
  readLibraryCache,
  removeSkillFromCollection,
  saveSkill,
  unsaveSkill,
  writeLibraryCache,
} from "../lib/library-client";
import { getCachedSession } from "../lib/session-client";
import { LIBRARY_LIMITS, type LibrarySnapshot } from "../lib/library-types";

function keepCollectionOrder(
  previous: LibrarySnapshot | null,
  next: LibrarySnapshot,
) {
  if (!previous) return next;
  const byId = new Map(
    next.collections.map((collection) => [collection.id, collection]),
  );
  const collections = previous.collections.flatMap((collection) => {
    const current = byId.get(collection.id);
    return current ? [current] : [];
  });
  const seen = new Set(collections.map((collection) => collection.id));
  for (const collection of next.collections) {
    if (!seen.has(collection.id)) collections.push(collection);
  }
  return { ...next, collections };
}

const itemClass =
  "type-body-md text-content-primary data-highlighted:bg-fill-strong relative flex h-8 w-full cursor-pointer items-center rounded-md pr-2 pl-8 text-left outline-none data-disabled:opacity-60";

const triggerClass =
  "data-popup-open:bg-fill-strong data-popup-open:text-content-primary inline-flex size-7 cursor-pointer items-center justify-center rounded-lg bg-transparent p-1 text-content-secondary transition-colors hover:bg-fill-strong hover:text-content-primary focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-content-primary disabled:opacity-60";

const fieldClass =
  "type-body-md text-content-primary placeholder:text-content-muted w-full rounded-md bg-surface-default py-1.5 pr-8 pl-2 ring-1 ring-line-default outline-none focus:outline-none focus-visible:outline-none";

type SkillFavoriteProps = {
  skillPath: string;
};

export function SkillFavorite({ skillPath }: SkillFavoriteProps) {
  const titleId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [library, setLibrary] = useState<LibrarySnapshot | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const requestId = useRef(0);
  const saved = library?.savedSkillPaths.includes(skillPath) ?? false;

  useEffect(() => {
    let active = true;
    const id = ++requestId.current;
    getCachedSession().then(async ({ data }) => {
      if (!active || !data?.user) return;
      const cached = readLibraryCache();
      if (cached) {
        if (id === requestId.current) setLibrary(cached);
        return;
      }
      try {
        const result = await fetchLibrary();
        if (active && id === requestId.current) {
          writeLibraryCache(result.library);
          setLibrary(result.library);
        }
      } catch {
        if (active && id === requestId.current) {
          setError("Your library could not be loaded.");
        }
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const run = async (
    action: () => Promise<LibrarySnapshot>,
    keepOrder = false,
  ) => {
    const id = ++requestId.current;
    if (!keepOrder) setPending(true);
    setError(null);
    try {
      const snapshot = await action();
      if (id !== requestId.current) return;
      setLibrary((current) => {
        const next = keepOrder
          ? keepCollectionOrder(current, snapshot)
          : snapshot;
        writeLibraryCache(next);
        return next;
      });
    } catch (caught) {
      if (id !== requestId.current) return;
      setError(
        caught instanceof Error
          ? caught.message
          : "That action could not be completed. Please try again.",
      );
      throw caught;
    } finally {
      if (id === requestId.current && !keepOrder) setPending(false);
    }
  };

  const toggleRow = (
    rowId: string,
    checked: boolean,
    action: () => Promise<LibrarySnapshot>,
  ) => {
    const previous = library;
    const issuedAt = requestId.current;
    setLibrary((current) => {
      if (!current) return current;
      const next =
        rowId === "favorites"
          ? {
              ...current,
              savedSkillPaths: checked
                ? [
                    ...current.savedSkillPaths.filter(
                      (path) => path !== skillPath,
                    ),
                    skillPath,
                  ]
                : current.savedSkillPaths.filter((path) => path !== skillPath),
            }
          : {
              ...current,
              collections: current.collections.map((collection) =>
                collection.id === rowId
                  ? {
                      ...collection,
                      skillPaths: checked
                        ? collection.skillPaths.includes(skillPath)
                          ? collection.skillPaths
                          : [...collection.skillPaths, skillPath]
                        : collection.skillPaths.filter(
                            (path) => path !== skillPath,
                          ),
                    }
                  : collection,
              ),
            };
      writeLibraryCache(next);
      return next;
    });
    void run(action, true).catch(() => {
      if (previous && requestId.current === issuedAt + 1) {
        writeLibraryCache(previous);
        setLibrary(previous);
      }
    });
  };

  const rows = [
    {
      id: "favorites",
      label: "Favorites",
      checked: saved,
      toggle: (checked: boolean) =>
        checked ? saveSkill(skillPath) : unsaveSkill(skillPath),
    },
    ...(library?.collections ?? []).map((collection) => ({
      id: collection.id,
      label: collection.title,
      checked: collection.skillPaths.includes(skillPath),
      toggle: (checked: boolean) =>
        checked
          ? addSkillToCollection(collection.id, skillPath)
          : removeSkillFromCollection(collection.id, skillPath),
    })),
  ];

  return (
    <Menu.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setOpen(false);
          return;
        }
        void getCachedSession().then(({ data }) => {
          if (!data?.user) {
            const returnTo = `${location.pathname}${location.search}`;
            location.assign(`/login?returnTo=${encodeURIComponent(returnTo)}`);
            return;
          }
          setOpen(true);
          if (!saved)
            void run(async () => (await saveSkill(skillPath)).library);
        });
      }}
    >
      <Menu.Trigger
        className={triggerClass}
        aria-label={saved ? "In your favorites" : "Add to favorites"}
        disabled={pending}
      >
        {saved ? (
          <CheckCircleIcon
            className="size-4 text-[#34c759]"
            aria-hidden="true"
          />
        ) : (
          <PlusCircleIcon className="size-4" aria-hidden="true" />
        )}
      </Menu.Trigger>
      <Menu.Popup className="w-60 rounded-lg p-1">
        <div className="max-h-56 overflow-y-auto">
          {rows.map((row) => (
            <Menu.CheckboxItem
              key={row.id}
              className={itemClass}
              checked={row.checked}
              closeOnClick={false}
              label={row.label}
              onCheckedChange={(checked) => {
                toggleRow(
                  row.id,
                  checked,
                  async () => (await row.toggle(checked)).library,
                );
              }}
            >
              <Menu.CheckboxItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon className="size-3.5" aria-hidden="true" />
              </Menu.CheckboxItemIndicator>
              <span className="truncate">{row.label}</span>
            </Menu.CheckboxItem>
          ))}
        </div>
        <form
          className="px-1 py-1"
          onSubmit={(event) => {
            event.preventDefault();
            const nextTitle = title.trim();
            if (!nextTitle) return;
            void run(async () => {
              const result = await createCollection({
                title: nextTitle,
                skillPath,
              });
              setTitle("");
              return result.library;
            });
          }}
        >
          <label htmlFor={titleId} className="sr-only">
            New collection
          </label>
          <div className="relative">
            <input
              id={titleId}
              value={title}
              maxLength={LIBRARY_LIMITS.title}
              required
              autoComplete="off"
              placeholder="New collection"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={fieldClass}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => event.stopPropagation()}
            />
            <button
              type="submit"
              aria-label="Create collection"
              disabled={pending}
              className="text-content-secondary hover:text-content-primary focus-visible:outline-content-primary absolute top-1/2 right-1 inline-flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md focus-visible:outline-1 disabled:opacity-60"
            >
              <PlusIcon className="size-3.5" aria-hidden="true" />
            </button>
          </div>
          {error ? (
            <p
              id={errorId}
              role="alert"
              className="type-body-sm text-content-secondary mt-1 px-1 text-pretty"
            >
              {error}
            </p>
          ) : null}
        </form>
      </Menu.Popup>
    </Menu.Root>
  );
}
