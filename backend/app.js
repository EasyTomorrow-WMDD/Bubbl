require('dotenv').config();
const express = require('express');
const app = express();

const dashboardRoutes = require('./routes/childProgressRoutes');
const userRoutes = require('./routes/userRoutes');
const storyRoutes = require('./routes/storyRoutes');
const drawingRoutes = require('./routes/drawingRoutes');
const topicsRoutes = require('./routes/topicsRoutes');
const energyRoutes = require('./routes/energyRoutes');
const modulesRoutes = require('./routes/modulesRoutes');
const storyRoutes = require('./routes/storyRoutes');

//Increase img size to upload
app.use(express.json({ limit: '5mb' }));
app.use('/api/childProgress', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/drawings', drawingRoutes);

/////////////Topics//////////////////
app.use('/api/topics', topicsRoutes);
///////////////Energy/////////////////
app.use('/api/energy', energyRoutes);
///////////////Modules/////////////////
app.use('/api/modules', modulesRoutes);

app.use('/api/stories', storyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});
