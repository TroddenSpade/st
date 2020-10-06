const config = {
  SECRET: "",
  DATABASE: "mongodb://localhost:27017/steam",
};

exports.get = function get() {
  return config;
};
