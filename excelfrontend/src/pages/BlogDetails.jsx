import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/BlogDetails.css';

function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(res.data);

                // Check if current user is the blog's author
                if (token) {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    if (payload.id === res.data.author) {
                        setIsOwner(true);
                    }
                }
            } catch (err) {
                alert(err.response?.data?.msg || 'Failed to load blog');
            }
        };
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                headers: { Authorization: token }
            });
            alert("Blog deleted.");
            navigate('/blogs');
        } catch (err) {
            alert(err.response?.data?.msg || 'Delete failed');
        }
    };

    if (!blog) return <div className="blogdetails-loading">Loading blog...</div>;

    return (
        <div className="blogdetails-container">
            <div className="blogdetails-wrapper">
                <h2 className="blogdetails-title">{blog.title}</h2>
                <div
                    className="blogdetails-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                {isOwner && (
                    <div className="blogdetails-actions">
                        <button
                            className="blogdetails-btn edit"
                            onClick={() => navigate(`/edit/${blog._id}`)}
                        >
                            Edit
                        </button>
                        <button
                            className="blogdetails-btn delete"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogDetails;