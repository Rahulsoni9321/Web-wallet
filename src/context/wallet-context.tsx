import { type walletType } from "@/types/wallets.type";
import { generateMnemonic, validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { createContext, useContext, useState, type ReactNode } from "react";

interface walletContextType {
  seedPhrase: string[] | null;
  getMnemonic: () => void;
  getPublicPrivateKey: any;
  wallet: walletType[] | null;
  setWallet: React.Dispatch<React.SetStateAction<walletType[] | null>>;
  validateSeedPhrase : (seed : string) => boolean
}

const WalletInitialisationContext = createContext({} as walletContextType);

export const useWalletContext = () => {
  const ctx = useContext(WalletInitialisationContext);

  if (!ctx) {
    throw new Error("context is not defined.");
  }

  return ctx;
};

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);
  const [wallet, setWallet] = useState<walletType[] | null>(null);

  const getMnemonic = () => {
    const mnemonics = generateMnemonic(wordlist);
    const seedPhraseArray = mnemonics.split(" ");
    setSeedPhrase(seedPhraseArray);
  };

  const validateSeedPhrase = (seed: string) => {
    return validateMnemonic(seed, wordlist)
    
  }

  const getPublicPrivateKey = () => {
    // const pub = generateKeyPair();
    // console.log("this is the pub",pub)
  };

  return (
    <WalletInitialisationContext.Provider
      value={{
        getMnemonic,
        seedPhrase,
        getPublicPrivateKey,
        wallet,
        setWallet,
        validateSeedPhrase
      }}
    >
      {children}
    </WalletInitialisationContext.Provider>
  );
};
