const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('server.js starting');
console.log('PORT:', PORT);
console.log('MONGO_URI present:', !!MONGO_URI);

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(MONGO_URI, mongooseOptions)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      //console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Server running at ${process.env.REACT_APP_ASSET_URL}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    console.warn('Starting server anyway. Some features may fail without a DB connection.');
    app.listen(PORT, () => {
      //console.log(`Server running at http://localhost:${PORT} (no DB)`);
      console.log(`Server running at ${process.env.REACT_APP_ASSET_URL} (no DB)`);
    });
  });
