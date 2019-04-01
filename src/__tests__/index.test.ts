import {authorize, query} from '../index';

const PLUGIN = 'datawallet';

const plugin = ((window as any)[PLUGIN] = {
  authorize: jest.fn(queryArg => ({query: queryArg, signature: 'signature'})),
  query: jest.fn(signedQuery => ({hello: 'world'})),
});

describe('authorize', () => {
  it('calls the injected plugin api', () => {
    expect(
      authorize({query: 'query', shortName: 'company short name'}),
    ).toEqual({
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
        query: {query: 'hi', signature: 'signature'},
        shortName: 'company short name',
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
