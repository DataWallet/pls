import IDatawalletApiAdapter, {
  IDatawalletPluginAPIParams,
  ISignedQuery,
} from '../IDatawalletApiAdapter';
import {ExtensionNotInstalledError} from './ExtensionNotInstalledError';

const PLUGIN_ENTRY_POINT = 'datawallet';

const isPluginInjected = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return PLUGIN_ENTRY_POINT in window;
};

class DatawalletPluginApiAdapter implements IDatawalletApiAdapter {
  public authorize(params: IDatawalletPluginAPIParams): Promise<ISignedQuery> {
    if (!this.isAvailable()) {
      throw new ExtensionNotInstalledError();
    }
    const {
      query,
      shortName,
      avatarUrl,
      companyName,
      promoText,
      promoTextMore,
    } = params;
    return (window as any)[PLUGIN_ENTRY_POINT].authorize(
      query,
      shortName,
      avatarUrl,
      companyName,
      promoText,
      promoTextMore,
    );
  }

  public isAvailable() {
    return isPluginInjected();
  }

  public query(params: IDatawalletPluginAPIParams): Promise<any> {
    const {
      query,
      shortName,
      avatarUrl,
      companyName,
      promoText,
      promoTextMore,
    } = params;
    return (window as any)[PLUGIN_ENTRY_POINT].query(
      query,
      shortName,
      avatarUrl,
      companyName,
      promoText,
      promoTextMore,
    );
  }
}

export default DatawalletPluginApiAdapter;
