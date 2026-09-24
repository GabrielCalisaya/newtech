import { useEffect, useRef, type ReactNode } from "react";

type DemoDialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function DemoDialog({
  title,
  onClose,
  children,
}: DemoDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          "button, input, a[href]",
        ),
      ];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-dialog-title"
        ref={dialogRef}
      >
        <div className="dialog-top">
          <span className="eyebrow">REGISTRO DE MUESTRA / NEW TECH</span>
          <button
            className="icon-close"
            type="button"
            aria-label="Cerrar formulario"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <h2 id="demo-dialog-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
