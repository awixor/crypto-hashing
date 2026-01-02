"use client";

import { useState, useMemo, useEffect } from "react";
import { computeAllHashes } from "./utils/hashing";
import { TextInput } from "./components/TextInput";
import { FileInput } from "./components/FileInput";
import { HashResult } from "./components/HashResult";
import { Toggle } from "./components/Toggle";

enum InputMode {
  Text = "text",
  File = "file",
}

export default function Home() {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.Text);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBytes, setFileBytes] = useState<Uint8Array | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadFile = async () => {
      if (!selectedFile) {
        setFileBytes(null);
        setIsLoadingFile(false);
        return;
      }

      setIsLoadingFile(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (cancelled) return;

        const arrayBuffer = e.target?.result as ArrayBuffer;

        setFileBytes(new Uint8Array(arrayBuffer));
        setIsLoadingFile(false);
      };
      reader.onerror = () => {
        if (cancelled) return;
        console.error("Error reading file");

        setIsLoadingFile(false);
        setFileBytes(null);
      };
      reader.readAsArrayBuffer(selectedFile);
    };

    loadFile();

    return () => {
      cancelled = true;
    };
  }, [selectedFile]);

  const hashInput = useMemo(() => {
    if (inputMode === InputMode.Text) {
      return input.trim() ? input : null;
    } else {
      return fileBytes;
    }
  }, [inputMode, input, fileBytes]);

  const hashes = useMemo(() => {
    return computeAllHashes(hashInput);
  }, [hashInput]);

  const handleClear = () => {
    if (inputMode === InputMode.Text) {
      setInput("");
    } else {
      setSelectedFile(null);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8">
        <div className="w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
              Hash Visualizer
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Hash text or files to instantly generate Keccak-256 and SHA-256
              hashes
            </p>
          </div>

          <Toggle
            items={[
              { label: "Text", value: InputMode.Text },
              { label: "File", value: InputMode.File },
            ]}
            activeValue={inputMode}
            onChange={(value) => {
              const mode = value as InputMode;
              setInputMode(mode);

              if (mode === InputMode.Text) {
                setSelectedFile(null);
              } else {
                setInput("");
              }
            }}
          />

          {inputMode === InputMode.Text ? (
            <TextInput
              value={input}
              onChange={setInput}
              onClear={handleClear}
            />
          ) : (
            <FileInput
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              isLoading={isLoadingFile}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HashResult
              label="Keccak-256"
              hash={hashes.keccak256}
              onCopy={() => handleCopy(hashes.keccak256)}
            />
            <HashResult
              label="SHA-256"
              hash={hashes.sha256}
              onCopy={() => handleCopy(hashes.sha256)}
            />
          </div>

          <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> The hashing functions are using the{" "}
              <a
                href="https://www.npmjs.com/package/@noble/hashes"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @noble/hashes
              </a>{" "}
              library, which provides fast, audited implementations for multiple
              hash algorithms.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
