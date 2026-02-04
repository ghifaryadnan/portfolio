import * as React from "react"
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function StatusModal({
  open,
  type = "success",
  title,
  description,
  onClose,
  className,
}: {
  open: boolean
  type?: "success" | "error"
  title?: string
  description?: string
  onClose?: () => void
  className?: string
}) {
  const icon = type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />
  const color = type === "success" ? "text-green-600" : "text-red-600"
  const defaultTitle = type === "success" ? "Berhasil" : "Gagal"
  return (
    <Modal open={open} onClose={onClose} className={className}>
      <ModalHeader>
        <div className="flex items-center gap-2">
          <span className={cn(color)}>{icon}</span>
          <ModalTitle>{title ?? defaultTitle}</ModalTitle>
        </div>
      </ModalHeader>
      <ModalContent>
        <div className="text-sm text-zinc-500">{description}</div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={onClose}>Tutup</Button>
      </ModalFooter>
    </Modal>
  )
}
