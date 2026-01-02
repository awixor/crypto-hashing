interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function TextInput({ value, onChange, onClear }: TextInputProps) {
  return (
    <div className="space-y-4">
      <label
        htmlFor="input"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Input Text
      </label>
      <textarea
        id="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type text to hash..."
        className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
      />
      {value && (
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClear}
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
