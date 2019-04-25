export interface IAuthorizeParams {
  query: string;
  shortName: string;
  avatarUrl: string;
  companyName?: string;
  contractAddress?: string;
  promoText?: string;
  promoTextMore?: string;
}

export const AUTHORIZE_PARAMS_KEYS: Array<keyof IAuthorizeParams> = [
  'query',
  'shortName',
  'avatarUrl',
  'companyName',
  'contractAddress',
  'promoText',
  'promoTextMore',
  'contractAddress',
];

export interface ISignedQuery {
  query: string;
  signature: string;
}

interface IDatawalletApiAdapter {
  authorize(params: IAuthorizeParams): Promise<ISignedQuery>;
  isAvailable(): boolean;
  query(query: ISignedQuery): Promise<any>;
}

export default IDatawalletApiAdapter;
