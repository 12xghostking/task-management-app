import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FileSharing = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTask, setSelectedTask] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleTaskChange = (e) => {
        setSelectedTask(e.target.value);
    };

    const handleFileUpload = () => {
        if (selectedFile && selectedTask) {
            // Here, you can handle the file upload to Cloudinary or any other storage service
            // and associate it with the selected task
            console.log('File Uploaded:', selectedFile);
            console.log('Task Selected:', selectedTask);

            // Reset the form after successful upload
            setSelectedFile(null);
            setSelectedTask('');
        }
    };

    return (
        <div>
            <h2>File Sharing</h2>

            <Form>
                <Form.Group controlId="taskName">
                    <Form.Label>Task:</Form.Label>
                    <Form.Control
                        type="text"
                        value={selectedTask}
                        onChange={handleTaskChange}
                        placeholder="Enter the name of the task"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>File:</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleFileUpload} disabled={!selectedFile || !selectedTask}>
                    Upload File
                </Button>
            </Form>
        </div>
    );
};

export default FileSharing;
