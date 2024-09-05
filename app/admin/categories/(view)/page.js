/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
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
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getCategory } from '@/app/db/function/searchCategory';

export default function ViewStudent() {

    //  const params =  useParams()
    const searchParams =  useSearchParams()

    const type_Id = searchParams.get("typeId")

    console.log("Id", searchParams.get("typeId"))
 
    const [posts, setPosts] = useState([])
    // Search block
    const [search, setSearch] = useState("")

    useEffect(() => {
        getFirst()
    }, [type_Id])

    const getFirst = async (params) => {
        const data = await getCategory({typeId: type_Id})
        setPosts(data)
    }

    return (
        <Container variant="xl">
            <Box display={"flex"} justifyContent={"space-between"} pt={5} pb={2}>
                <Box display={"flex"}>
                    <Typography variant='h5' mr={2}>All Students</Typography>
                    <Link 
                        href={"/admin/categories/new"}
                    >
                        <Button size='small' variant='contained'>Add Category</Button>
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
            <Box sx={{ bgcolor: "#fff", p: 2, mb: 2}} >

                <TableContainer component={Paper} suppressHydrationWarning>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description&nbsp;(kh)</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {posts?.length &&
                            posts.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell align="right">
                                    <Button type='button' size='small' variant='contained' sx={{marginLeft: 2}} color="success" >View</Button>
                                    <Link href={`/admin/students/edit/${row.id}`}>
                                        <Button 
                                            type='button' 
                                            size='small' 
                                            variant='contained' 
                                            sx={{marginLeft: 2}} 
                                            color="primary" 
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button type='button' size='small' variant='contained' sx={{marginLeft: 2}} color="error" >Trash</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display={"flex"} justifyContent={"space-between"} pt={2} pb={2}>
                    {/* <Button type='button' variant='contained' onClick={getFirst}>Go back</Button>
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
                    } */}
                </Box>
            </Box>
        </Container>
    );
}
