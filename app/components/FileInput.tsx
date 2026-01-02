interface FileInputProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  isLoading?: boolean;
}

export function FileInput({
  onFileSelect,
  selectedFile,
  isLoading = false,
}: FileInputProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleClear = () => {
    onFileSelect(null);
    const input = document.getElementById("file-input") as HTMLInputElement;

    if (input) {
      input.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="file-input"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Upload File (Image, Document, etc.)
      </label>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="file-input"
          className={`flex-1 min-h-32 px-6 py-3 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-center flex items-center justify-center transition-colors ${
            isLoading
              ? "cursor-wait opacity-60"
              : "cursor-pointer hover:border-blue-500 dark:hover:border-blue-400"
          }`}
        >
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
            disabled={isLoading}
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {isLoading
              ? "Loading file..."
              : selectedFile
              ? selectedFile.name
              : "Click to select or drag and drop"}
          </span>
        </label>
        <div className="flex gap-4 justify-between">
          {selectedFile && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              File: {selectedFile.name} ({formatFileSize(selectedFile.size)})
            </p>
          )}
          {selectedFile && (
            <button
              onClick={handleClear}
              className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
