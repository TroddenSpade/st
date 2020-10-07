const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  steam_appid: {
    type: Number,
    required: true,
    unique: 1,
  },
  required_age: {
    type: String,
    default: "",
  },
  is_free: {
    type: Boolean,
  },
  controller_support: {
    type: String,
  },
  dlc: {
    type: [Number],
    default: 0,
  },
  detailed_description: {
    type: String,
  },
  about_the_game: {
    type: String,
  },
  short_description: {
    type: String,
  },
  supported_languages: {
    type: String,
  },
  header_image: {
    type: String,
  },
  website: {
    type: String,
  },
  pc_requirements: {
    minimum: { type: String },
    recommended: { type: String },
  },
  mac_requirements: {
    minimum: { type: String },
    recommended: { type: String },
  },
  linux_requirements: {
    minimum: { type: String },
    recommended: { type: String },
  },
  developers: {
    type: [String],
  },
  publishers: {
    type: [String],
  },
  packages: {
    type: [String],
  },
  package_groups: [
    {
      name: String,
      title: String,
      description: String,
      selection_text: String,
      save_text: String,
      display_type: Number,
      is_recurring_subscription: String,
      subs: [
        {
          packageid: Number,
          percent_savings_text: String,
          percent_savings: Number,
          option_text: String,
          option_description: String,
          can_get_free_license: String,
          is_free_license: Boolean,
          price_in_cents_with_discount: Number,
        },
      ],
    },
  ],
  platforms: {
    windows: Boolean,
    mac: Boolean,
    linux: Boolean,
  },
  metacritic: {
    score: Number,
    url: String,
  },
  categories: [
    {
      id: Number,
      description: String,
    },
  ],
  genres: [
    {
      id: Number,
      description: String,
    },
  ],
  screenshots: [
    {
      id: Number,
      path_thumbnail: String,
      path_full: String,
    },
  ],
  movies: [
    {
      id: Number,
      name: String,
      thumbnail: String,
      webm: {
        480: String,
        max: String,
      },
      mp4: {
        480: String,
        max: String,
      },
      highlight: Boolean,
    },
  ],
  recommendations: {
    total: Number,
  },
  achievements: {
    total: Number,
    highlighted: [
      {
        name: String,
        path: String,
      },
    ],
  },
  release_date: {
    coming_soon: Boolean,
    date: String,
  },
  support_info: {
    url: String,
    email: String,
  },
  background: String,
  content_descriptors: {
    ids: [Number],
    notes: String,
  },
});

const App = mongoose.model("App", AppSchema);

module.exports = { App };
