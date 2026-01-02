"use client";

import { useState } from "react";
import { verifySignature } from "../utils/signature";
import { StepBadge } from "./StepBadge";
import { CheckIcon } from "./icons/CheckIcon";
import { XIcon } from "./icons/XIcon";

export function VerifySignature() {
  const [messageHash, setMessageHash] = useState("");
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = () => {
    setError(null);
    setIsValid(null);

    if (!messageHash.trim() || !signature.trim() || !publicKey.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      const result = verifySignature(messageHash, signature, publicKey);
      setIsValid(result);
    } catch (error) {
      console.error("Verification error:", error);
      setIsValid(false);
      setError("Failed to verify signature. Please check your inputs.");
    }
  };

  return (
    <div className="space-y-4">
      <StepBadge stepNumber={5} title="Verify Signature" />
      <div className="space-y-4">
        {error && (
          <div
            className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            role="alert"
          >
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        <div>
          <label
            htmlFor="verify-message-hash"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Message Hash
          </label>
          <input
            id="verify-message-hash"
            type="text"
            value={messageHash}
            onChange={(e) => {
              setMessageHash(e.target.value);
              setIsValid(null);
              setError(null);
            }}
            placeholder="Enter message hash (Keccak-256, 64 hex characters)"
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            aria-label="Message hash input"
          />
        </div>
        <div>
          <label
            htmlFor="verify-signature"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Signature
          </label>
          <input
            id="verify-signature"
            type="text"
            value={signature}
            onChange={(e) => {
              setSignature(e.target.value);
              setIsValid(null);
              setError(null);
            }}
            placeholder="Enter signature (64 bytes, hex)"
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            aria-label="Signature input"
          />
        </div>
        <div>
          <label
            htmlFor="verify-public-key"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Public Key
          </label>
          <input
            id="verify-public-key"
            type="text"
            value={publicKey}
            onChange={(e) => {
              setPublicKey(e.target.value);
              setIsValid(null);
              setError(null);
            }}
            placeholder="Enter public key (uncompressed, 65 bytes, hex)"
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            aria-label="Public key input"
          />
        </div>
        <button
          onClick={handleVerify}
          disabled={
            !messageHash.trim() || !signature.trim() || !publicKey.trim()
          }
          className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
          aria-label="Verify signature"
        >
          Verify Signature
        </button>
        {isValid !== null && (
          <div
            className={`p-4 rounded-lg border-2 ${
              isValid
                ? "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400"
                : "bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-400"
            }`}
          >
            <div className="flex items-center gap-2">
              {isValid ? (
                <>
                  <CheckIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                    Signature is Valid
                  </span>
                </>
              ) : (
                <>
                  <XIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                    Signature is Invalid
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {isValid
                ? "The signature matches the message hash and public key."
                : "The signature does not match the message hash and public key. Please verify your inputs."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
