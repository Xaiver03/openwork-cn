'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAccomplish } from '../../lib/accomplish';
import { analytics } from '../../lib/analytics';
import { CornerDownLeft, Loader2, Folder, X } from 'lucide-react';

interface TaskInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  large?: boolean;
  autoFocus?: boolean;
  workingDirectory?: string | null;
  onWorkingDirectoryChange?: (directory: string | null) => void;
}

export default function TaskInputBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  isLoading = false,
  disabled = false,
  large = false,
  autoFocus = false,
  workingDirectory = null,
  onWorkingDirectoryChange,
}: TaskInputBarProps) {
  const { t } = useTranslation();
  const isDisabled = disabled || isLoading;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const accomplish = getAccomplish();

  // Use translated placeholder if not provided
  const effectivePlaceholder = placeholder || t('taskInput.placeholder');

  const handleSelectDirectory = async () => {
    try {
      const directory = await accomplish.selectDirectory();
      if (directory && onWorkingDirectoryChange) {
        onWorkingDirectoryChange(directory);
      }
    } catch (error) {
      console.error('Failed to select directory:', error);
    }
  };

  const handleClearDirectory = () => {
    if (onWorkingDirectoryChange) {
      onWorkingDirectoryChange(null);
    }
  };

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="space-y-2">
      {/* Working Directory Display */}
      {workingDirectory && (
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
          <Folder className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1 truncate text-muted-foreground">
            {workingDirectory}
          </span>
          <button
            onClick={handleClearDirectory}
            className="rounded p-1 hover:bg-background transition-colors"
            title="Clear working directory"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="relative flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2.5 shadow-sm transition-all duration-200 ease-accomplish focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
        {/* Folder button */}
        <button
          type="button"
          onClick={handleSelectDirectory}
          disabled={isDisabled}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 ease-accomplish hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          title="Select working directory"
        >
          <Folder className="h-4 w-4" />
        </button>

        {/* Text input */}
        <textarea
          data-testid="task-input-textarea"
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={effectivePlaceholder}
          disabled={isDisabled}
          rows={1}
          className={`max-h-[200px] min-h-[36px] flex-1 resize-none bg-transparent text-foreground placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${large ? 'text-[20px]' : 'text-sm'}`}
        />

        {/* Submit button */}
        <button
          data-testid="task-input-submit"
          type="button"
          onClick={() => {
            analytics.trackSubmitTask();
            accomplish.logEvent({
              level: 'info',
              message: 'Task input submit clicked',
              context: { prompt: value },
            });
            onSubmit();
          }}
          disabled={!value.trim() || isDisabled}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-200 ease-accomplish hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
          title="Submit"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CornerDownLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
