const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;
const { db_url, JWT_ADMIN_SECRET, JWT_USER_SECRET } = require("../config");
mongoose.connect(db_url);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  instructors: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const User = new mongoose.model('User',UserSchema);
const Admin = new mongoose.model('Admin',AdminSchema);
const Course = new mongoose.model('Course',CourseSchema);

module.exports = {
    User,
    Admin,
    Course
}
