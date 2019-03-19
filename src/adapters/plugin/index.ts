import IDatawalletApiAdapter, {ISignedQuery} from '../IDatawalletApiAdapter';
import {ExtensionNotInstalledError} from './ExtensionNotInstalledError';

const PLUGIN_ENTRY_POINT = 'datawallet';

const isPluginInjected = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return PLUGIN_ENTRY_POINT in window;
};

class DatawalletPluginApiAdapter implements IDatawalletApiAdapter {
  public authorize(query: string): Promise<ISignedQuery> {
    if (!this.isAvailable()) {
      throw new ExtensionNotInstalledError();
    }
    return (window as any)[PLUGIN_ENTRY_POINT].authorize(query);
  }

  public isAvailable() {
    return isPluginInjected();
  }

  public query(query: ISignedQuery): Promise<any> {
    return (window as any)[PLUGIN_ENTRY_POINT].query(query);
  }
}

export default DatawalletPluginApiAdapter;
