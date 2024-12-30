import React, { useState } from 'react';

const UploadMovieModal = ({ onClose, onUpload }) => {
    const [file, setFile] = useState(null);

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:5000/api/movies/upload', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                onUpload(data.movie);
                onClose();
            });
    };

    return (
        <div className="modal">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default UploadMovieModal;
