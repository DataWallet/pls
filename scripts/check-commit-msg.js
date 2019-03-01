import git from 'simple-git/promise';
import chalk from 'chalk';
import {sync as parseCommit} from 'conventional-commits-parser';
import {join} from 'path';

const stdin = process.openStdin();

let data = '';
stdin.on('data', chunk => {
  data += chunk;
});

stdin.on('end', () => {
  main(data, process.argv[2])
    .then(() => {
      console.log(`  ${chalk.green('✔')} Commit message checks\n`);
      process.exit(0);
    })
    .catch(err => {
      console.log(`  ${chalk.red('❌')} Commit message checks`);
      console.error('\n' + err.message + '\n');
      process.exit(1);
    });
});

const TYPES = [
  'fix',
  'feat',
  'chore',
  'build',
  'test',
  'style',
  'docs',
  'perf',
  'refactor',
];

function verifyHeaderParts({type}) {
  if (!TYPES.includes(type)) {
    throw new Error(
      `Commit ${chalk.bold('<type>')} must be one of:\n${chalk.italic(
        TYPES.join(', '),
      )}`,
    );
  }
}

async function main(commitMsg, commitFilePath) {
  const withoutScopePattern = /^(\w*)(?:\(.+\))?: (.*)$/;
  let [firstLine, ...lines] = commitMsg.split('\n');
  let fullMessage = commitMsg;

  // Get header commit pattern from @semantic-release config file
  const releaseConfig = require('../release.config');
  const [, {parserOpts}] = releaseConfig.plugins.find(
    ([name]) => name === '@semantic-release/commit-analyzer',
  );
  const commit = parseCommit(fullMessage, parserOpts);

  if (commit.type) {
    // If the commit message types and scopes are acceptable
    verifyHeaderParts(commit);
  } else if (!commit.merge || !commit.revert) {
    throw new Error(
      'Commit header must either be a merge/revert or match the format: <type>: subject',
    );
  }
}
