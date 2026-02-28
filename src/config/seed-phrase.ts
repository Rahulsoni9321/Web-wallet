import { ArrowRightLeftIcon, Globe, Linkedin, Wallet } from "lucide-react"
import type { JSX } from "react"
import { href } from "react-router-dom"

export const coinTypeValue = {
    SOLANA: '501',
    ETHEREUM: '60'
}

export const supportedCoins = ['SOLANA', 'ETHEREUM']


interface ServiceListType {
    id: string,
    label: string,
    href: string,
    imgPath : string,
    icon: JSX.ElementType
}
export const servicesList: ServiceListType[] = [{
    id: 'swap-token',
    label: 'Swap',
    href: '/swap',
    imgPath : '/logo-swap.png',
    icon: ArrowRightLeftIcon
},{
    id: 'generate-wallet-token',
    label : 'Generate Wallet',
    href : '/generate-wallet',
    imgPath : '/logo-swap.png',
    icon : Wallet
}]

export const footerLink = [
    {
        id : 'Portfolio',
        href : 'https://rahulsoni-dev.online',
        iconClass : 'w-6 h-6 text-cyan-500',
        icon : Globe
    },{
        id : 'Resume',
        href : 'https://drive.google.com/file/d/1rhB9aWAa-lR6dytNlKw94Dn0Ns7pC8AN/view?usp=sharing',
        iconClass : '',
        icon : Globe
    },
    {
        id : 'linkedIn',
        href : 'https://www.linkedin.com/in/rahul-soni-50b806203/',
        iconClass : 'w-6 h-6 text-blue-500',
        icon : Linkedin
    }
]