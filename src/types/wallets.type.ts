import type { PublicKey } from "@solana/web3.js";

export interface keyPairType {
    privateKey: Uint8Array<ArrayBufferLike>,
    publicKey: PublicKey

}
export interface walletType {
    SOLANA?: keyPairType[],
    ETHEREUM?: keyPairType[]
}

export enum coinType {
    SOLANA = 'SOLANA',
    ETHEREUM = 'ETHEREUM'
}


export enum coinTypeNumber {
    SOLANA = '501',
    ETHEREUM = '60'
}