const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://jatinc957:powerjs@cluster0.k5jmnkv.mongodb.net/?retryWrites=true&w=majority/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the student data
const studentSchema = new mongoose.Schema({
  name: String,
  uid: String,
  class: String,
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema)

// Middleware to parse JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // You can add a 'public' folder for static assets if needed
app.set('view engine', 'ejs');

// Route to render the addStudent.ejs template
app.get('/add-student', (req, res) => {
  res.render('addStudent');
});

// API endpoint to add a new student
app.post('/students', async (req, res) => {
  try {
    const { name, uid, studentClass } = req.body;

    const newStudent = new Student({
      name: name,
      uid: uid,
      class: studentClass,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent); // Respond with the created student object
  } catch (error) {
    res.status(500).json({ error: 'Error adding student' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
