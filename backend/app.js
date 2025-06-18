require('dotenv').config();
const express = require('express');
const app = express();
const dashboardRoutes = require('./routes/childProgressRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/childProgress', dashboardRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});
