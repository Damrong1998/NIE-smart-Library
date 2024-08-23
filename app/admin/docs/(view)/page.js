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
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { getData } from '@/app/db/function/CRUD';

export default function ViewBook() {

    const [books, setBooks] = useState([])

    React.useEffect(() => {
        // Book Type 
        const getBooks = async (params) => {
            const data = await getData('books')
            setBooks(data)
        }

        getBooks()
    }, [])

    return (
        <Container variant="xl">
            <Box display={"flex"} justifyContent={"space-between"} pt={5} pb={2}>
                <Box display={"flex"}>
                    <Typography variant='h5' mr={2}>All Students</Typography>
                    <Link href={"/admin/docs/new"}>
                        <Button size='small' variant='contained'>Add new</Button>
                    </Link>
                </Box>
                <Button size='small' variant='contained'>Export</Button>
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
                        {books.length > 0 &&
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
                                    <Button type='button' size='small' variant='contained' sx={{marginLeft: 2}} color="primary" >Edit</Button>
                                    <Button type='button' size='small' variant='contained' sx={{marginLeft: 2}} color="error" >Trash</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            {/* </Box> */}
        </Container>
    );
}
