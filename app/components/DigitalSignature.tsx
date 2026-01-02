"use client";

import { useState } from "react";
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

  const handleSignature = (sig: string, rec: number) => {
    setSignature(sig);
    setRecovery(rec);
  };

  const handlePublicKey = (pubKey: string) => {
    setPublicKey(pubKey);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleMessageHash = (hash: string) => {
    setMessageHash(hash);
  };

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

      <HashMessage onMessageHash={handleMessageHash} onCopy={handleCopy} />

      <SignMessage
        messageHash={messageHash}
        onSignature={handleSignature}
        onCopy={handleCopy}
      />

      <RecoverPublicKey
        messageHash={messageHash}
        signature={signature}
        recovery={recovery}
        onPublicKey={handlePublicKey}
        onCopy={handleCopy}
      />

      <GenerateAddress publicKey={publicKey} onCopy={handleCopy} />

      <VerifySignature />
    </div>
  );
}
