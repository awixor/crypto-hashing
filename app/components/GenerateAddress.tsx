"use client";

import { useState } from "react";
import { HashResult } from "./HashResult";
import { StepBadge } from "./StepBadge";
import { publicKeyToAddress } from "../utils/signature";
import { keccak_256 } from "@noble/hashes/sha3";
import { hexToBytes, bytesToHex } from "@noble/hashes/utils";

interface GenerateAddressProps {
  publicKey: string;
}

export function GenerateAddress({ publicKey }: GenerateAddressProps) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [addressSteps, setAddressSteps] = useState<{
    pubKeyWithoutPrefix: string;
    keccakHash: string;
    last20Bytes: string;
  } | null>(null);

  const handleGenerateAddress = () => {
    setError(null);
    if (!publicKey) {
      setError("Public key is required");
      return;
    }

    try {
      const addr = publicKeyToAddress(publicKey);
      setAddress(addr);

      const pubKeyBytes = hexToBytes(publicKey);
      const pubKeyWithoutPrefix = pubKeyBytes.slice(1);
      const hash = keccak_256(pubKeyWithoutPrefix);
      const addressBytes = hash.slice(-20);

      setAddressSteps({
        pubKeyWithoutPrefix: bytesToHex(pubKeyWithoutPrefix),
        keccakHash: bytesToHex(hash),
        last20Bytes: bytesToHex(addressBytes),
      });
    } catch (error) {
      console.error("Address generation error:", error);
      setAddress("Error occurred");
      setAddressSteps(null);
      setError("Failed to generate address. Please check your public key.");
    }
  };

  return (
    <div className="space-y-4">
      <StepBadge stepNumber={4} title="Generate Address from Public Key" />
      {error && (
        <div
          className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          role="alert"
        >
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      <button
        onClick={handleGenerateAddress}
        disabled={!publicKey}
        className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
        aria-label="Generate Ethereum address from public key"
      >
        Generate Address
      </button>
      {address && (
        <>
          <HashResult label="Ethereum Address" hash={address} />
          <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
            <p>
              Generated using:{" "}
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                publicKeyToAddress(publicKey)
              </code>
            </p>
            {addressSteps && (
              <div className="space-y-1 pl-2 border-l-2 border-zinc-300 dark:border-zinc-700">
                <p>
                  1- Removed first byte (0x04):{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono text-[10px]">
                    {addressSteps.pubKeyWithoutPrefix.slice(0, 20)}...
                  </code>
                </p>
                <p>
                  2- Hashed with Keccak-256:{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono text-[10px]">
                    {addressSteps.keccakHash.slice(0, 20)}...
                  </code>
                </p>
                <p>
                  3- Took last 20 bytes:{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono text-[10px]">
                    {addressSteps.last20Bytes}
                  </code>
                </p>
                <p>
                  4- Added 0x prefix:{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono text-[10px]">
                    {address}
                  </code>
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
