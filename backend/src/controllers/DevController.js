const axios = require("axios"),
  Dev = require("../models/Dev"),
  parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  store,
  index
};

async function store(request, response) {
  const { github_username, techs, latitude, longitude } = request.body;

  let dev = await Dev.findOne({ github_username });

  if (!dev) {
    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = apiResponse.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });
  }

  return response.json(dev);
}

async function index(request, response) {
  const devs = await Dev.find();
  return response.json(devs);
}