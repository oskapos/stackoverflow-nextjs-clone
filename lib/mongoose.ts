import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('Missing MongoDB URI');

  if (isConnected) return console.log('MongoDB is already connected');

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'devflow',
    });

    isConnected = true;
    console.log('MongoDB connection is ready');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
