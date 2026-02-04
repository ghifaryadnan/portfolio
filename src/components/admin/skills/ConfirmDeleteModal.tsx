 "use client";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "@/components/ui/modal";

export default function ConfirmDeleteModal({
  open,
  onCancel,
  onConfirm,
  isPending,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isPending: boolean;
}) {
  return (
    <Modal open={open} onClose={onCancel}>
      <ModalHeader>
        <ModalTitle>Konfirmasi Hapus</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="text-sm text-zinc-500">
          Anda yakin ingin menghapus skill ini? Tindakan ini tidak dapat dibatalkan.
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="ghost" onClick={onCancel}>
          Batal
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
          {isPending ? "Memproses..." : "Hapus"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
