import chalk from 'chalk';
import {sync as parseCommit} from 'conventional-commits-parser';

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

async function main(commitMsg) {
  let fullMessage = commitMsg;
  const commit = parseCommit(fullMessage);

  if (commit.type) {
    // If the commit message types and scopes are acceptable
    verifyHeaderParts(commit);
  } else if (!commit.merge || !commit.revert) {
    throw new Error(
      'Commit header must either be a merge/revert or match the format: <type>: subject',
    );
  }
}
