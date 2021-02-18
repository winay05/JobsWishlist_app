const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  postedOn: Date,
  detailedLink: String,
});
jobSchema.index({ title: 1, company: 1, location: 1 }, { unique: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
