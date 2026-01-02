import { DigitalSignature } from "../components/DigitalSignature";

export default function DigitalSignaturePage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-4xl px-8 py-16">
        <DigitalSignature />
      </div>
    </main>
  );
}
