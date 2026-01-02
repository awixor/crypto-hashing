"use client";

import { useState } from "react";
import { HashResult } from "./HashResult";
import { StepBadge } from "./StepBadge";
import { CopyButton } from "./CopyButton";
import { signMessage, generatePrivateKey } from "../utils/signature";

interface SignMessageProps {
  messageHash: string;
  onSignature: (signature: string, recovery: number) => void;
}

export function SignMessage({ messageHash, onSignature }: SignMessageProps) {
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recovery, setRecovery] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSign = () => {
    setError(null);
    if (!messageHash || !privateKey.trim()) {
      setError("Message hash and private key are required");
      return;
    }

    try {
      const result = signMessage(messageHash, privateKey);
      setSignature(result.signature);
      setRecovery(result.recovery);
      onSignature(result.signature, result.recovery);
    } catch (error) {
      console.error("Signing error:", error);
      setSignature("Error occurred");
      setError("Failed to sign message. Please check your inputs.");
    }
  };

  const handleGeneratePrivateKey = () => {
    const newPrivateKey = generatePrivateKey();
    setPrivateKey(newPrivateKey);
  };

  const vLegacy = recovery !== null ? 27 + recovery : null;
  const chainId = 1; // Ethereum mainnet
  const vEIP155 = recovery !== null ? chainId * 2 + 35 + recovery : null;
  const yParity = recovery;

  return (
    <div className="space-y-4">
      <StepBadge stepNumber={2} title="Sign the Message" />
      <div className="space-y-4">
        <div>
          <label
            htmlFor="private-key-input"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Private Key (Randomized Each time you generate)
          </label>
          <div className="flex gap-2">
            <input
              id="private-key-input"
              type="text"
              value={privateKey}
              onChange={(e) => {
                setPrivateKey(e.target.value);
                setError(null);
              }}
              placeholder="Enter or generate a private key (64 hex characters)"
              className={`flex-1 px-4 py-3 rounded-lg border ${
                error && privateKey
                  ? "border-red-500 dark:border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
              } bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm`}
              aria-invalid={error && privateKey ? "true" : "false"}
              aria-describedby={
                error && privateKey ? "private-key-error" : undefined
              }
            />
            <button
              onClick={handleGeneratePrivateKey}
              className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Generate random private key"
            >
              Generate
            </button>
          </div>
          {error && privateKey && (
            <p
              id="private-key-error"
              className="mt-1 text-xs text-red-600 dark:text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
        <button
          onClick={handleSign}
          disabled={!messageHash || !privateKey.trim()}
          className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
          aria-label="Sign message with private key"
        >
          Sign Message
        </button>
        {signature && (
          <>
            <HashResult label="Signature" hash={signature} />
            {recovery !== null && vLegacy !== null && vEIP155 !== null && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Recovery Bit
                    </label>
                    <CopyButton text={recovery.toString()} />
                  </div>
                  <div
                    className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200"
                    role="textbox"
                    aria-label="Recovery bit value"
                  >
                    {recovery}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      v (Legacy Ethereum/Bitcoin)
                    </label>
                    <CopyButton text={vLegacy.toString()} />
                  </div>
                  <div
                    className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200"
                    role="textbox"
                    aria-label="Legacy v value"
                  >
                    {vLegacy}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Format: 27 + recovery (27 or 28)
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        v (EIP-155)
                      </label>
                      <CopyButton text={vEIP155.toString()} />
                    </div>
                    <div
                      className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200"
                      role="textbox"
                      aria-label="EIP-155 v value"
                    >
                      {vEIP155}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Format: chainId * 2 + 35 + recovery (37 or 38 for mainnet)
                      - Prevents replay attacks
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        yParity (EIP-1559/EIP-2930)
                      </label>
                      <CopyButton text={yParity?.toString() ?? ""} />
                    </div>
                    <div
                      className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200"
                      role="textbox"
                      aria-label="yParity value"
                    >
                      {yParity}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Format: recovery (0 or 1) - Used in Type 1 & Type 2
                      transactions
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
