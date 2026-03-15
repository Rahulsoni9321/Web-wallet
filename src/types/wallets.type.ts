
export interface keyPairType {
    privateKey: string;
    publicKey: string;
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