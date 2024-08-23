"use client"
import React, { useState } from 'react'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { addData } from '@/app/db/function/CRUD'

function BookLanguage() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: name,
            status: "active",
            description: description,
        }

        const added = await addData('book_languages', data)

        if (added) {
            setName("")
            setDescription("")
        }
    } 

    return (
        <Box sx={{ bgcolor: "#fff" }} >
            <form onSubmit={handleSubmit}>
                <Box p={4} pt={2} pb={2} sx={{borderBottom: "1px solid gray"}}>
                    <Typography>Add New Language</Typography>
                </Box>
                <Box p={4} pt={2} pb={2}>
                    {/* Section 01 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography mb={1}>Name</Typography>
                            <TextField 
                                id="title" label="Name" variant="outlined" 
                                fullWidth 
                                size='small'
                                required
                                // helperText={name == "" && <span style={{color: 'red'}}>Required</span>}
                                value={name}
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
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box p={4} pt={2} pb={2} alignItems={"right"} sx={{borderBottom: "1px solid gray"}}>
                    <Button type='submit' variant="contained">Add New</Button>
                </Box>
            </form>
        </Box>
    )
}

export default BookLanguage