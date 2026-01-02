import { CopyButton } from "./CopyButton";

interface HashResultProps {
  label: string;
  hash: string;
}

export function HashResult({ label, hash }: HashResultProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <CopyButton text={hash} />
      </div>
      <div className="relative">
        <div
          className="min-h-[60px] px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200 break-all"
          role="textbox"
          aria-label={`${label} value`}
        >
          {hash}
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Length: {hash.length} characters
      </p>
    </div>
  );
}
