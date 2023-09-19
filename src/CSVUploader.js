import React, { useRef } from 'react';
import { uploadCSVtoFirestore } from './firebase';

function CSVUploader() {
    const fileInput = useRef(null);

    const handleUpload = async () => {
        const file = fileInput.current.files[0];
        if (file) {
            try {
                await uploadCSVtoFirestore(file);
                console.log('Upload successful!');
            } catch (error) {
                console.error('Error uploading CSV:', error);
            }
        } else {
            console.error('No file selected.');
        }
    };

    return (
        <div>
            <input type="file" ref={fileInput} accept=".csv" />
            <button onClick={handleUpload}>Upload CSV</button>
        </div>
    );
}

export default CSVUploader;
