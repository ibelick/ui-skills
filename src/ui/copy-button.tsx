import { useState } from "react";
import { TextMorph } from "./text-morph";

type CopyButtonProps = {
  content: string;
};

export function CopyButton({ content }: CopyButtonProps) {
  const [text, setText] = useState("Copy");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setText("Copied");
      setTimeout(() => setText("Copy"), 2000);
    } catch {
      setText("Error");
      setTimeout(() => setText("Copy"), 2000);
    }
  };

  return (
    <div className="sticky top-4 z-10 flex w-full items-center justify-end px-4 sm:px-0">
      <button
        onClick={handleCopy}
        type="button"
        className="flex h-8 w-[80px] items-center justify-center rounded-full text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-900"
      >
        <TextMorph>{text}</TextMorph>
      </button>
    </div>
  );
}
