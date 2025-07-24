const mongoose = require("mongoose");
const config = require("config");
const mongoDataPassword = config.get("database.mongoDataPassword");

const mongoURI = `mongodb://data-admin:${mongoDataPassword}@localhost:27017/mongodb-data?authSource=admin`;

const connectMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectMongo;
