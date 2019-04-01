export interface ISignedQuery {
  query: string;
  signature: string;
}

export interface IDatawalletPluginAPIParams {
  query: string | ISignedQuery;
  shortName: string;
  avatarUrl?: string;
  companyName?: string;
  promoText?: string;
  promoTextMore?: string;
}

interface IDatawalletApiAdapter {
  authorize(params: IDatawalletPluginAPIParams): Promise<ISignedQuery>;

  isAvailable(): boolean;

  query(params: IDatawalletPluginAPIParams): Promise<any>;
}

export default IDatawalletApiAdapter;
