interface ToggleItem {
  label: string;
  value: string;
}

interface ToggleProps {
  items: ToggleItem[];
  activeValue: string;
  onChange: (value: string) => void;
}

export function Toggle({ items, activeValue, onChange }: ToggleProps) {
  return (
    <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            activeValue === item.value
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
