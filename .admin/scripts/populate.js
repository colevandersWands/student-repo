"use strict";

/*
  still brittle around missing directories
  could clear all avatars before fetching
*/

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { promisify } = require("util");

// https://gist.github.com/tinovyatkin/4316e302d8419186fe3c6af3f26badff (the comment)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question[promisify.custom] = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

(async () => {
  const abortInput = await promisify(rl.question)(
    "\nare you sure you want to populate the students? \nthis will erase any existing notes\n\n- enter 'yes' to continue\n\n"
  );

  rl.close();

  if (abortInput.toLowerCase() !== "yes") {
    process.exit(0);
  }
})();

const mainData = require("../data/index.json");
const orgURL = `https://github.com/${mainData.orgName}`;
const homeRepoURL = `${orgURL}/${mainData.homeRepoName}`;

const whichOnes = process.argv[2];

const modules = JSON.parse(
  fs.readFileSync(path.join(__dirname, `../data/${whichOnes}.json`), "utf8")
);

const basePath = path.join(__dirname, `..`, "..");
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

for (const module of modules) {
  const modulePath = path.join(basePath, module.name);
  fs.mkdir(modulePath, (err) => {
    if (err && err.code !== "EEXIST") {
      console.error(err);
      return;
    }

    const moduleReadmeStarter = `# ${module.name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ")}
`;
    const moduleReadmePath = path.join(modulePath, "README.md");
    fs.writeFile(moduleReadmePath, moduleReadmeStarter, "utf-8", (err) =>
      err ? console.error(err) : null
    );

    const moduleRetroStarter = ``;
    const moduleRetroPath = path.join(modulePath, "retrospective.md");
    fs.writeFile(moduleRetroPath, moduleRetroStarter, "utf-8", (err) =>
      err ? console.error(err) : null
    );
  });
}
