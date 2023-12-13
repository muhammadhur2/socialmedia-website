const upload = require('../utils/uploads'); // Adjust the path based on your folder structure

exports.uploadImage = (req, res) => {
    console.log(req.file); // Log the uploaded file details
    console.log(req.body); // Log any additional data sent in the request

    if (!req.file) {
        console.error('No file uploaded!');
        return res.status(400).send({ message: 'No file selected!' });
    }

    // Assuming the file URL is needed in the response
    const fileUrl = req.file.location; // The location (URL) of the file in S3

    res.send({
        message: 'File uploaded successfully!',
        file: fileUrl
    });
};

