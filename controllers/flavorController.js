const express = require('express');
const { Flavor} = require('../models');

const flavorController = express.Router();

flavorController.get('/', async (req, res) => {
  try {
    const flavors = await Flavor.findAll();
    console.log("All the yums!")
    res.json(flavors);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = flavorController;
