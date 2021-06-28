import Xpub from './xpub';
import LedgerV3Dot2Dot4 from './explorer/ledger.v3.2.4';
import Mock from './storage/mock';
import Bitcoin from './crypto/bitcoin';
declare const api: {
    Xpub: typeof Xpub;
    explorers: {
        LedgerV3Dot2Dot4: typeof LedgerV3Dot2Dot4;
    };
    storages: {
        Mock: typeof Mock;
    };
    crypto: {
        Bitcoin: typeof Bitcoin;
    };
};
export default api;
