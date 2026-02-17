import type { PublicKey } from "@solana/web3.js";

export interface walletType {
    provider: coinType,
    privateKey: Uint8Array<ArrayBufferLike>,
    publicKey: PublicKey
}

export enum coinType {
    SOLANA = 'SOLANA',
    ETHEREUM = 'ETHEREUM'
}


export enum coinTypeNumber {
    SOLANA = '501',
    ETHEREUM = '60'
}