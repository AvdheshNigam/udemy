const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    // console.log(err.name, err.message);
    process.exit(1);

    // Because server is not defined
    // server.close(() => {
    //     process.exit(1);
    // });
});

dotenv.config({path:'./config.env'});
const app = require('./app');


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose
// .connect(process.env.DATABASE_LOCAL, {
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true //By me
})
.then(() => console.log('DB connection sucessful!'))
// .catch(err => { //By me
//     console.log('DB Connection Error', err )
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App is running on ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLE REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// console.log(x);