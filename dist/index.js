"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xpub_1 = __importDefault(require("./xpub"));
var ledger_v3_2_4_1 = __importDefault(require("./explorer/ledger.v3.2.4"));
var mock_1 = __importDefault(require("./storage/mock"));
var bitcoin_1 = __importDefault(require("./crypto/bitcoin"));
var api = {
    Xpub: xpub_1.default,
    explorers: {
        LedgerV3Dot2Dot4: ledger_v3_2_4_1.default,
    },
    storages: {
        Mock: mock_1.default,
    },
    crypto: {
        Bitcoin: bitcoin_1.default,
    },
};
exports.default = api;
//# sourceMappingURL=index.js.map