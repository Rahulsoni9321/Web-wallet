import { useWalletContext } from "@/context/wallet-context";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

export function WarningModal({ open, onOpenChange }: { open: boolean, onOpenChange: () => void }) {
    const { deleteWallet } = useWalletContext();
    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>Are you sure? All the wallets will get deleted.

            <div className="flex items-center gap-3">
                <Button variant={"destructive"} onClick={()=>{
                    onOpenChange()
                    deleteWallet()
                    }}>Delete</Button>
                <Button variant={"secondary"} onClick={onOpenChange}> Close</Button>
            </div>
        </DialogContent>

    </Dialog>
}