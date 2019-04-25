import {authorize, isAvailable, query} from '../index';

const PLUGIN = 'datawallet';

const plugin = ((window as any)[PLUGIN] = {
  authorize: jest.fn(queryArg =>
    Promise.resolve({query: queryArg.query, signature: 'signature'}),
  ),
  query: jest.fn(signedQuery => Promise.resolve({hello: 'world'})),
});

describe('isAvailable', () => {
  it('checks if the plugin is present', () => {
    expect(isAvailable()).toBe(true);
  });
});

describe('authorize', () => {
  it('throws if mandatory params are missing', async () => {
    try {
      await authorize({});
    } catch (e) {
      expect(e.message).toMatch(/is mandatory/);
    }
    expect.assertions(1);
  });

  it('doesnt throws if optional params are missing', async () => {
    const signedQuery = await authorize({
      avatarUrl: 'http://example.com',
      query: 'query',
      shortName: 'a short name',
    });
    expect(signedQuery).toBeTruthy();
  });

  it('throws if wrongly typed params are passed', async () => {
    try {
      await authorize({
        avatarUrl: null,
        query: 'query',
        shortName: 'a short name',
      });
    } catch (e) {
      expect(e.message).toMatch(/`avatarUrl` must be a string/);
    }
    expect.assertions(1);
  });

  it('filters extraneous params passed to authorize', async () => {
    plugin.authorize.mockClear();
    await expect(
      authorize({
        avatarUrl: 'http://example.com',
        extraKey: 'some extra value',
        query: 'query',
        shortName: 'a short name',
      }),
    ).resolves.toBeTruthy();
    expect(plugin.authorize.mock.calls.length).toBe(1);
    expect(plugin.authorize.mock.calls[0][0].extraKey).toBe(undefined);
    expect(plugin.authorize.mock.calls[0][0].query).toBe('query');
  });

  it('calls the injected plugin api', async () => {
    plugin.authorize.mockClear();
    const signedQuery = await authorize({
      avatarUrl: 'http://example.com',
      query: 'query',
      shortName: 'a short name',
    });
    expect(signedQuery).toEqual({
      query: 'query',
      signature: 'signature',
    });
  });

  it('throws if wrong contract addrewss is passed', async () => {
    try {
      await authorize({
        avatarUrl: 'http://example.com',
        contractAddress: 'wrong address',
        query: 'query',
        shortName: 'a short name',
      });
    } catch (e) {
      expect(e.message).toMatch(
        /`contractAddress` must be a valid Ethereum address/,
      );
    }
    expect.assertions(1);
  });

  it('doesnt throws if valid contractAddress is passed', async () => {
    const signedQuery = await authorize({
      avatarUrl: 'http://example.com',
      contractAddress: '0x01d21ded61e7aD5015555597148FAE2b99F062eE',
      query: 'query',
      shortName: 'a short name',
    });
    expect(signedQuery).toBeTruthy();
  });
});

describe('query', () => {
  it('calls the injected plugin api', async () => {
    plugin.authorize.mockClear();
    const data = await query({
      query: 'hi',
      signature: 'signature',
    });
    expect(data).toEqual({
      hello: 'world',
    });
    expect(plugin.query.mock.calls.length).toBe(1);
    expect(plugin.query.mock.calls[0][0]).toEqual({
      query: 'hi',
      signature: 'signature',
    });
  });
});
