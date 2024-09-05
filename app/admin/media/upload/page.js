/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '@/app/db/firebase';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { addData } from '@/app/db/function/CRUD';
import { Box, Button, Container, Grid, Tab, TextField, Typography } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function FileUpload() {
    // 
    const [value, setValue] = React.useState('1');


    // 
    const [file, setFile] = useState("")
    const [url, setUrl] = useState("")

    // 
    const [isUploading, setIsUploading] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        const createMedia= async () => {
            const data = {
                name: "",
                url: url,
                status: "active",
                description: "",
            }
            const added = await addData('media', data)
            if (added) {
                // setName("")
                // setDescription("")
            }
        } 

        if (url) {
            createMedia()
        }
    }, [url])
    

    const handleSubmit = () => {
        console.log("Hello")
        if (file === null) {
            alert("Please select an image");
            return;
        }
        setIsUploading(true)
        const imageRef = ref(storage, `files/${uuidv4()}`);
    
        uploadBytes(imageRef, file)
            .then((snapshot) => {
                console.log(snapshot)
                getDownloadURL(snapshot.ref)
                .then((url) => {
                    setUrl(url);
                })
                .catch((error) => {
                    alert(error.message);
                });
            })
            .catch((error) => {
                alert(error.message);
            }
        );

        toast.success('New Media is added successfully!', {
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
        setIsUploading(false)
    };

    console.log(url)
  
    return (  
        <Container maxWidth="lg" sx={{}}>
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

            <Typography variant='h5' pb={2} pt={2} >Add New Book</Typography>

            <Box sx={{ bgcolor: "#fff", p: 5, mb: 2}} >
                {/* <form onSubmit={handleSubmit}> */}
                    <Box p={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box textAlign={"center"}>
                                    <img
                                        src={url?url: "/jpg_icon.png"} 
                                        style={{width: "260px", height: 'auto'}}
                                        alt='My Image'
                                    />
                                    <Box>
                                        {isUploading?
                                            <Typography>Uploading...</Typography>
                                            :
                                            <input
                                                type='file'
                                                accept={"image/png,image/jpeg,.pdf"}
                                                size='small'
                                                // value={file}
                                                required
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                        }   
                                        
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        
                    </Box>
                    <Button type='button' variant='contained' onClick={handleSubmit}>Upload</Button>
                {/* </form> */}
            </Box>
        </Container>
    )
}

export default FileUpload