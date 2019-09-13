const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const flavorController = require('./controllers/flavorController');
const foodController = require('./controllers/foodController');
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3001;
//define the initial variable
const app = express();

//set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
//app.use('/composers', composerRouter);
app.use('/flavors', flavorController);
app.use('/foods', foodController);
app.use('/auth', userController);
//catch-all:
app.use((e, req, res, next) =>{
  if (e) {
    console.log(e.message);
    next(e);
  }
})

//necessary routes
app.get('/', (req, res) => {
  res.send('Welcome to Tasteville');
});

//our listen
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
