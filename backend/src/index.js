const express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  routes = require('./routes'),
  app = express();

mongoose.connect('mongodb://root:1234@192.168.99.100:27017/week10', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if(err)
    console.log(`Mongo connection err: ${err}`);
  else
    console.log('Mongo connection established');
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);