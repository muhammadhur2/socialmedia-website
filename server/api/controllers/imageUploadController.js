const upload = require('../utils/uploads'); // Adjust the path based on your folder structure

exports.uploadImage = (req, res, next) => {
    console.log("File in uploadImage controller:", req.file);
    if (!req.file) {
        console.error('No file uploaded!');
        return res.status(400).send({ message: 'No file selected!' });
    }

    const fileUrl = req.file.location; // The location (URL) of the file in S3

    // Attach file URL to request and pass control to next middleware/controller
    req.fileUrl = fileUrl;
    next();
};

