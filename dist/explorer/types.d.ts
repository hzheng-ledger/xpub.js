import { TX, Address } from '../storage/types';
export interface IExplorer {
    broadcast(tx: string): Promise<any>;
    getTxHex(txId: string): Promise<string>;
    getAddressTxsSinceLastTxBlock(batchSize: number, address: Address, lastTx: TX | undefined): Promise<TX[]>;
}
