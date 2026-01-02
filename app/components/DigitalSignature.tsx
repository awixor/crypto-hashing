"use client";

import { useState, useCallback } from "react";
import { HashMessage } from "./HashMessage";
import { SignMessage } from "./SignMessage";
import { RecoverPublicKey } from "./RecoverPublicKey";
import { GenerateAddress } from "./GenerateAddress";
import { VerifySignature } from "./VerifySignature";

export function DigitalSignature() {
  const [messageHash, setMessageHash] = useState("");
  const [signature, setSignature] = useState("");
  const [recovery, setRecovery] = useState<number | null>(null);
  const [publicKey, setPublicKey] = useState("");

  const handleSignature = useCallback((signature: string, recovery: number) => {
    setSignature(signature);
    setRecovery(recovery);
  }, []);

  const handlePublicKey = useCallback((pubKey: string) => {
    setPublicKey(pubKey);
  }, []);

  const handleMessageHash = useCallback((hash: string) => {
    setMessageHash(hash);
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Digital Signature Process
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Hash a message, sign it, recover the public key, and generate an
          address
        </p>
      </div>

      <HashMessage onMessageHash={handleMessageHash} />

      <SignMessage messageHash={messageHash} onSignature={handleSignature} />

      <RecoverPublicKey
        messageHash={messageHash}
        signature={signature}
        recovery={recovery}
        onPublicKey={handlePublicKey}
      />

      <GenerateAddress publicKey={publicKey} />

      <VerifySignature />
    </div>
  );
}
