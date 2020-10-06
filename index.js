const mongoose = require("mongoose");
const axios = require("axios");

const config = require("./src/config/config").get();

const { App } = require("./src/models/App");

const Apps = require("./src/v2.json").applist.apps;

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const get = async () => {
  rem = [];
  for (let a of Apps) {
    let ext = await App.exists({ steam_appid: a.appid });
    if (!ext) {
      await rem.push(a);
    }
  }
  for (let a of rem) {
    const res = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${a.appid}`
    );
    let app = res.data[a.appid];
    console.log(app, a.name);
    if (app.success) {
      const game = new App(app.data);
      game.save((err, doc) => {
        if (err) console.log(err, "error :" + a);
      });
    }
  }
};

get();
// const test = async () => {
//   let res = await App.exists({ steam_appid: 000 });

//   console.log(res);
// };

// test();
