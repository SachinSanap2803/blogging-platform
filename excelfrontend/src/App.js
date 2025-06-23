
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import BlogDetails from './pages/BlogDetails';
// import CreateBlog from './pages/CreateBlog';
// import EditBlog from './pages/EditBlog';
// import Login from './pages/login';
// import MyBlogs from './pages/MyBlogs';
// import Register from './pages/register';
// import ViewBlogs from './pages/ViewBlogs';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/create" element={<CreateBlog />} />
//         <Route path="/blogs" element={<ViewBlogs />} />
//         <Route path="/blogs/:id" element={<BlogDetails />} />
//         <Route path="/edit/:id" element={<EditBlog />} />
//         <Route path="/myblogs" element={<MyBlogs />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import BlogDetails from './pages/BlogDetails';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Login from './pages/login';
import MyBlogs from './pages/MyBlogs';
import Register from './pages/register';
import ViewBlogs from './pages/ViewBlogs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ViewBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<ViewBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* Protected Routes */}
        <Route path="/create" element={
          <PrivateRoute><CreateBlog /></PrivateRoute>
        } />
        <Route path="/edit/:id" element={
          <PrivateRoute><EditBlog /></PrivateRoute>
        } />
        <Route path="/myblogs" element={
          <PrivateRoute><MyBlogs /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;