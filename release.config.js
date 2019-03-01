/* eslint-disable */

module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        writerOpts: {
          groupBy: 'scope',
          commitGroupsSort: ['scope', 'type'],
        },
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'yarn.lock'],
        message:
          '[*] chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
  ],
  ci: false,
};
