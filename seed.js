const { Flavor, Food } = require('./models');

const seed = async () => {
  try {
    const flavor1 = await Flavor.create({ name: 'sour' });
    const flavor2 = await Flavor.create({ name: 'umami' });
    const flavor3 = await Flavor.create({ name: 'sweet' });
    const flavor4 = await Flavor.create({ name: 'salty' });
    const flavor5 = await Flavor.create({ name: 'spicy' });

    const food1 = await Food.create({ name: 'Picanha Steak' });
    const food2 = await Food.create({ name: 'Dos Toros Steak Burrito' });
    const food3 = await Food.create({ name: 'Sour Patch Kids' });

    await food1.setFlavors([flavor4, flavor2]);
    await food2.setFlavors([flavor4, flavor5, flavor2]);
    await food3.setFlavors([flavor1, flavor3]);
  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}

seed();
