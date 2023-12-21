import { Typography,Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate,setDueDate] = useState(new Date())
  const [data,setData] = useState([])

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(()=>{
    axios.get('http://localhost:4000/api/todo')
    .then((res)=>{
      console.log(res)
      setData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const handleAddTodo = () => {
    const data = { name, description, priority, status, dueDate };

    axios.post(`http://localhost:4000/api/todo/add`, data)
        .then((res) => {
            console.log(res);
            setOpenDialog(false);
        })
        .catch((err) => {
            console.log(err);
        });
};

  
  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Button
          variant='contained'
          color='warning'
          sx={{ margin: '10px', p: 3 }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Add A Todo
        </Button>
      </Box>
      
      <Box display='flex' justifyContent='center'>
  <Box sx={{ border: '1px solid black', p: 2, maxWidth: '600px', borderRadius: '8px' }}>
    <ul>
      {data.map((item) => (
        <li key={item.id} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5', borderRadius: '4px', cursor: 'pointer' }} onClick={() =>{navigate(`/todo/${item._id}`)}}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
          <Typography variant="body2" color="textSecondary">{item.description}</Typography>
          <Typography variant="body2" color="textSecondary">Priority: {item.priority}</Typography>
          <Typography variant="body2" color="textSecondary">Status: {item.status}</Typography>
          <Typography variant="body2" color="textSecondary">Due Date: {item.dueDate}</Typography>
        </li>
      ))}
    </ul>
  </Box>
</Box>




      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>ADD A NEW TODO</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin='dense'
            label='Write Name'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <TextField
            fullWidth
            multiline
            maxRows={6}
            margin='dense'
            label='Write Description'
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Box>
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <RadioGroup value={priority} onChange={handlePriorityChange}>
                <FormControlLabel value='High' control={<Radio />} label='High' />
                <FormControlLabel value='Intermediate' control={<Radio />} label='Intermediate' />
                <FormControlLabel value='Low' control={<Radio />} label='Low' />
              </RadioGroup>
            </FormControl>
          </Box>
          <br />
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup value={status} onChange={handleStatusChange}>
              <FormControlLabel value='Done' control={<Radio />} label='Done' />
              <FormControlLabel value='Pending' control={<Radio />} label='Pending' />
              <FormControlLabel value='Doing' control={<Radio />} label='Doing' />
            </RadioGroup>
          </FormControl>
          <br />
          <Box>
            <Typography variant='captiopn' sx={{mr:2}}>
              Select Date:
            </Typography>
          <DatePicker
            selected={dueDate}
            onChange={(date) => { setDueDate(date) }}
            sx={{ width: '100%' , p:3}}  // Set the DatePicker to full width
          />
          </Box>
       </DialogContent>
        <DialogActions>
          <Button variant='contained' color='warning' onClick={handleAddTodo}>
            Add
          </Button>
          <Button variant='contained' onClick={() => { setOpenDialog(false) }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
