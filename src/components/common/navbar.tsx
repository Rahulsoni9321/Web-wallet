import { Switch } from "../ui/switch"

const Navbar = () => {
    return (
        <div className="top-0 fixed h-24  shadow bg-black w-full text-white flex items-center justify-between px-8 z-50">
            <h1 className="text-3xl font-bold flex gap-1 items-center"><img src="/logo.png" className="w-28 h-20 b"></img>Mnemonic<span className="font-sans text-transparent bg-clip-text bg-linear-to-tr from-cyan-500 to-violet-600">X</span></h1>
            <div>
                <Switch size="default"></Switch>
            </div>
        </div>
    )
}

export default Navbar