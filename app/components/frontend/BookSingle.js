/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material'
import Image from 'next/image'
import { getDataById } from '@/app/db/function/CRUD'

function BookSingle({data}) {

    const [type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [floor, setFloor] = useState("")
    const [language, setLanguage] = useState("")

    const typeId = data.bookTypeId;
    const categoryId = data.categoryId;
    const floorId = data.floorId;
    const languageId = data.languageId;

    useEffect(() => {
        const getRelatedData = async (params) => {
            const dataType = await getDataById('book_type', typeId)
            const dataCategory = await getDataById('book_categories', categoryId)
            // const dataFloor = await getDataById('book_floors', floorId)
            const dataLanguage = await getDataById('book_languages', languageId)
        
            if (dataType) {
                setType(dataType)
            }
            if (dataCategory) {
                setCategory(dataCategory)
            }
            // if (dataFloor) {
            //     setFloor(dataFloor)
            // }
            if (dataLanguage) {
                setLanguage(dataLanguage)
            }
        }

        getRelatedData()
        
    }, [])

    console.log("Book Type", type)

    return (
        <Box sx={{ bgcolor: "#fff" }} p={4} pt={2} pb={2} >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box sx={{border: "1px solid gray", borderRadius: 2}}>
                        {/* <Image  
                            width={300}
                            height={400}
                            src={data.imageUrl? data.imageUrl: "/jpg_icon.png"} 
                            alt='image' 
                        /> */}
        
                        <img 
                            style={{width: "100%", height: 'auto'}}
                            src={data.imageUrl? data.imageUrl: "/jpg_icon.png"} 
                            alt='' 
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h4'>{data.title}</Typography>
                    <Typography pb={1}>{data.description}</Typography>
                    <Typography pb={2}>
                        {
                            type.name || category.name || floor.name || language.name
                            ? (
                                <>
                                <span style={{fontWeight: 600}}>Book Code: </span> {data.code}
                                <br/>
                                <span style={{fontWeight: 600}}>Book Type: </span> {type.name? type.name: (<span></span>)}
                                <br/>
                                <span style={{fontWeight: 600}}>Category: </span> {category.name? category.name: (<span><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></span>)}
                                <br/>
                                <span style={{fontWeight: 600}}>Floor: </span> {floor.name}
                                <br/>
                                <span style={{fontWeight: 600}}>Language: </span> {language.name}
                                </>
                            )
                            : (
                                <>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                </>
                            )
                        }
                        
                    </Typography>
                    <Button 
                        type='button' 
                        variant='outlined' 
                        fullWidth
                        disabled={data.pdfUrl? false: true}
                    >
                            View Pdf
                    </Button>
                </Grid>
            </Grid>
            
            
        </Box>
    )
}

export default BookSingle