import IDatawalletApiAdapter, {
  AUTHORIZE_PARAMS_KEYS,
  IAuthorizeParams,
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

const AUTHORIZE_ERRORS: any = {
  avatarUrl: '`avatarUrl` is mandatory',
  query: '`query` is mandatory',
  shortName: '`shortName` is mandatory',
};

class DatawalletPluginApiAdapter implements IDatawalletApiAdapter {
  public authorize(params: IAuthorizeParams): Promise<ISignedQuery> {
    if (!this.isAvailable()) {
      throw new ExtensionNotInstalledError();
    }

    const errorMessages = AUTHORIZE_PARAMS_KEYS.map(key => {
      // mandatory params must be present
      if (key in AUTHORIZE_ERRORS && !(key in params)) {
        return AUTHORIZE_ERRORS[key];
      }
      // all known params must be strings if present
      else if (key in params && typeof (params as any)[key] !== 'string') {
        return `\`${key}\` must be a string`;
      }
    }).filter(Boolean);

    if (errorMessages.length > 0) {
      throw new Error(errorMessages.join(', '));
    }

    // filter extraneous keys
    const passedParams = AUTHORIZE_PARAMS_KEYS.reduce((acc, key) => {
      (acc as any)[key] = (params as any)[key];
      return acc;
    }, {});

    return (window as any)[PLUGIN_ENTRY_POINT].authorize(passedParams);
  }

  public isAvailable() {
    return isPluginInjected();
  }

  public query(query: ISignedQuery): Promise<any> {
    return (window as any)[PLUGIN_ENTRY_POINT].query(query);
  }
}

export default DatawalletPluginApiAdapter;
