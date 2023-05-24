const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { sequelize } = require('./models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/categories', require('./routes/category'));


app.listen({ port: 3000, }, async () => {
    // { focus: true }
    // await sequelize.sync();
    await sequelize.authenticate();
    console.log('starting');
});