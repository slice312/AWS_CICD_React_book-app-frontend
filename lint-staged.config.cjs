const {ESLint} = require("eslint");

const removeIgnoredFiles = async (files) => {
    const eslint = new ESLint();
    const ignoredFiles = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
    const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
    return filteredFiles.join(" ");
};

module.exports = {
    "*.(ts|tsx)": async (files) => {
        const filesToLint = await removeIgnoredFiles(files);
        return [`eslint --max-warnings=0 ${filesToLint}`];
    },
    "*.(css|scss|sass)": (files) => [`stylelint --fix --max-warnings=0 ${files}`]
};