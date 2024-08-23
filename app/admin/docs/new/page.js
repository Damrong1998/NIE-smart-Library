"use client"
import React, { useEffect, useState } from 'react'
import { addData, getData } from '@/app/db/function/CRUD';
import { Box, Button, Card, Container, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import dynamic from "next/dynamic";
import BookType from '@/app/components/admin/Elements/BookType';
import BookCategory from '@/app/components/admin/Elements/BookCategory';
import BookLanguage from '@/app/components/admin/Elements/BookLanguage';
import BookYear from '@/app/components/admin/Elements/BookYear';
import BookFloor from '@/app/components/admin/Elements/BookFloor';
import FileUpload from '../../media/upload/page';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    // p: 4,
};

function AddNewBook() {
    const [isLoading, setIsLoading] = useState(false)
    // Input state
    const [title, setTitle] = useState("")
    const [code, setCode] = useState("")
    const [description, setDescription] = useState("")

    // File Select
    const [imageUrl, setImageUrl] = useState("")
    const [pdfUrl, setPdfUrl] = useState("")

    // Select state
    const [selectType, setSelectType] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [selectYear, setSelectYear] = useState('');
    const [selectLanguage, setSelectLanguage] = useState('');
    const [selectFloor, setSelectFloor] = useState('');

    // Book Children
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [years, setYears] = useState([])
    const [languages, setLanguages] = useState([])
    const [floors, setFloors] = useState([])

    // Modal state
    const [open, setOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("");

    // Handle Modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenType = () => {
        setModalStatus("Type")
        setOpen(true)
    }
    const handleOpenCategory = () => {
        setModalStatus("Category")
        setOpen(true)
    }
    const handleOpenLanguage = () => {
        setModalStatus("Language")
        setOpen(true)
    }
    const handleOpenYear = () => {
        setModalStatus("Year")
        setOpen(true)
    }
    const handleOpenFloor = () => {
        setModalStatus("Floor")
        setOpen(true)
    }
    const handleOpenImageUrl = () => {
        setModalStatus("ImageUrl")
        setOpen(true)
    }
    const handleOpenPdfUrl = () => {
        setModalStatus("Pdf")
        setOpen(true)
    }

    useEffect(() => {
        // Book Type 
        const getBookTypes = async (params) => {
            const data = await getData('book_type')
            setTypes(data)
        }
        const getCategories = async (params) => {
            const data = await getData('book_categories')
            setCategories(data)
        }
        const getYears = async (params) => {
            const data = await getData('book_years')
            setYears(data)
        }
        const getLanguages = async (params) => {
            const data = await getData('book_languages')
            setLanguages(data)
        }
        const getFloors = async (params) => {
            const data = await getData('book_floors')
            setFloors(data)
        }

        getBookTypes()
        getCategories()
        getYears()
        getLanguages()
        getFloors()
    }, [])
    
    // Select HandleChange
    const handleChangeType = (event) => {
        setSelectType(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setSelectCategory(event.target.value);
    };
    const handleChangeYear = (event) => {
        setSelectYear(event.target.value);
    };
    const handleChangeLanguage = (event) => {
        setSelectLanguage(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setSelectFloor(event.target.value);
    };

    // file Upload Change
    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        // const added = await addBook({title, code});
        const data = {
            title: title,
            code: code,
            imageUrl: imageUrl,
            pdfUrl: pdfUrl,
            bookTypeId: selectType,
            floorId: selectFloor,
            categoryId: selectCategory,
            languageId: selectLanguage,
            year: selectYear,
            status: "active",
            description: description,
        }

        const added = await addData('books', data)
        if (added) {
            setTitle("")
            setCode("")
            setDescription("")
            setSelectType("")
            setSelectCategory("")
            setSelectLanguage("")
            setSelectFloor("")
            setSelectYear("")

            setImageUrl("")
            setPdfUrl("")
        }
        toast.success('New book is added successfully!', {
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
        setIsLoading(false)
    } 

    return (
        <Container maxWidth="lg" sx={{}}>
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
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <Box sx={styleModal}>
                    {modalStatus == "Type" && <BookType />}
                    {modalStatus == "Category" && <BookCategory />}
                    {modalStatus == "Language" && <BookLanguage />}
                    {modalStatus == "Year" && <BookYear />}
                    {modalStatus == "Floor" && <BookFloor />}
                    {modalStatus == "ImageUrl" && <FileUpload callBack={(url) => setImageUrl(url)} />}
                    {modalStatus == "Pdf" && <FileUpload  acceptFile="pdf" callBack={(url) => setPdfUrl(url)} />}
                </Box>
            </Modal>

            <Typography variant='h5' pb={2} pt={2} >Add New Book</Typography>

            <Box sx={{ bgcolor: "#fff", p: 5, mb: 2}} >
                <form onSubmit={handleSubmit}>

                    {/* Section 01 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Book Title</Typography>
                            <TextField 
                                id="title" label="Title" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={title}
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Book Code</Typography>
                            <TextField 
                                id="code" label="Code" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Book Type</Typography>
                            <Box display="flex" flexDirection={"row"}>
                                <TextField
                                    id="type"
                                    select
                                    label="Book Type"
                                    fullWidth
                                    size='small'
                                    required
                                    value={selectType}
                                    onChange={handleChangeType}
                                    // helperText="Please select your currency"
                                > 
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {types && 
                                        types.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <Button 
                                    type='button' 
                                    variant="contained" 
                                    sx={{ml: 1}}
                                    onClick={handleOpenType}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Category</Typography>
                            <Box display="flex" flexDirection={"row"}>
                                <TextField
                                    id="category"
                                    select
                                    label="Category"
                                    fullWidth
                                    size='small'
                                    value={selectCategory}
                                    onChange={handleChangeCategory}
                                    // helperText="Please select your currency"
                                > 
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {categories && 
                                        categories.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <Button 
                                    type='button' 
                                    variant="contained" 
                                    sx={{ml: 1}}
                                    onClick={handleOpenCategory}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Year</Typography>
                            <Box display="flex" flexDirection={"row"}>
                                <TextField
                                    id="year"
                                    select
                                    label="Year"
                                    fullWidth
                                    size='small'
                                    value={selectYear}
                                    onChange={handleChangeYear}
                                    // helperText="Please select your currency"
                                > 
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {years && 
                                        years.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <Button 
                                    type='button' 
                                    variant="contained" 
                                    sx={{ml: 1}}
                                    onClick={handleOpenYear}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Grid>               
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Language</Typography>
                            <Box display="flex" flexDirection={"row"}>
                                <TextField
                                    id="language"
                                    select
                                    label="Language"
                                    fullWidth
                                    size='small'
                                    value={selectLanguage}
                                    onChange={handleChangeLanguage}
                                    // helperText="Please select your currency"
                                > 
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {languages && 
                                        languages.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <Button 
                                    type='button' 
                                    variant="contained" 
                                    sx={{ml: 1}}
                                    onClick={handleOpenLanguage}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Floor</Typography>
                            <Box display="flex" flexDirection={"row"}>
                                <TextField
                                    id="floor"
                                    select
                                    label="Floor"
                                    fullWidth
                                    size='small'
                                    value={selectFloor}
                                    onChange={handleChangeFloor}
                                    // helperText="Please select your currency"
                                > 
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {floors && 
                                        floors.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <Button 
                                    type='button' 
                                    variant="contained" 
                                    sx={{ml: 1}}
                                    onClick={handleOpenFloor}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    {/* Section 02 */}
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Book Cover</Typography>
                            <Box mb={1} sx={{bgcolor: "#eeeeee", border: "1px solid gray", borderRadius: 2, width: 100, height: 140}}>
                                <Image
                                    src={imageUrl? imageUrl: "/jpg_icon.png"}
                                    width={100}
                                    height={120}
                                    alt="Picture of the author"
                                />
                            </Box>
                            <Button 
                                type='button' 
                                variant="contained" 
                                sx={{ml: 1}}
                                onClick={handleOpenImageUrl}
                            >
                                Add Book Cover
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Upload Pdf</Typography>
                            <Box mb={1} sx={{bgcolor: "#eeeeee", border: "1px solid gray", borderRadius: 2, width: 100, height: 140}}>
                                <Image
                                    src={pdfUrl? pdfUrl: "/pdf_icon.png"}
                                    width={100}
                                    height={120}
                                    alt="Picture of the author"
                                />
                            </Box>
                            <Button 
                                type='button' 
                                variant="contained" 
                                sx={{ml: 1}}
                                onClick={handleOpenPdfUrl}
                            >
                                Add Pdf file
                            </Button>
                        </Grid>
                    </Grid>
                    
                    {/* Section 03 */}
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            <Typography mb={1}>Description</Typography>
                            <TextField 
                                id="code" label="Description" variant="outlined" 
                                fullWidth 
                                size='small'
                                multiline
                                rows={4}
                                defaultValue=""
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {/* Section 04 */}
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            {isLoading 
                                ?
                                <LoadingButton
                                    loading
                                    loadingPosition="start"
                                    startIcon={<Save />}
                                    variant="outlined"
                                >
                                    Save
                                </LoadingButton>
                                :
                                <Button type='submit' variant="contained">Add New</Button>
                            }
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default AddNewBook