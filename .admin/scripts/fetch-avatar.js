"use strict";

/*
  still brittle around missing directories
  could clear all avatars before fetching
*/

const https = require("https");
const fs = require("fs");
const path = require("path");

const user = require("../data/student.json");

const imgURL =
  user.imgURL || `https://github.com/${user.userName}.png?size=150`;

https
  .get(imgURL, (resp) => {
    let data = "";

    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      const avatarURL = data.split('"')[1];

      https
        .get(avatarURL, (res) => {
          var imagedata = "";
          res.setEncoding("binary");

          res.on("data", function (chunk) {
            imagedata += chunk;
          });

          res.on("end", function () {
            const avatarPath = path.normalize(
              path.join(__dirname, `../assets/${user.userName}.jpeg`)
            );
            fs.writeFile(avatarPath, imagedata, "binary", function (err) {
              if (err) {
                console.error(err);
              }
            });
          });
        })
        .on("error", (err) => {
          console.log("2: " + err.message);
          console.log(user.name, user.userName);
        });
    });
  })
  .on("error", (err) => {
    console.log("1 " + err.message);
    console.log(user.name, user.userName);
  });
