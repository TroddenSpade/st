const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");

const config = require("./src/config/config").get();

const { App } = require("./src/models/App");

let rawdata = fs.readFileSync("./src/v2.json");
let Apps = JSON.parse(rawdata).applist.apps;

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const get = async () => {
  for (let a of Apps) {
    let ext = await App.exists({ steam_appid: a.appid });
    if (ext) {
      await Apps.pop(a);
    }
  }
  let data = JSON.stringify({ applist: { apps: Apps } });
  fs.writeFileSync("./src/v2.json", data);
  for (let a of Apps) {
    let res = await axios
      .get(`https://store.steampowered.com/api/appdetails?appids=${a.appid}`)
      .catch((e) => e.response.status);
    if (res === 429) {
      console.log("wait for 5 min...");
      await sleep(1000 * 60 * 5);
      res = await axios
        .get(`https://store.steampowered.com/api/appdetails?appids=${a.appid}`)
        .catch((e) => e.response.status);
    }
    let app = res.data[a.appid];
    console.log("saved <-", a.name);
    if (app.success) {
      const game = new App(app.data);
      game.save((err, doc) => {
        if (err) {
          console.log(err);
        }
      });
    }
    Apps.pop(a);
  }
  data = JSON.stringify({ applist: { apps: Apps } });
  fs.writeFileSync("./src/v2.json", data);
};

get();
// const test = async () => {
//   let res = await App.exists({ steam_appid: 000 });

//   console.log(res);
// };

// test();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
