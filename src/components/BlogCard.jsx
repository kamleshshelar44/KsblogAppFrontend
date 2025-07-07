import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs'; 
import EditIcon from '@mui/icons-material/Edit';

export default function BlogCard({ blog,handleDelete,setOpenModel,setEditId,setData}) {
 
  return (
    <Box height="100%" width="100%">
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {blog?.blogname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog?.text}
          </Typography>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ display: 'block', mt: 2,justifyContent: 'flex-end' }}
          >
            Posted on: {dayjs(blog?.createdAt).format('DD MMM YYYY, hh:mm A')}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <IconButton color="error" onClick={()=>handleDelete(blog?._id)} >
            <DeleteIcon />
          </IconButton>
                    <IconButton color="primary" onClick={()=>{
                      setData(blog)
                      setOpenModel(true)
                      setEditId(blog?._id)
                    }} >
           <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
