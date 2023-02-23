import mongoose from 'mongoose';

export default async () => {
  // Connect to the database
  try {
    
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://push:push@localhost/web-push-notifications', {
      //useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

  } catch (e) {
    console.error(`Couldn't connect to the database: ${e}`);
    process.exit(1);
  }
};
