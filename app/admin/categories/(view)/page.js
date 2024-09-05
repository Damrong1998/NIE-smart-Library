/* eslint-disable @next/next/no-img-element */
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
import TableContent from '../elements/TableContent';


export default function ViewStudent() {

    // Search block
    // const [search, setSearch] = useState("")
    const search = "";

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
                        // onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button size='small' variant='contained'>Export</Button>
                </Box>
            </Box>
            {/* <Box sx={{ bgcolor: "#fff", p: 2, mb: 2}} > */}

                <TableContent />

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
            {/* </Box> */}
        </Container>
    );
}
