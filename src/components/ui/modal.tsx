import * as React from "react"
import { cn } from "@/lib/utils"

function Modal({
  open,
  onClose,
  className,
  ...props
}: React.ComponentProps<"div"> & { open: boolean; onClose?: () => void }) {
  if (!open) return null
  return (
    <div
      data-slot="modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg w-[90%] max-w-md",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      />
    </div>
  )
}

function ModalHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-header"
      className={cn("px-6 py-4 border-b border-zinc-200 dark:border-zinc-800", className)}
      {...props}
    />
  )
}

function ModalTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-title"
      className={cn("font-semibold", className)}
      {...props}
    />
  )
}

function ModalContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-content"
      className={cn("px-6 py-4", className)}
      {...props}
    />
  )
}

function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2",
        className
      )}
      {...props}
    />
  )
}

export { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter }
