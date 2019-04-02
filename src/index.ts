import DatawalletPluginApiAdapter from './adapters/plugin';

const apiAdapter = new DatawalletPluginApiAdapter();

export const authorize = apiAdapter.authorize.bind(apiAdapter);
export const isAvailable = apiAdapter.isAvailable.bind(apiAdapter);
export const query = apiAdapter.query.bind(apiAdapter);

export default {
  authorize,
  isAvailable,
  query,
};
