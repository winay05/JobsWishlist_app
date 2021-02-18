const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const jobController = require('./../../controllers/jobController');
const Job = require('./../../models/jobModel');
const User = require('./../../models/userModel');
const userController = require('./../../controllers/userController');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const deleteData = async () => {
  try {
    await Job.deleteMany();
    await User.deleteMany();
    console.log('data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

(async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('DB connection successfull');
    // let Jobs = [];
    if (process.argv[2] === '--delete') {
      await deleteData();
      console.log('deleted all the data');
      process.exit();
    }
    //initially gets jobs only from LinkedIn jobs
    let newJobs = await jobController.getJobs('Software', 'India');
    // console.log(newJobs);

    const users = JSON.parse(
      fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
    );

    await User.create(users, { validateBeforeSave: false });
    console.log('inserted Users');

    await Job.insertMany(newJobs, { ordered: false });
    console.log('created jobs');

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit();
  }
})();
