"use strict";

const replaceInReadme = require("./lib/replace-in-readme.js");

const mainData = require("../data/index.json");
const studentData = require("../data/student.json");

const header = `
# ${studentData.name}

![${studentData.userName} avatar](./.admin/assets/${studentData.userName}.jpeg)

- [${studentData.userName}](https://github.com/${studentData.userName})
- [${mainData.orgName}/${mainData.repoName}](https://github.com/${
  mainData.orgName
}/${mainData.repoName}#${encodeURIComponent(studentData.userName)})
- [home page](${
  studentData.homePage || `https://${studentData.userName}.github.io`
})

`;

replaceInReadme(header, "HEADER");
