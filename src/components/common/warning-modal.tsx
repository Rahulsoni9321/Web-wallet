import { useWalletContext } from "@/context/wallet-context";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { AlertTriangle } from "lucide-react";

export function WarningModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const { deleteWallet } = useWalletContext();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl p-6 bg-black/30 opacity-90 backdrop-blur-xl">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle size={28} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-white ">
          Delete All Wallets?
        </h2>

        {/* Description */}
        <p className="mt-2 text-center text-sm text-gray-400">
          This action cannot be undone. All your saved wallets will be permanently removed.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              deleteWallet();
              onOpenChange();
            }}
          >
            Yes, Delete
          </Button>

          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={onOpenChange}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}