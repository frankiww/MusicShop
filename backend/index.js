const express = require('express');
const sequelize = require('./config/database');
require('./models/index');

//маршруты
const recordingRoutes = require('./routes/recordingRoutes');
const genreRoutes = require('./routes/genreRoutes');
const artistRoutes = require('./routes/artistRoutes');
const mediumRoutes = require('./routes/mediumRoutes');
const storeRoutes = require('./routes/storeRoutes');
const orderRoutes = require('./routes/orderRoutes');




const {swaggerSetup} = require('./config/swagger');
const app = express();
app.use(express.json());

//запросы
app.use('/api/recordings', recordingRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/mediums', mediumRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/orders', orderRoutes);




swaggerSetup(app);

const PORT = 3030;
app.listen(PORT, async() => {
    console.log(`http://localhost:${PORT}/api-docs/`);
    await sequelize.sync({alter: true});
})
