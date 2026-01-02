"use client";

import { useState } from "react";
import { HashVisualizer } from "./components/HashVisualizer";
import { DigitalSignature } from "./components/DigitalSignature";
import { Toggle } from "./components/Toggle";

enum AppMode {
  HashVisualizer = "hash",
  DigitalSignature = "signature",
}

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>(AppMode.HashVisualizer);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8">
        <div className="w-full space-y-8">
          <Toggle
            items={[
              { label: "Hash Visualizer", value: AppMode.HashVisualizer },
              { label: "Digital Signature", value: AppMode.DigitalSignature },
            ]}
            activeValue={appMode}
            onChange={(value) => setAppMode(value as AppMode)}
          />

          {appMode === AppMode.HashVisualizer ? (
            <HashVisualizer />
          ) : (
            <DigitalSignature />
          )}
        </div>
      </main>
    </div>
  );
}
