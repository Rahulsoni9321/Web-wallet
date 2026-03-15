import { ArrowRightLeftIcon, Globe, Linkedin, Wallet, FileText, Github, Twitter } from "lucide-react"
import type { JSX } from "react"

export const coinTypeValue = {
    SOLANA: '501',
    ETHEREUM: '60'
}

export const supportedCoins = ['SOLANA', 'ETHEREUM']


interface ServiceListType {
    id: string,
    label: string,
    href: string,
    imgPath: string,
    icon: JSX.ElementType
}
export const servicesList: ServiceListType[] = [{
    id: 'swap-token',
    label: 'Swap',
    href: '/swap',
    imgPath: '/logo-swap.png',
    icon: ArrowRightLeftIcon
}, {
    id: 'generate-wallet-token',
    label: 'Generate Wallet',
    href: '/generate-wallet',
    imgPath: '/logo-swap.png',
    icon: Wallet
}]

export const footerLink = [
    {
        id: 'Portfolio',
        href: 'https://rahulsoni-dev.online',
        iconClass: 'w-5 h-5 text-cyan-500',
        icon: Globe,
        label: 'Portfolio'
    },
    {
        id: 'Resume',
        href: 'https://drive.google.com/file/d/17orGM1x13gJC5ulu8ydDgp5rkaU6vj8Z/view',
        iconClass: 'w-5 h-5 text-cyan-500',
        icon: FileText,
        label: 'Resume'
    },
    {
        id: 'GitHub',
        href: 'https://github.com/Rahulsoni9321',
        iconClass: 'w-5 h-5 text-white/70',
        icon: Github,
        label: 'GitHub'
    },
    {
        id: 'Twitter',
        href: 'https://x.com/SoniRahul3108',
        iconClass: 'w-5 h-5 text-white/70',
        icon: Twitter,
        label: 'X / Twitter'
    },
    {
        id: 'LinkedIn',
        href: 'https://www.linkedin.com/in/rahul-soni-50b806203/',
        iconClass: 'w-5 h-5 text-blue-500',
        icon: Linkedin,
        label: 'LinkedIn'
    }
]
