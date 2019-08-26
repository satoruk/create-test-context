module.exports = {
  "*.{js,ts}": ["eslint --fix", "git add"],
  "*.{json,md,yaml,yml}": ["prettier --write", "git add"],
};
