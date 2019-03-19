export interface ISignedQuery {
  query: string;
  signature: string;
}

interface IDatawalletApiAdapter {
  authorize(query: string): Promise<ISignedQuery>;
  isAvailable(): boolean;
  query(query: ISignedQuery): Promise<any>;
}

export default IDatawalletApiAdapter;
