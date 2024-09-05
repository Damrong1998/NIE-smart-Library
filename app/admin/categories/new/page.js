"use client"
import { Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addData } from '@/app/db/function/CRUD'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab'
import { Save } from '@mui/icons-material'


function NewCategory() {
    const [isLoading, setIsLoading] = useState(false)
    // Input state
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            name: name,
            name2: name.toLowerCase(),
            typeId: "01",
            description: description,
        }

        const added = await addData('book_categories', data)
        if (added) {
            setName("")
            setDescription("")
            
        }
        toast.success('New Student is added successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setIsLoading(false)
    } 

    return (
        <Container>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition: Bounce,
            />
            <Typography variant='h5' pb={2} pt={2}>Add New Category</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ bgcolor: "#fff", p: 5, mb: 2}} >
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} md={12}>
                            <Typography mb={1}>Name</Typography>
                            <TextField 
                                id="name" label="Name" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography mb={1}>Description</Typography>
                            <TextField 
                                id="description" label="Description" variant="outlined" 
                                fullWidth 
                                size='small'
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {/* Section 04 */}
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            {isLoading 
                                ?
                                <LoadingButton
                                    loading
                                    loadingPosition="start"
                                    startIcon={<Save />}
                                    variant="outlined"
                                >
                                    Save
                                </LoadingButton>
                                :
                                <Button type='submit' variant="contained">Add New</Button>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Container>
    )
}

export default NewCategory