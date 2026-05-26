import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        const databaseName = process.env.MONGO_DB_NAME || 'onyx';

        if (!mongoUrl) {
            throw new Error('Missing MongoDB connection string. Set MONGO_URI or MONGO_URL in server/.env');
        }

        const conn = await mongoose.connect(mongoUrl, {
            dbName: databaseName,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
