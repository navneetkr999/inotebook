import mongoose from 'mongoose';
const mongoURI = 'mongodb://localhost:27017/inotebook';

export const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connection successful!');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
}