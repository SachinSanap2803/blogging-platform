const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // declare token properly
    console.log("Received token in header:", token);

    if (!token) return res.status(401).json({ msg: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log("Token verified. User:", req.user);
        next();
    } catch (err) {
        console.log("Invalid Token");
        res.status(400).json({ msg: 'Invalid Token' });
    }
};

// Create Blog
router.post('/create', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log('Token verified user:', req.user);
        console.log('Creating blog with title:', title);

        const newBlog = new Blog({
            title,
            content,
            author: req.user.id
        });

        await newBlog.save();
        res.status(201).json({ msg: 'Blog created successfully', blog: newBlog });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ msg: "Failed to fetch blogs" });
    }
});

// Get single blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: "Blog not found" });
        res.json(blog);
    } catch (err) {
        console.error("Error fetching blog by ID:", err);
        res.status(500).json({ msg: "Error retrieving blog" });
    }
});

// Delete Blog
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        console.log("Blog author:", blog.author.toString());
        console.log("Logged-in user ID:", req.user.id);

        if (blog.author.toString() !== req.user.id) {
            console.log("Unauthorized delete attempt");
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        await blog.deleteOne();
        console.log("Blog deleted");
        res.json({ msg: 'Blog deleted successfully' });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update blog
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog not found' });

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        blog.title = req.body.title;
        blog.content = req.body.content;
        await blog.save();

        res.json({ msg: 'Blog updated successfully', blog });
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get blogs by logged-in user
router.get('/myblogs/all', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        console.error("Error fetching user blogs:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;