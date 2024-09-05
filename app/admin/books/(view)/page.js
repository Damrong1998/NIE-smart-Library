/* eslint-disable @next/next/no-img-element */
"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { getData } from '@/app/db/function/CRUD';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { searchBookFirst, searchBookNext } from '@/app/db/function/searchBook';

export default function ViewBook({params}) {

    const [books, setBooks] = useState([])

    const [lastVisibleDoc, setLastVisibleDoc] = useState("")
    const [isLoadingNext, setIsLoadingNext] = useState(false)
    const [isDataExist, setIsDataExist] = useState(true)

    // Search block
    const [search, setSearch] = useState("")

    React.useEffect(() => {
        getFirst()
    }, [search])

    const getFirst = async (params) => {
        const {data, lastVisible, isExist} = await searchBookFirst({search: search})
        setBooks(data)
        setLastVisibleDoc(lastVisible)
        setIsDataExist(isExist)
    }

    const getNext = async (params) => {
        setIsLoadingNext(true)
        const {data, lastVisible, isExist} = await searchBookNext({search: search, lastDoc: lastVisibleDoc})
        setBooks(data)
        setLastVisibleDoc(lastVisible)
        setIsDataExist(isExist)
        setIsLoadingNext(false)
    }

    return (
        <Container variant="xl">
            <Box display={"flex"} justifyContent={"space-between"} pt={5} pb={2}>
                <Box display={"flex"}>
                    <Typography variant='h5' mr={2}>All Books</Typography>
                    <Link 
                        // href={"/admin/books/new"}
                        href="https://nie-smart-library.web.app/admin/books/new.html"
                    >
                        <Button size='small' variant='contained'>Add new</Button>
                    </Link>
                </Box>
                <Box display={"flex"}>
                    <TextField 
                        id="search" label="Search" variant="outlined" 
                        fullWidth 
                        size='small'
                        placeholder='Type here...' 
                        sx={{bgcolor: '#fff', mr: 2}}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button size='small' variant='contained'>Export</Button>
                </Box>
            </Box>
            {/* <Box sx={{ bgcolor: "#fff", p: 2, mb: 2}} > */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Book Cover</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Book Code</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {books?.length > 0 &&
                        books.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <img 
                                        style={{width: "60px", height: 'auto'}}
                                        src={row.imageUrl? row.imageUrl: "/jpg_icon.png"} 
                                        alt='' 
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">{row.title}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell align="right">
                                    <Button type='button' size='small' variant='contained' sx={{marginLeft: 2}} color="success" >View</Button>
                                    <Link 
                                        // href={`/admin/books/edit/${row.id}`}
                                        href={{
                                            pathname: "/admin/books/edit",
                                            query: {
                                                id: row.id,
                                            }
                                        }} 
                                    >
                                        <Button type='button' size='small' variant='contained' sx={{marginLeft: 2}} color="primary" >Edit</Button>
                                    </Link>
                                    <Button type='button' size='small' variant='contained' sx={{marginLeft: 2}} color="error" >Trash</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display={"flex"} justifyContent={"space-between"} pt={2} pb={2}>
                    <Button type='button' variant='contained' onClick={getFirst}>Go back</Button>
                    {isLoadingNext
                        ?
                        <LoadingButton
                            loading
                            loadingPosition="start"
                            startIcon={<Save />}
                            variant="outlined"
                        >
                            Loading...
                        </LoadingButton>
                        :
                        <Button type='button' 
                            variant='contained'
                            onClick={getNext}
                            disabled={!isDataExist? true : false }
                        >
                            Next
                        </Button>
                    }
                </Box>
            {/* </Box> */}
        </Container>
    );
}
