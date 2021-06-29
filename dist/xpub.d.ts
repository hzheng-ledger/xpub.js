import { Address, IStorage } from './storage/types';
import EventEmitter from './utils/eventemitter';
import { IExplorer } from './explorer/types';
import { ICrypto } from './crypto/types';
declare class Xpub extends EventEmitter {
    storage: IStorage;
    explorer: IExplorer;
    crypto: ICrypto;
    xpub: string;
    derivationMode: string;
    GAP: number;
    syncing: {
        [key: string]: boolean;
    };
    txsSyncArraySize: number;
    constructor({ storage, explorer, crypto, xpub, derivationMode, }: {
        storage: IStorage;
        explorer: IExplorer;
        crypto: ICrypto;
        xpub: string;
        derivationMode: string;
    });
    syncAddress(account: number, index: number): Promise<boolean>;
    checkAddressesBlock(account: number, index: number): Promise<boolean>;
    syncAccount(account: number): Promise<number>;
    sync(): Promise<number>;
    getXpubBalance(): Promise<number>;
    getAccountBalance(account: number): Promise<number>;
    getAddressBalance(address: Address): Promise<number>;
    getXpubAddresses(): Promise<Address[]>;
    getAccountAddresses(account: number): Promise<Address[]>;
    getNewAddress(account: number, gap: number): Promise<string>;
    buildTx(change: {
        account: number;
        gap: number;
    }, destAddress: string, amount: number, fee: number): Promise<{
        psbt: import("bitcoinjs-lib").Psbt;
        inputsAddresses: Address[];
        txHexs: string[];
    }>;
    broadcastTx(rawTxHex: string): Promise<any>;
    getAddressesBalance(addresses: Address[]): Promise<number>;
    emitSyncing(data: any): void;
    emitSynced(data: any): void;
    emitSyncedFailed(data: any): void;
    whenSynced(type: string, key?: string): Promise<void>;
    fetchHydrateAndStoreNewTxs(address: string, account: number, index: number): Promise<number>;
}
export default Xpub;
