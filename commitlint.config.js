module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'feat',
        'fix',
        'improve',
        'refactor',
        'docs',
        'chore',
        'style',
        'test',
        'revert',
        'ci',
        'build',
      ],
    ],
    'type-case': [1, 'never', 'upper-case'],
    'subject-case': [1, 'never', 'upper-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};
