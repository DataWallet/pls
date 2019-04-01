export interface ISignedQuery {
  query: string;
  signature: string;
}

interface IDatawalletApiAdapter {
  authorize(
    query: string,
    shortName: string,
    avatarUrl?: string,
    companyName?: string,
    promoText?: string,
    promoTextMore?: string,
  ): Promise<ISignedQuery>;

  isAvailable(): boolean;

  query(
    query: ISignedQuery,
    shortName: string,
    avatarUrl?: string,
    companyName?: string,
    promoText?: string,
    promoTextMore?: string,
  ): Promise<any>;
}

export default IDatawalletApiAdapter;
