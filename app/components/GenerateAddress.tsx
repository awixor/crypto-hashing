import { useState } from "react";
import { HashResult } from "./HashResult";
import { publicKeyToAddress } from "../utils/signature";
import { keccak_256 } from "@noble/hashes/sha3";
import { hexToBytes, bytesToHex } from "@noble/hashes/utils";

interface GenerateAddressProps {
  publicKey: string;
  onCopy: (text: string) => void;
}

export function GenerateAddress({ publicKey, onCopy }: GenerateAddressProps) {
  const [address, setAddress] = useState("");
  const [addressSteps, setAddressSteps] = useState<{
    pubKeyWithoutPrefix: string;
    keccakHash: string;
    last20Bytes: string;
  } | null>(null);

  const handleGenerateAddress = () => {
    if (!publicKey) {
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
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
          4
        </span>
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          Generate Address from Public Key
        </h2>
      </div>
      <button
        onClick={handleGenerateAddress}
        disabled={!publicKey}
        className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
      >
        Generate Address
      </button>
      {address && (
        <>
          <HashResult
            label="Ethereum Address"
            hash={address}
            onCopy={() => onCopy(address)}
          />
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
