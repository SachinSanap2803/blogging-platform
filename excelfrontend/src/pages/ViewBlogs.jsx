import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ViewBlogs.css'; // Make sure this path matches

function ViewBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/blogs');
                setBlogs(res.data);
                setFilteredBlogs(res.data);
            } catch (err) {
                alert(err.response?.data?.msg || 'Failed to load blogs');
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const results = blogs.filter(blog =>
            blog.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredBlogs(results);
    }, [search, blogs]);

    return (
        <div className="viewblogs-container">
            <div className="viewblogs-wrapper">
                <h2 className="viewblogs-title">All Blogs</h2>

                <input
                    type="text"
                    placeholder="Search by blog title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="viewblogs-search"
                />

                {filteredBlogs.length === 0 ? (
                    <p className="viewblogs-empty">No matching blogs found.</p>
                ) : (
                    filteredBlogs.map((blog) => (
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
                                className="blog-readmore"
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

export default ViewBlogs;