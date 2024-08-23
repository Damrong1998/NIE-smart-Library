"use client"
import { getData } from '@/app/db/function/CRUD'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function FileView({callBack}) {

    const [files, setFiles] = useState([])

    useEffect(() => {
        const fetchMedia = async (params) => {
            const data = await getData('media')
        
            if (data) {
                console.log("data", data)
                setFiles(data)
            }
        }
        fetchMedia()
    }, [])

    return (
        <Box sx={{ bgcolor: "#fff" }} >
            <Box p={4} pt={2} pb={2} sx={{borderBottom: "1px solid gray"}}>
                <Typography>All Images</Typography>
            </Box>

            <Box p={4} pt={2} pb={2} sx={{borderBottom: "1px solid gray"}}>
                {files && 
                    files.map((data) => (
                        <Image 
                            key={data.id} 
                            width={100}
                            height={100}
                            src={data.url} 
                            alt='image' />
                    ))
                }
            </Box>

            <Box p={4} pt={2} pb={2} textAlign={"right"} sx={{borderTop: "1px solid gray"}}>
                <Button 
                    type='button'
                    variant='contained' 
                    onClick={() => callBack(url)}
                >
                    Get Url
                </Button>
            </Box>
        </Box>
    )
}

export default FileView