"use client";

import { useState, useMemo, useEffect } from "react";
import { TextInput } from "./TextInput";
import { HashResult } from "./HashResult";
import { hashMessage } from "../utils/signature";

interface HashMessageProps {
  onMessageHash: (hash: string) => void;
  onCopy: (text: string) => void;
}

export function HashMessage({ onMessageHash, onCopy }: HashMessageProps) {
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

  useEffect(() => {
    onMessageHash(messageHash);
  }, [messageHash, onMessageHash]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
          1
        </span>
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          Hash the Message
        </h2>
      </div>
      <TextInput
        value={message}
        onChange={setMessage}
        onClear={() => setMessage("")}
      />
      {messageHash && (
        <HashResult
          label="Message Hash (Keccak-256)"
          hash={messageHash}
          onCopy={() => onCopy(messageHash)}
        />
      )}
    </div>
  );
}
