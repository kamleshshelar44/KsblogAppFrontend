import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogData, setBlogsData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [data, setData] = useState({ blogname: "", text: "" });
  const [editId,setEditId]=useState()

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = () => {
    axios
      .get("http://localhost:5000/api/blogs/getAll")
      .then((res) => {
        setBlogsData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    setData(prevState=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  };

  const handleCreateBlog = () => {
    axios
      .post("http://localhost:5000/api/blogs/createBlog", data)
      .then((res) => {
        getAllBlogs();
        setData({ blogname: "", text: "" });
        setOpenModel(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/blogs/deleteBlogById/${id}`)
      .then(() => {
        getAllBlogs();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate=()=>{
     axios
      .put(`http://localhost:5000/api/blogs/updateBlogById/${editId}`, data)
      .then(() => {
        getAllBlogs();
        setOpenModel(false);
        setEditId(null);
        setData({ blogname: "", text: "" });
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <AppBar position="static" color="primary" >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blogs
          </Typography>
          <Button color="inherit" variant="outlined" onClick={() => setOpenModel(true)}>
            Create Blog
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={2}>
       {blogData &&<Grid container spacing={2}>
          {blogData?.map((blog) => (
           
              <BlogCard blog={blog} handleDelete={handleDelete} setEditId={setEditId} setData={setData} editId={editId} setOpenModel={setOpenModel} />
            
          ))}
        </Grid>}
      </Box>

      {openModel &&<Dialog open={openModel} onClose={() => setOpenModel(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId?'Update':'Create'} Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="blogname"
            label="Title"
            type="text"
            fullWidth
            value={data.blogname}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="text"
            label="Text"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={data.text}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{
            setData({ blogname: "", text: "" });
            setOpenModel(false)
          }} color="error">
            Cancel
          </Button>
          <Button onClick={()=>editId?handleUpdate():handleCreateBlog()} variant="contained" color="primary">
            {editId?'Update':'Create'}
          </Button>
        </DialogActions>
      </Dialog>}
    </>
  );
}
