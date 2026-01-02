"use client";

import { useState } from "react";
import { copyToClipboard } from "../utils/clipboard";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={
        className ||
        "text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
      }
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
