"use client";

import { useState } from "react";
import { HashResult } from "./HashResult";
import { StepBadge } from "./StepBadge";
import { recoverPublicKey } from "../utils/signature";

interface RecoverPublicKeyProps {
  messageHash: string;
  signature: string;
  recovery: number | null;
  onPublicKey: (publicKey: string) => void;
}

export function RecoverPublicKey({
  messageHash,
  signature,
  recovery,
  onPublicKey,
}: RecoverPublicKeyProps) {
  const [publicKey, setPublicKey] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRecoverPublicKey = () => {
    setError(null);
    if (!messageHash || !signature || recovery === null) {
      setError("Message hash, signature, and recovery bit are required");
      return;
    }

    try {
      const recoveredPubKey = recoverPublicKey(
        messageHash,
        signature,
        recovery
      );
      setPublicKey(recoveredPubKey);
      onPublicKey(recoveredPubKey);
    } catch (error) {
      console.error("Recovery error:", error);
      setPublicKey("Error occurred");
      setError("Failed to recover public key. Please check your inputs.");
    }
  };

  return (
    <div className="space-y-4">
      <StepBadge stepNumber={3} title="Recover Public Key" />
      {error && (
        <div
          className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          role="alert"
        >
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      <button
        onClick={handleRecoverPublicKey}
        disabled={!messageHash || !signature || recovery === null}
        className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
        aria-label="Recover public key from signature"
      >
        Recover Public Key
      </button>
      {publicKey && (
        <>
          <HashResult
            label="Recovered Public Key (Uncompressed)"
            hash={publicKey}
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Recovered using:{" "}
            <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
              recoverPublicKey(messageHash, signature, recovery)
            </code>
          </p>
        </>
      )}
    </div>
  );
}
