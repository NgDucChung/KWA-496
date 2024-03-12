'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from '@mui/material';
import { mutate } from "swr"


interface IProps{
    openModalCreate: boolean;
    setOpenModalCreate: (value: boolean) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    margintop: 20,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    flex: 'flex-direction',
  };
  

export default function BasicModal(props: IProps) {

    const {openModalCreate, setOpenModalCreate} = props;

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleSubmit = () => {

        if(!title){
            toast.error("Not empty title !")
            return;
        }
        if(!author){
            toast.error("Not empty author !")
            return;
        }
        if(!content){
            toast.error("Not empty content !")
            return;
        }

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plan, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, content })
    }).then(res => res.json())
        .then(res => {
            if(res){
                toast.success("Create new blog succeed !")
                handleCloseModal();
                mutate("http://localhost:8000/blogs")
            }
        });
    }

    const handleCloseModal = () => {
        setTitle("");
        setAuthor("");
        setContent("");
        setOpenModalCreate(false)
    }

  return (
    <div>
          <Modal
              open={openModalCreate}
              onClose={() => handleCloseModal()}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" margin={3}>
                      Add New A Blogs
                </Typography>

                <Typography margin={3}>
                    <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)}/>
                </Typography>

                <Typography margin={3}>
                    <TextField id="outlined-basic" label="Author" variant="outlined" onChange={(e) => setAuthor(e.target.value)}/>
                </Typography>

                <Typography margin={3}>
                    <TextField id="outlined-basic" label="Content" variant="outlined"rows={3} onChange={(e) => setContent(e.target.value)}/>
                </Typography>

                <Typography className='space-x-2'>

                    <Button variant="outlined" color='error' onClick={() => handleCloseModal()}>Close</Button>

                    <Button variant="contained" onClick={() => handleSubmit()}>Save</Button>
                </Typography>
              </Box>
          </Modal>
    </div>
  );
}