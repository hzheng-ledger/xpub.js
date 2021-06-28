import Xpub from './xpub';
import LedgerV3Dot2Dot4 from './explorer/ledger.v3.2.4';
import Mock from './storage/mock';
import Bitcoin from './crypto/bitcoin';

const api = {
  Xpub,
  explorers: {
    LedgerV3Dot2Dot4,
  },
  storages: {
    Mock,
  },
  crypto: {
    Bitcoin,
  },
};

export default api;
