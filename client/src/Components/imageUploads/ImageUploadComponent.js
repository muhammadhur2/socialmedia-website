import React, { useState } from 'react';
import uploadService from '../../Services/uploadService'; // Adjust the path if needed

const ImageUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = event => {
        // console.log(event.target.files[0]); // Log the selected file
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile, selectedFile.name);
    
        try {
            const response = await uploadService.uploadImage(formData);
            console.log('Response:', response);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response) {
                console.log('Error response:', error.response);
            } else {
                console.log('Error with no response:', error);
            }
            alert('Error uploading file');
        }
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
        </div>
    );
};

export default ImageUploadComponent;
