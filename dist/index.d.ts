import { WindowPostMessageStream } from '@metamask/post-message-stream';
declare class LedgerWebCLient {
    stream: WindowPostMessageStream;
    requests: {
        [id: string]: {
            resolve: Function;
            reject: Function;
        };
    };
    constructor(stream: WindowPostMessageStream);
    onMessage(data: any): void;
    request(type: string, method: string, args: any[]): Promise<any>;
}
export default LedgerWebCLient;
