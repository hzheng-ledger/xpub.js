import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import * as https from 'https';
import { Address, TX } from '../storage/types';
import EventEmitter from '../utils/eventemitter';
import { IExplorer } from './types';

// an Live explorer V3 class
class LedgerV3Dot2Dot4 extends EventEmitter implements IExplorer {
  client: AxiosInstance;

  disableBatchSize = false;

  constructor({ explorerURI, disableBatchSize }: { explorerURI: string; disableBatchSize?: boolean }) {
    super();

    this.client = axios.create({
      baseURL: explorerURI,
      // uses max 20 keep alive request in parallel
      httpsAgent: new https.Agent({ keepAlive: true, maxSockets: 20 }),
    });
    // 3 retries per request
    axiosRetry(this.client, { retries: 3 });

    if (disableBatchSize) {
      this.disableBatchSize = disableBatchSize;
    }
  }

  async broadcast(tx: string) {
    const url = '/transactions/send';
    return this.client.post(url, { tx });
  }

  async getTxHex(txId: string) {
    const url = `/transactions/${txId}/hex`;

    this.emit('fetching-transaction-tx', { url, txId });

    // TODO add a test for failure (at the sync level)
    const res = (await this.client.get(url)).data;

    return res[0].hex;
  }

  async getAddressTxsSinceLastTxBlock(batchSize: number, address: Address, lastTx: TX | undefined) {
    const params: { no_token: string; batch_size?: number; block_hash?: string } = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      no_token: 'true',
    };
    if (!this.disableBatchSize) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      params.batch_size = batchSize;
    }
    if (lastTx) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      params.block_hash = lastTx.block.hash;
    }

    const url = `/addresses/${address.address}/transactions`;

    this.emit('fetching-address-transaction', { url, params });

    // TODO add a test for failure (at the sync level)
    const res: { txs: TX[] } = (
      await this.client.get(url, {
        params,
      })
    ).data;

    // faster than mapping
    res.txs.forEach((tx) => {
      // no need to keep that as it changes
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      delete tx.confirmations;
      // eslint-disable-next-line no-param-reassign
      tx.account = address.account;
      // eslint-disable-next-line no-param-reassign
      tx.index = address.index;
      // eslint-disable-next-line no-param-reassign
      tx.address = address.address;

      tx.outputs.forEach((output) => {
        // eslint-disable-next-line @typescript-eslint/camelcase,no-param-reassign
        output.output_hash = tx.id;
      });
    });

    this.emit('fetched-address-transaction', { url, params, txs: res.txs });

    return res.txs;
  }
}

export default LedgerV3Dot2Dot4;
