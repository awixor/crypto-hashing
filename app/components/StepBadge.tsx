interface StepBadgeProps {
  stepNumber: number;
  title: string;
}

export function StepBadge({ stepNumber, title }: StepBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold"
        aria-label={`Step ${stepNumber}`}
      >
        {stepNumber}
      </span>
      <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
        {title}
      </h2>
    </div>
  );
}
