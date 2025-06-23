import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyBlogs.css'; // <-- Add this line

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/blogs/myblogs/all', {
                    headers: { Authorization: token }
                });
                setBlogs(res.data);
            } catch (err) {
                alert(err.response?.data?.msg || 'Failed to fetch your blogs');
            }
        };
        fetchMyBlogs();
    }, []);

    return (
        <div className="myblogs-wrapper">
            <div className="myblogs-container">
                <h2 className="myblogs-title">My Blogs</h2>
                {blogs.length === 0 ? (
                    <p className="myblogs-empty">You haven't written any blogs yet.</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog._id} className="blog-card">
                            <h3 className="blog-title">{blog.title}</h3>
                            <div
                                className="blog-content"
                                dangerouslySetInnerHTML={{
                                    __html: blog.content.slice(0, 150) + '...',
                                }}
                            />
                            <Link
                                to={`/blogs/${blog._id}`}
                                className="read-more-link"
                            >
                                Read More →
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyBlogs;