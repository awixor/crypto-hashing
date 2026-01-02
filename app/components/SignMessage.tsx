import { useState } from "react";
import { HashResult } from "./HashResult";
import { signMessage, generatePrivateKey } from "../utils/signature";

interface SignMessageProps {
  messageHash: string;
  onSignature: (signature: string, recovery: number) => void;
  onCopy: (text: string) => void;
}

export function SignMessage({
  messageHash,
  onSignature,
  onCopy,
}: SignMessageProps) {
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recovery, setRecovery] = useState<number | null>(null);

  const handleSign = () => {
    if (!messageHash || !privateKey.trim()) {
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
    }
  };

  const handleGeneratePrivateKey = () => {
    const newPrivateKey = generatePrivateKey();
    setPrivateKey(newPrivateKey);
  };

  // Calculate v and yParity values for readability
  const vLegacy = recovery !== null ? 27 + recovery : null;
  const chainId = 1; // Ethereum mainnet
  const vEIP155 = recovery !== null ? chainId * 2 + 35 + recovery : null;
  const yParity = recovery;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
          2
        </span>
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          Sign the Message
        </h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Private Key (Randomized Each time you generate)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Enter or generate a private key"
              className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
            <button
              onClick={handleGeneratePrivateKey}
              className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Generate
            </button>
          </div>
        </div>
        <button
          onClick={handleSign}
          disabled={!messageHash || !privateKey.trim()}
          className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors"
        >
          Sign Message
        </button>
        {signature && (
          <>
            <HashResult
              label="Signature"
              hash={signature}
              onCopy={() => onCopy(signature)}
            />
            {recovery !== null && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Recovery Bit
                    </label>
                    <button
                      onClick={() => onCopy(recovery.toString())}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200">
                    {recovery}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      v (Legacy Ethereum/Bitcoin)
                    </label>
                    <button
                      onClick={() => onCopy(vLegacy!.toString())}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200">
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
                      <button
                        onClick={() => onCopy(vEIP155!.toString())}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200">
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
                      <button
                        onClick={() => onCopy(yParity!.toString())}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-800 dark:text-zinc-200">
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
