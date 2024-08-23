"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function MyModal({children}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <div>
            <Button type='button' variant='contained' onClick={handleOpen}>Add</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    {/* <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    { children }
                </Box>
            </Modal>
        </div>
    )
}

export default MyModal