"use client"
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '@/app/db/firebase';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { addData } from '@/app/db/function/CRUD';
import { Box, Button, Grid, Tab, TextField, Typography } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function FileUpload({callBack, acceptFile = "image"}) {
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
    

    const handleClick = () => {
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

    // console.log(url)
    const getUrl = () => {
        callBack(url)
        setFile("")
        setUrl("")
    };
    
    return (  
        <Box sx={{ bgcolor: "#fff" }} >
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
            <Box p={4} pt={2} pb={2} sx={{borderBottom: "1px solid gray"}}>
                <Typography>Add New {acceptFile == "image"? "Image File" : "Pdf File"}</Typography>
            </Box>
            <Box p={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box textAlign={"center"}>
                            <Image src={url? url : acceptFile == "image"? "/jpg_icon.png" : "/pdf_icon.png"} width={100} height={100} alt='My Image'/>
                            <Box>
                                {isUploading?
                                    <Typography>Uploading...</Typography>
                                    :
                                    <input
                                        type='file'
                                        accept={acceptFile == "image"? "image/png,image/jpeg": ".pdf"}
                                        size='small'
                                        // value={file}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                }   
                                <Button 
                                    ml={1}
                                    type='button' 
                                    variant='contained'
                                    onClick={handleClick}
                                >
                                    Upload
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box p={4} pt={2} pb={2} textAlign={"right"} sx={{borderTop: "1px solid gray"}}>
                <Button 
                    type='button'
                    variant='contained' 
                    onClick={getUrl}
                >
                    Get Url
                </Button>
            </Box>
        </Box>
    )
}

export default FileUpload