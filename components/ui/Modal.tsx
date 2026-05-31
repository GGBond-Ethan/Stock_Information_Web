"use client";

import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="terminal-scrollbar max-h-[86vh] w-full max-w-2xl overflow-auto rounded-md border border-terminal-border/80 bg-terminal-panel shadow-panel">
        <div className="flex items-center justify-between border-b border-terminal-border/70 px-4 py-3">
          <h3 className="text-base font-medium text-terminal-text">{title}</h3>
          <Button onClick={onClose} className="px-2 py-1">
            关闭
          </Button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
