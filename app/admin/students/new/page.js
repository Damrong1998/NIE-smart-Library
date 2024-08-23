"use client"
import { Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import FileUpload from '../../media/upload/page'
import { addData } from '@/app/db/function/CRUD'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab'
import { Save } from '@mui/icons-material'

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

function NewStudent() {
    const [isLoading, setIsLoading] = useState(false)
    // Input state
    const [firstNameKh, setFirstNameKh] = useState("")
    const [lastNameKh, setLastNameKh] = useState("")
    const [firstNameEn, setFirstNameEn] = useState("")
    const [lastNameEn, setLastNameEn] = useState("")

    const [studentId, setStudentId] = useState("")
    const [sex, setSex] = useState("")
    const [subject, setSubject] = useState("")
    const [studentClass, setStudentClass] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")

    // Modal state
    const [open, setOpen] = useState(false);

    // Handle Modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            firstNameKh: firstNameKh,
            lastNameKh: lastNameKh,
            firstNameEn: firstNameEn,
            lastNameEn: lastNameEn,
            studentId: studentId,
            sex: sex,
            subject: subject,
            class: studentClass,
            email: email,
            phone: phone,
            imageUrl: imageUrl,
            status: "active",
            description: description,
        }

        const added = await addData('students', data)
        if (added) {
            setFirstNameKh("")
            setLastNameKh("")
            setFirstNameEn("")
            setLastNameEn("")
            setStudentId("")
            setSex("")
            setSubject("")
            setStudentClass("")
            setEmail("")
            setPhone("")
            setImageUrl("")
            setDescription("")
        }
        toast.success('New Student is added successfully!', {
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
        <Container>
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
                    <FileUpload callBack={(url) => setImageUrl(url)} />
                </Box>
            </Modal>

            <Typography variant='h5' pb={2} pt={2}>Add New Student</Typography>
                <form onSubmit={handleSubmit}>
                <Box sx={{ bgcolor: "#fff", p: 5, mb: 2}} >
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>First Name KH</Typography>
                            <TextField 
                                id="firstnamekh" label="First Name" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={firstNameKh}
                                required
                                onChange={(e) => setFirstNameKh(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Last Name KH</Typography>
                            <TextField 
                                id="lastnamekh" label="Last Name" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={lastNameKh}
                                required
                                onChange={(e) => setLastNameKh(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>First Name EN</Typography>
                            <TextField 
                                id="firstnameen" label="First Name" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={firstNameEn}
                                required
                                onChange={(e) => setFirstNameEn(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Last Name EN</Typography>
                            <TextField 
                                id="lastnameen" label="Last Name" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={lastNameEn}
                                required
                                onChange={(e) => setLastNameEn(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{ bgcolor: "#fff", p: 5, mb: 2}} >

                    {/* Section 01 */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Student ID</Typography>
                            <TextField 
                                id="studentId" label="Student ID" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Sex</Typography>
                            <TextField 
                                id="sex" label="Sex" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Subject</Typography>
                            <TextField 
                                id="subject" label="Subject" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Class</Typography>
                            <TextField 
                                id="class" label="Class" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={studentClass}
                                onChange={(e) => setStudentClass(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Email</Typography>
                            <TextField 
                                id="email" label="Email" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography mb={1}>Phone</Typography>
                            <TextField 
                                id="phone" label="Phone" variant="outlined" 
                                fullWidth 
                                size='small'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Typography mb={1}>Photo</Typography>
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
                                onClick={handleOpen}
                            >
                                Select an Image
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Section 02 */}
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
            </Box>
                </form>
        </Container>
    )
}

export default NewStudent