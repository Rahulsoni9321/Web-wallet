import { useWalletContext } from "@/context/wallet-context";
import { Button } from "../ui/button";
import { FileDown, TreePalm } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function GenerateMnemonics() {
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const {  getMnemonic, validateSeedPhrase } = useWalletContext();

  const handleRecoveryPhase = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoveryPhrase(e.target.value);
  };

  const validate = () => {
    if (validateSeedPhrase(recoveryPhrase)) {
      toast.success('Wallet is valid');
    }
    else {
      toast.error("Invalid recovery phrase.");
    }
  }

  return (
    <div className="flex items-center justify-between w-full gap-8">
      <Input onChange={handleRecoveryPhase} type="password" placeholder="Enter your secret phase to recovery ( keep it empty to generate new seed phrase )..." className="border border-neutral-700 h-12 text-gray-400 px-4"></Input>
      {
        recoveryPhrase ? <Button
          onClick={validate}
          className="py-2 px-4 cursor-pointer flex gap-2 items-center"
          variant={"secondary"}
        >
          <FileDown></FileDown>Recover wallet
        </Button> : <Button
          onClick={() => getMnemonic()}
          className="py-2 px-4 cursor-pointer flex gap-2 items-center"
          variant={"secondary"}
        >
          <TreePalm></TreePalm>Generate Seed
        </Button>
      }
    </div>
  );
}
