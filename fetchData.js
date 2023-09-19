const mongoose = require('mongoose');

const uri ='mongodb+srv://jatinc957:powerjs@cluster0.k5jmnkv.mongodb.net/?retryWrites=true&w=majority'; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        fetchStudentData();
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

const studentSchema = new mongoose.Schema({
    name: String,
    uid: String,
    class: String,
});

const StudentModel = mongoose.model('Student', studentSchema);

async function fetchStudentData() {
    try {
        const students = await StudentModel.find({}, 'name uid class'); // Selecting only specific fields
        console.log('Fetched students data:', students);
    } catch (error) {
        console.error('Error fetching students data:', error);
    } finally {
        // Close the MongoDB connection when done
        mongoose.connection.close();
    }
}

// Start the data fetching process
fetchStudentData();
