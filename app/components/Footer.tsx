import { GitHubIcon } from "./icons/GitHubIcon";

const githubUrl = "https://github.com/awixor/crypto-hashing";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm mt-auto">
      <div className="max-w-4xl mx-auto px-8 py-6">
        <div className="flex items-center justify-center">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors flex items-center gap-2"
            aria-label="View source code on GitHub"
          >
            <GitHubIcon className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
