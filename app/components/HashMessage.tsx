"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { TextInput } from "./TextInput";
import { HashResult } from "./HashResult";
import { StepBadge } from "./StepBadge";
import { hashMessage } from "../utils/signature";

interface HashMessageProps {
  onMessageHash: (hash: string) => void;
}

export function HashMessage({ onMessageHash }: HashMessageProps) {
  const [message, setMessage] = useState("");

  const messageHash = useMemo(() => {
    if (!message.trim()) {
      return "";
    }
    try {
      return hashMessage(message);
    } catch (error) {
      console.error("Hashing error:", error);
      return "Error occurred";
    }
  }, [message]);

  const memoizedOnMessageHash = useCallback(
    (hash: string) => {
      onMessageHash(hash);
    },
    [onMessageHash]
  );

  useEffect(() => {
    memoizedOnMessageHash(messageHash);
  }, [messageHash, memoizedOnMessageHash]);

  return (
    <div className="space-y-4">
      <StepBadge stepNumber={1} title="Hash the Message" />
      <TextInput
        value={message}
        onChange={setMessage}
        onClear={() => setMessage("")}
      />
      {messageHash && (
        <HashResult label="Message Hash (Keccak-256)" hash={messageHash} />
      )}
    </div>
  );
}
