import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/CreateBlog.css';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return alert('Title and content are required.');
        }

        try {
            const token = localStorage.getItem('token');
            console.log("Sending token:", token);
            const res = await axios.post(
                'http://localhost:5000/api/blogs/create',
                { title, content },
                { headers: { Authorization: token } }
            );
            alert('Blog created!');
            setTitle('');
            setContent('');
        } catch (err) {
            console.error("Error creating blog:", err);
            alert(err.response?.data?.msg || 'Error creating blog');
        }
    };

    return (
        <div className="createblog-container">
            <div className="createblog-wrapper">
                <h2 className="createblog-title">Create a Blog</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="createblog-input"
                        required
                    />
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        className="createblog-editor"
                        theme="snow"
                    />
                    <button type="submit" className="createblog-button">
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );

}

export default CreateBlog;