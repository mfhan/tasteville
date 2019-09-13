const express = require('express');
const { Food} = require('../models');
const {restrict} = require('../services/auth.js')
const foodController = express.Router();

foodController.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    console.log("All the yum yums!")
    res.json(foods);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

foodController.get('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    //to connext to flavors:
    const flavors = await food.getFlavors()
    console.log(flavors)
    console.log("This is the yumyum")
    //using spread operator:
    //res.json(foods);
    res.json({...food.dataValues, flavors: flavors});
  } catch (e) {
    res.status(500).send(e.message);
  }
});

foodController.post('/', restrict, async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.json(food);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

foodController.put('/:id', restrict, async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    await food.update(req.body);
    res.json(food);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

foodController.delete('/:id', restrict, async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    await food.destroy();
    res.json(food);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//allows you to add a flavor to a food
foodController.put('/:food_id/flavors/:flavor_id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.food_id);
    const newFlavor = await Flavor.findByPk(req.params.flavor_id);
    await food.addFlavors(newFlavor);
    const flavors = await food.getFlavors();
    res.json({ ...food.dataValues, flavors });
  } catch (e) {
    res.status(500).send(e.message);
  }
})

module.exports = foodController;
