import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleTODO = () => {
    const { id } = useParams(); 
    console.log("ID:", id);

    const [todo, setTodo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/todo/single-todo/${id}`)
            .then((res) => {
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);  

    return (
        <Box sx={{ 
            padding: 4,
            maxWidth: '600px',
            margin: 'auto',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            mt:20,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}>
            <Typography variant='h5' sx={{ marginBottom: 2 }}>
                Name: {todo?.name}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 1 }}>
                Description: {todo?.description}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 1 }}>
                Priority: {todo?.priority}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 1 }}>
                Status: {todo?.status}
            </Typography>
            <Typography variant='body1'>
                Due Date: {todo?.dueDate}
            </Typography>
        </Box>
    );
};

export default SingleTODO;
