"use strict";

const student = require("../data/student.json");

const renderModule = (module, mainData) => {
  const moduleURL = module.url
    ? module.url
    : mainData.curriculumOrigin
    ? `${mainData.curriculumOrigin}/${module.name}`
    : `https://github.com/${module.userName || mainData.curriculumUserName}/${
        module.name
      }`;

  const chapters =
    typeof module.chapters === "number"
      ? `    ${module.chapters} chapter${module.chapters !== 1 ? "s" : ""}`
      : "    0 chapters";

  const checkIns =
    typeof module.chapters === "number"
      ? `   | <a href="https://github.com/${mainData.orgName}/${mainData.repoName}/issues?q=milestone%3A${module.name}+label%3Acheck-in+author%3A${student.userName}">check-in</a> `
      : "";

  const deliverables = Array.isArray(module.board)
    ? module.board
        .map(
          (boardName) =>
            `   | <a href="https://github.com/${mainData.orgName}/${
              mainData.repoName
            }/projects/${
              mainData.boards.find((board) => board.name === boardName)
                ? mainData.boards.find((board) => board.name === boardName)
                    .number
                : 0
            }${
              boardName === "deliverables"
                ? `?card_filter_query=label%3Adeliverable+milestone%3A${module.name}+assignee%3A${student.userName}`
                : ""
            }">${boardName}</a> `
        )
        .join("")
    : typeof module.board === "string"
    ? `   | <a href="https://github.com/${mainData.orgName}/${
        mainData.repoName
      }/projects/${
        mainData.boards.find((board) => board.name === module.board).number
      }${
        module.board === "deliverables"
          ? `?card_filter_query=label%3Adeliverable+milestone%3A${module.name}+assignee%3A${student.userName}`
          : ""
      }">${module.board}</a> `
    : "";

  const retrospective = module.chapters
    ? `| <a href="./${module.name}/retrospective.md">retro</a> `
    : "";

  const myMaterialsFork = module.chapters
    ? `| <a href="https://github.com/${student.userName}/${module.name}">my fork</a>`
    : "";

  const assessment = module.assessment
    ? ` | <a href="./${module.name}/assessment">assessment</a>`
    : "";

  return (
    `<h3><a href="${moduleURL}" style="display: inline;">${module.name}</a></h3>` +
    (module.milestone
      ? `  <ul><li><p>` +
        chapters +
        deliverables +
        checkIns +
        retrospective +
        // rollCalls +
        myMaterialsFork +
        assessment +
        `  </p></li></ul>`
      : "")
  );
};
module.exports = renderModule;
