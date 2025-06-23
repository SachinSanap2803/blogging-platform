import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditBlog.css';

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (err) {
                alert(err.response?.data?.msg || 'Failed to fetch blog');
            }
        };
        fetchBlog();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/blogs/${id}`,
                { title, content },
                { headers: { Authorization: token } }
            );
            alert('Blog updated!');
            navigate(`/blogs/${id}`);
        } catch (err) {
            alert(err.response?.data?.msg || 'Update failed');
        }
    };

    return (
        <div className="editblog-container">
            <div className="editblog-wrapper">
                <h2 className="editblog-title">Edit Blog</h2>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="editblog-input"
                        placeholder="Blog Title"
                        required
                    />
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        className="editblog-editor"
                        theme="snow"
                    />
                    <button type="submit" className="editblog-button">
                        Update Blog
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditBlog;