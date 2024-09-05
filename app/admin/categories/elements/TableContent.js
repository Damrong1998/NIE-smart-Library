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
import { getCategory } from '@/app/db/function/searchCategory';
import { useSearchParams } from 'next/navigation';


export default function TableContent() {

    // const { typeId }= params;
    const params = useSearchParams();

    const type_Id = params.get("typeId")
    // console.log("Id", params.get("typeId"))

    const [posts, setPosts] = useState([])
    // Search block
    const [search, setSearch] = useState("")

    React.useEffect(() => {
        getFirst()
    }, [type_Id])

    const getFirst = async (params) => {
        const data = await getCategory({typeId: type_Id})
        setPosts(data)
    }
    

    return (
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
    );
}
