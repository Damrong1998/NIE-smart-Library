"use client"
import { Box, Button, ButtonGroup, Checkbox, colors, Container, FormControlLabel, FormGroup, Grid, Input, Modal, Pagination, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { db } from '../../db/firebase'

import { collection, getDocs } from 'firebase/firestore'
import { getData } from '../../db/function/CRUD'
import { searchBooks } from '@/app/db/function/search'
import BookCard from '@/app/components/frontend/BookCard'
import CheckboxList from '@/app/components/CheckboxList'
import { Search } from '@mui/icons-material'
import CheckboxList2 from '@/app/components/CheckboxList2'

function HomePage() {

    const [books, setBooks] = useState([])
    // show filter
    const [showFilter, setShowFilter] = useState(false)

    // Search block
    const [title, setTitle] = useState("")
    const [search, setSearch] = useState("")
    const [floorId, setFloorId] = useState("")

    useEffect(() => {
        const fetchBooks = async (params) => {
            const data = await getData('books')
        
            if (data) {
                console.log("data", data)
                setBooks(data)
            }
        }
        fetchBooks()
    }, [])

    // Search block
    useEffect(() => {

        const getBooks = async () => {
            const data = await searchBooks({title: title, code: search, floorId: floorId})
            if (data) {
                console.log("data", data)
                setBooks(data)
            }
        }

        // if (search.length > 0 || title.length > 0 || floorId > 0) { 
            getBooks()
        // }


    }, [search, title, floorId])

   
    return (
        <div style={{backgroundColor: '#fff'}}>
            
            <Box pt={5} pb={5} sx={{bgcolor: "pink"}}>
                <Container maxWidth="md">
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Button variant='outlined' onClick={()=> setShowFilter(!showFilter)}>Filter</Button>
                        <TextField 
                            id="title" label="Title" variant="outlined" 
                            fullWidth 
                            size='small'
                            placeholder='Title...' 
                            sx={{bgcolor: '#fff'}}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Button variant='contained' sx={{marginLeft: 1}} startIcon={<Search/>}>Search</Button>
                    </Box>
                </Container>
            </Box>      

            <Box display={"flex"}> 
                {showFilter &&
                    <Box sx={{border: "1px solid gray", borderRadius: 2}} width={380}>
                        <Box p={2} pl={4} pr={4} sx={{borderBottom: "1px solid gray"}}>
                            <Typography variant='h5'>Filters</Typography>
                        </Box>
                        <Container maxWidth="lg">
                            <CheckboxList label={"Book Types"} collection={"book_type"}/>
                            <CheckboxList label={"Categories"} collection={"book_categories"}/>
                            <CheckboxList label={"Years"} collection={"book_years"}/>
                        </Container>
                    </Box>
                }
                <Box sx={{ width: '100%'}}>
                    <Box pt={2} pb={2} >
                        <Container maxWidth="lg">
                            
                            <CheckboxList2 collection={"book_floors"} />

                            <Typography variant='h4' pb={2}>Your book is here</Typography>
                            <Grid container spacing={2}>
                                { books.length > 0 
                                    ?
                                    books.map((book, index) => (
                                        <Grid key={book.id} item xs={12} sm={6} md={3}>
                                            <BookCard 
                                                data={book} 
                                            />
                                        </Grid>
                                    ))
                                    : 
                                    <>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <BookCard loading/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <BookCard loading/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <BookCard loading/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <BookCard loading/>
                                    </Grid>
                                    </>  
                                }
                            </Grid>

                            <Box pt={4} pb={2} fullWidth display={"flex"} justifyContent={"center"}>
                                <Pagination count={10} variant="outlined" shape="rounded" />
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Box>

                
        </div>
    )
}

export default HomePage