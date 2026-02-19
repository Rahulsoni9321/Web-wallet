import "./App.css";
import { useWalletContext } from "./context/wallet-context";
import { MaxWidthWrapper } from "./components/common/max-width-wrapper";
import { SeedPhraseWrapper } from "./components/common/seed-phrase-wrapper";
import { GenerateMnemonics } from "./components/common/generate-mnemonics";
import PostSeedPhraseCreation from "./components/common/post-seed-phrase-creation";


function App() {
  const { seedPhrase } = useWalletContext();

  // const generatePublicPrivateKey = () => {
  //   // const privateKey = 
  // }

  return (
    <MaxWidthWrapper>
      <div className="bg-black min-h-screen flex flex-col items-center w-full gap-6 p-12">
        {!seedPhrase && <GenerateMnemonics></GenerateMnemonics>}

        {seedPhrase && <SeedPhraseWrapper seedPhrase={seedPhrase}></SeedPhraseWrapper>}
        {
          seedPhrase && seedPhrase?.length > 0 && <PostSeedPhraseCreation></PostSeedPhraseCreation>
        }
        {/* 
        <motion.button initial={{ y: 20, opacity: 0, animationDuration: 3 }} animate={{ y: 0, opacity: 100 }} transition={{ delay: 1, duration: 2 }} className="px-6 py-2 mt-8 rounded-lg shadow bg-white text-black flex gap-4 items-center"><Wallet></Wallet>Generate Public-Private Key</motion.button> */}
      </div>
    </MaxWidthWrapper>
  );
}

export default App;
