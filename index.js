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
  for (let a of Apps) {
    const data = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${a.appid}&cc=us`
    );

    // var info = res.data[a.appid].data;
    console.log(data);
    // const user = new App(info);
    // user.save((err, doc) => {
    //   if (err) console.log(err, "error :" + a);
    //   console.log(a.name);
    // });
  }
};

get();
