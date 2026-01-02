"use client";

import { useState, useMemo } from "react";
import { hashKeccak256 } from "./utils/keccak";
import { HashInput } from "./components/HashInput";

export default function Home() {
  const [input, setInput] = useState("");

  const hash256 = useMemo(() => {
    if (!input.trim()) {
      return "";
    }
    try {
      return hashKeccak256(input);
    } catch (error) {
      console.error("Hashing error:", error);
      return "Error occurred";
    }
  }, [input]);

  const handleClear = () => {
    setInput("");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8">
        <div className="w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
              Keccak Hash Visualizer
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Type text below to instantly generate Keccak-256 hash
            </p>
          </div>

          <HashInput value={input} onChange={setInput} onClear={handleClear} />

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Keccak-256
                </label>
                <button
                  onClick={() => handleCopy(hash256)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Copy
                </button>
              </div>
              <div className="relative">
                <div className="min-h-[50px] px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200 break-all">
                  {hash256}
                </div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Length: {hash256.length} characters
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> The hashing functions are currently using
              the{" "}
              <a
                href="https://www.npmjs.com/package/js-sha3"
                target="_blank"
                rel="noopener noreferrer"
              >
                js-sha3
              </a>{" "}
              library.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
