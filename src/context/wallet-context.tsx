import { coinTypeValue } from "@/config/seed-phrase";
import {
  coinType,
  type keyPairType,
  type walletType,
} from "@/types/wallets.type";
import {
  generateMnemonic,
  mnemonicToSeedSync,
  validateMnemonic,
} from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js";

interface walletContextType {
  seedPhrase: string[] | null;
  getMnemonic: () => void;
  getPublicPrivateKey: any;
  wallet: walletType | null;
  setWallet: React.Dispatch<React.SetStateAction<walletType | null>>;
  validateSeedPhrase: (seed: string) => boolean;
  selectedCoinType: coinType | null;
  setSelectedCoinType: React.Dispatch<React.SetStateAction<coinType | null>>;
  createWallet: () => void;
  deleteWallet: ()=> void
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
  const [seedPhrase, setSeedPhrase] = useState<string[] | null>(
    localStorage.getItem("seedPhrase")
      ? JSON.parse(localStorage.getItem("seedPhrase")!)
      : null,
  );
  const [seed, setSeed] = useState<any | null>(
    localStorage.getItem("seed")
      ? JSON.parse(localStorage.getItem("seed")!)
      : null,
  );
  const [selectedCoinType, setSelectedCoinType] = useState<coinType | null>(
    null,
  );
  const [wallet, setWallet] = useState<walletType | null>(
    localStorage.getItem("wallet")
      ? JSON.parse(localStorage.getItem("wallet")!)
      : null,
  );

  const deleteWallet = () => {
    localStorage.clear();
    setWallet(null);
    setSeed(null);
    setSeedPhrase(null);
  }

  const getMnemonic = () => {
    const mnemonics = generateMnemonic(wordlist);
    const seedPhraseArray = mnemonics.split(" ");
    setSeedPhrase(seedPhraseArray);
    setSeed(mnemonicToSeedSync(mnemonics));
    localStorage.setItem("seedPhrase", JSON.stringify(seedPhraseArray));
    localStorage.setItem("seed", JSON.stringify(mnemonicToSeedSync(mnemonics)));
  };

  const createWallet = () => {
    const walletCount = wallet ? (wallet[selectedCoinType!]?.length ?? 0) : 0;
    const derivationPath = `m/44'/${coinTypeValue[selectedCoinType!]}'/${walletCount}'/0'`;
    const hd = HDKey.fromMasterSeed(seed);
    const child = hd.derive(derivationPath);
    const secretKey = child.privateKey;
    const keyPair = Keypair.fromSeed(secretKey);

    const walletData: keyPairType = {
      publicKey: keyPair.publicKey,
      privateKey: keyPair.secretKey,
    };

    if (wallet) {
      if (wallet[selectedCoinType!]) {
        const existingValue = wallet[selectedCoinType!];
        existingValue?.push(walletData);
        setWallet({ ...wallet, [selectedCoinType!]: existingValue });
      } else {
        setWallet({ ...wallet, [selectedCoinType!]: [walletData] });
      }
    } else {
      const walletObj = {
        [selectedCoinType!]: [walletData],
      };
      setWallet(walletObj);
    }

    localStorage.setItem("wallet", JSON.stringify(wallet));
  };

  const validateSeedPhrase = (seed: string) => {
    return validateMnemonic(seed, wordlist);
  };

  const getPublicPrivateKey = () => {
    // const pub = generateKeyPair();
    // console.log("this is the pub",pub)
  };

  return (
    <WalletInitialisationContext.Provider
      value={{
        deleteWallet,
        getMnemonic,
        seedPhrase,
        getPublicPrivateKey,
        wallet,
        setWallet,
        validateSeedPhrase,
        setSelectedCoinType,
        selectedCoinType,
        createWallet,
      }}
    >
      {children}
    </WalletInitialisationContext.Provider>
  );
};
