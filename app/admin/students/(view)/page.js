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
import { searchStudentFirst, searchStudentNext, } from '@/app/db/function/searchStudent';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';


export default function ViewStudent() {

    const [students, setStudents] = useState([])
    const [lastVisibleDoc, setLastVisibleDoc] = useState("")
    const [isLoadingNext, setIsLoadingNext] = useState(false)
    const [isDataExist, setIsDataExist] = useState(false)

    // Search block
    const [search, setSearch] = useState("")

    React.useEffect(() => {
        getFirst()
    }, [search])

    const getFirst = async (params) => {
        const {data, lastVisible, isExist} = await searchStudentFirst({search: search})
        setStudents(data)
        setLastVisibleDoc(lastVisible)
        setIsDataExist(isExist)
    }

    const getNext = async (params) => {
        setIsLoadingNext(true)
        const {data, lastVisible, isExist} = await searchStudentNext({search: search, lastDoc: lastVisibleDoc})
        setStudents(data)
        setLastVisibleDoc(lastVisible)
        setIsDataExist(isExist)
        setIsLoadingNext(false)
    }

    return (
        <Container variant="xl">
            <Box display={"flex"} justifyContent={"space-between"} pt={5} pb={2}>
                <Box display={"flex"}>
                    <Typography variant='h5' mr={2}>All Students</Typography>
                    <Link 
                        // href={"/admin/students/new"}
                        href="https://nie-smart-library.web.app/admin/students/new.html" 
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
                            <TableCell>Photo</TableCell>
                            <TableCell>Name&nbsp;(kh)</TableCell>
                            <TableCell>Name&nbsp;(En)</TableCell>
                            <TableCell>Student Id</TableCell>
                            <TableCell>Sex</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Class</TableCell>
                            {/* <TableCell>Email</TableCell> */}
                            <TableCell>Phone</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {students?.length &&
                            students.map((row) => (
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
                                <TableCell component="th" scope="row">{row.firstNameKh + " " + row.lastNameKh}</TableCell>
                                <TableCell>{row.lastNameEn + " " + row.firstNameEn}</TableCell>
                                <TableCell>{row.studentId}</TableCell>
                                <TableCell>{row.sex}</TableCell>
                                <TableCell>{row.subject}</TableCell>
                                <TableCell>{row.class}</TableCell>
                                {/* <TableCell>{row.email}</TableCell> */}
                                <TableCell>{row.phone}</TableCell>
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
