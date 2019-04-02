import {authorize, isAvailable, query} from '../index';

const PLUGIN = 'datawallet';

const plugin = ((window as any)[PLUGIN] = {
  authorize: jest.fn(queryArg => ({query: queryArg, signature: 'signature'})),
  query: jest.fn(signedQuery => ({hello: 'world'})),
});

describe('isAvailable', () => {
  it('checks if the plugin is present', () => {
    expect(isAvailable()).toBe(true);
  });
});

describe('authorize', () => {
  it('calls the injected plugin api', () => {
    expect(authorize('query')).toEqual({
      query: 'query',
      signature: 'signature',
    });
    expect(plugin.authorize.mock.calls.length).toBe(1);
    expect(plugin.authorize.mock.calls[0][0]).toBe('query');
  });
});

describe('query', () => {
  it('calls the injected plugin api', () => {
    expect(
      query({
        query: 'hi',
        signature: 'signature',
      }),
    ).toEqual({
      hello: 'world',
    });
    expect(plugin.query.mock.calls.length).toBe(1);
    expect(plugin.query.mock.calls[0][0]).toEqual({
      query: 'hi',
      signature: 'signature',
    });
  });
});
