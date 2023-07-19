// let envName = process.env.BRANCH.replace("env/", "");

// require("fs").writeFileSync(
//   ".config-env",
//   `REACT_APP_CONFIG_ENV=environments/${envName}`
// );

// console.log("get-env-netlify. write: ", envName);

const currentGitBranch = require("current-git-branch");
let envName = currentGitBranch().replace("env/", "");

require("fs").writeFileSync(
  ".config-env",
  `REACT_APP_CONFIG_ENV=environments/${envName}`
);

console.log("get-env. write: ", envName);