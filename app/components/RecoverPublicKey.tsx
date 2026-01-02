import { useState } from "react";
import { HashResult } from "./HashResult";
import { recoverPublicKey } from "../utils/signature";

interface RecoverPublicKeyProps {
  messageHash: string;
  signature: string;
  recovery: number | null;
  onPublicKey: (publicKey: string) => void;
  onCopy: (text: string) => void;
}

export function RecoverPublicKey({
  messageHash,
  signature,
  recovery,
  onPublicKey,
  onCopy,
}: RecoverPublicKeyProps) {
  const [publicKey, setPublicKey] = useState("");

  const handleRecoverPublicKey = () => {
    if (!messageHash || !signature || recovery === null) {
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
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
          3
        </span>
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          Recover Public Key
        </h2>
      </div>
      <button
        onClick={handleRecoverPublicKey}
        disabled={!messageHash || !signature || recovery === null}
        className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
      >
        Recover Public Key
      </button>
      {publicKey && (
        <>
          <HashResult
            label="Recovered Public Key (Uncompressed)"
            hash={publicKey}
            onCopy={() => onCopy(publicKey)}
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
