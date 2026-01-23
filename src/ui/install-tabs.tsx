import { useState } from "react";
import { CopyButton } from "./copy-button";

type InstallTab = {
  id: "npx" | "bash";
  label: string;
  command: string;
  content: React.ReactNode;
};

const tabs: InstallTab[] = [
  {
    id: "npx",
    label: "npx",
    command: "npx skills add ibelick/ui-skills",
    content: (
      <>
        <span className="text-[#953800]">npx</span>
        <span className="text-[#0a3069]"> skills</span>
        <span className="text-[#0550ae]"> add</span>
        <span className="text-parchment-400"> ibelick/ui-skills</span>
      </>
    ),
  },
  {
    id: "bash",
    label: "bash",
    command: "curl -fsSL https://ui-skills.com/install | bash",
    content: (
      <>
        <span className="text-[#953800]">curl</span>
        <span className="text-[#0550ae]"> -fsSL</span>
        <span className="text-[#0a3069]"> https://ui-skills.com/install</span>
        <span className="text-[#cf222e]"> |</span>
        <span className="text-[#953800]"> bash</span>
      </>
    ),
  },
];

export function InstallTabs() {
  const [activeTab, setActiveTab] = useState<InstallTab>(tabs[0]);

  return (
    <div className="border-parchment-200 rounded-none border-t border-b bg-white shadow-2xs sm:rounded-[8px] sm:border-none sm:ring-1 sm:ring-black/10">
      <div className="flex items-center gap-3 py-2 pl-6">
        <span className="bg-parchment-700 flex size-4 items-center justify-center rounded-[2px] text-parchment-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
          >
            <path d="M5 7l5 5l-5 5" />
            <path d="M12 19l7 0" />
          </svg>
        </span>
        <div className="flex items-center gap-0.5">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-parchment-500 flex items-center justify-center rounded-md border px-1.5 py-0.5 font-mono text-xs font-medium transition-colors ${isActive
                  ? "border-parchment-200 bg-parchment-100 text-parchment-900"
                  : "hover:text-parchment-900 border-transparent bg-transparent"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="border-parchment-200 flex items-center justify-between border-t py-3.5 pr-4 pl-6">
        <code className="font-mono text-[15px]">{activeTab.content}</code>
        <div className="flex items-center gap-1">
          <CopyButton
            content={activeTab.command}
            showText={false}
            className="size-8"
            data-s-event="install"
          />
        </div>
      </div>
    </div>
  );
}
