/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, Checkbox, colors, Container, FormControlLabel, FormGroup, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { addData, getData, getDataByFieldName, getDataById, isDocExist, setData, updateData } from '@/app/db/function/CRUD'
import { searchStudentByCode } from '@/app/db/function/search'
import Image from 'next/image'
import { CheckCircle } from '@mui/icons-material'
import { FieldValue, increment } from 'firebase/firestore'
import { Bounce, toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';


function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
}

function getDateCode() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date+month+year}`;
}


function AddNewGuest() {
    // Step change state
    const [step, setStep] = useState(1)

    // Function
    const [updateStatus, setUpdateStatus] = useState(false)

    // loading state
    const [isLoading, setIsLoading] = useState(false)

    // Input state
    const [name, setName] = useState("")
    const [reason, setReason] = useState("")
    const [status, setStatus] = useState("In")
    const [date, setDate] = useState(getDate())
    const [guestType, setGuestType] = useState("Student")

    // Input Guest state
    const [guestIn, setGuestIn] = useState("")
 
    // Code state
    const [dateCode, setDateCode] = useState(getDateCode())
    
    // Search state
    const [searchStudent, setSearchStudent] = useState("")

    // Data state
    const [students, setStudents] = useState([])
    console.log("Student", students)

    // Select state
    const [selectValue, setSelectValue] = useState(1);

    // 
    const [guestCounter, setGuestCounter] = useState("")

    useEffect(() => {
        const getStudentByCode = async (params) => {
            const data = await searchStudentByCode(searchStudent)
            setStudents(data)
            console.log("Data", data)
        }

        if (searchStudent) {
            getStudentByCode()
        }
    }, [searchStudent])

    useEffect(() => {
        const getGuestCounter = async (params) => {
            const data = await getDataById('guest_counters' , dateCode)
            setGuestCounter(data)
        }

        // if (updateStatus) {
            getGuestCounter()
        // }
    }, [updateStatus])

    // Handle select
    const handleChangeValue = (event) => {
        if (event.target.value == 1) {
            setGuestType("Student")
        } else {
            setGuestType("Guest")
        }
        setSelectValue(event.target.value);
        setSearchStudent("")
        setStudents([])
        setName("")
    };

    // Post data
    const handleAddGuest = async (e) => {
        e.preventDefault();

        setIsLoading(true)
        // Get student Id
        const studentId = students[0]?.id;
        // Check if student is already existed
        const check = await getDataByFieldName("guests", studentId, dateCode)

        const data = {
            name: name,
            reason: reason,
            studentId: studentId,
            date: date,
            guestType: guestType,
            status: "In", 
            dateCode: dateCode,
        }

        if (check.length > 0) {
            const added2 = await updateData('guests', check[0]?.id, {status: "Out", dateCode: "",})
            if (added2) {
                setName("")
                setReason("")
                setStatus("")

                setUpdateStatus("Out")
                toast.success('Good bye, See you later.', {
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
            }
        } else {
            const added = await addData('guests', data)
            if (added) {
                setName("")
                setReason("")
                setStatus("")

                setUpdateStatus("In")
                toast.success('Welcome to NIE smart library', {
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
            }
        }

        setStep(1)
        setIsLoading(false)
        setSearchStudent("")
        setStudents([])
    }

    useEffect(() => {
        const check = async (params) => {
            const checkGuestCounter = await isDocExist("guest_counters", dateCode)
            console.log("CH", checkGuestCounter)
            if (!checkGuestCounter) {
                const dataCounter = {
                    guestIn: 0,
                    guestOut: 0,
                    date: date,
                }
                const counter =  await setData("guest_counters", dateCode, dataCounter)
                if (counter) {
                    console.log("Guest Counter Created")
                }
            }
        }
        check()
    }, [])

    useEffect(() => {
        const updateGuestIn = async (params) => {
            const dataCounter = {
                guestIn: increment(1),
                date: date,
            }
            const counter =  await updateData("guest_counters", dateCode, dataCounter)
            if (counter) {
                console.log("Update Guest In")
            }
        }
        const updateGuestOut = async (params) => {
            const dataCounter = {
                guestOut: increment(1),
                date: date,
            }
            const counter =  await updateData("guest_counters", dateCode, dataCounter)
            if (counter) {
                console.log("Update Guest Out")
            }
            
        }
        if (updateStatus == "In") {
            updateGuestIn()
        }
        if (updateStatus == "Out") {
            updateGuestOut()
        }

    }, [updateStatus])
    

    return (
        <Box sx={{bgcolor: '#fff'}}>
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
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}
                sx={{height: "100vh"}}
            >
                
                <Box sx={{ width: "800px", background: "#fff" }}>
                    <Box pb={6} textAlign={"center"}>
                        <Typography variant='h4'>People in <span style={{color: "blue"}}>NIE smart library</span> now.</Typography>
                        <Typography variant='h3'>{guestCounter.guestIn - guestCounter.guestOut}/200</Typography>
                    </Box>
                    {step == 1 &&
                        <>
                        <Typography variant='h4' pb={1}>1. Student Check In/Out</Typography>
                        <Box 
                            sx={{ 
                                bgcolor: "#fff", 
                                border: "1px solid gray",
                                borderRadius: "5px",
                            }} 
                            p={4} pt={8} pb={8} 
                        >
                         
                            {/* Section 01 */}
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography mb={1}>Select Type</Typography>
                                    <TextField
                                        id="type"
                                        select
                                        label="type"
                                        fullWidth
                                        size='small'
                                        value={selectValue}
                                        defaultValue={1}
                                        onChange={handleChangeValue}
                                        // helperText="Please select your currency"
                                    > 
                                        <MenuItem value={1} selected>
                                            Student
                                        </MenuItem>
                                        <MenuItem value={2}>
                                            Guest
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={8}>
                                    { selectValue == 1 &&
                                        <>
                                        <Typography mb={1}>Enter your ID</Typography>
                                        <TextField 
                                            id="studentId" label="Student ID" variant="outlined" 
                                            fullWidth 
                                            // size='small'
                                            value={searchStudent}
                                            required
                                            onChange={(e) => setSearchStudent(e.target.value)}
                                            helperText={students.length < 1 && "No march with code"}
                                            InputProps={{
                                                endAdornment: students.length > 0 && <CheckCircle color='info' />,
                                            }}
                                        />
                                        </>
                                    }
                                    { selectValue == 2 &&
                                        <>
                                        <Typography mb={1}>Enter your name</Typography>
                                        <TextField 
                                            id="guest" label="Guest" variant="outlined" 
                                            fullWidth 
                                            // size='small'
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        </>
                                    }
                                </Grid>
                            </Grid>

                        </Box>
                        <Box sx={{ bgcolor: "#fff" }} p={2} display={"flex"} justifyContent={"flex-end"}>
                            {selectValue == 1 && 
                                <Button 
                                    mt={2} 
                                    type='button' 
                                    variant="contained" 
                                    onClick={() => setStep(2)}
                                    disabled={students.length < 1 ? true: false}
                                >
                                    Next
                                </Button>
                            }
                            {selectValue == 2 && 
                                <Button 
                                    mt={2} 
                                    type='button' 
                                    variant="contained" 
                                    onClick={() => setStep(2)}
                                    disabled={name == "" ? true: false}
                                >
                                    Next
                                </Button>
                            }
                        </Box>
                    </>
                    }
                    {step == 2 &&
                    <>
                        <Typography variant='h4' pb={1}>2. Reason</Typography>
                        <Box 
                            sx={{ 
                                bgcolor: "#fff", 
                                border: "1px solid gray",
                                borderRadius: "5px",
                            }} 
                            p={4} pt={6} pb={6} 
                        >
                            {isLoading
                                ?
                                <Grid container spacing={2}>
                                    <Grid item xs={12} textAlign={"center"}>
                                        <Typography variant='h4'>Your data is Updating...</Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container spacing={2}>
                                    <Grid item xs={4} textAlign={"center"}>
                                        {/* <Image
                                            src={students[0]?.imageUrl? students[0]?.imageUrl: "/user_icon.png"}
                                            width={100}
                                            height={120}
                                            alt="Picture of the author"
                                        /> */}
                                        <img 
                                            style={{width: "100%", height: 'auto'}}
                                            src={students[0]?.imageUrl? students[0]?.imageUrl: "/user_icon.png"} 
                                            alt='' 
                                        />
                                        {selectValue == 1 &&
                                            <>
                                            <Typography mb={1} variant='h5'>{students[0]?.firstNameKh} {students[0]?.lastNameKh}</Typography>
                                            {/* <Typography mb={1} variant='h5'>{students[0]?.firstNameEn} {students[0]?.lastNameEn}</Typography> */}
                                            </>
                                        }
                                        {selectValue == 2 &&
                                            <Typography mb={1} variant='h5'>{name}</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='h4'>Select your reason</Typography>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Reading" />
                                            <FormControlLabel control={<Checkbox />} label="Researching" />
                                            <FormControlLabel control={<Checkbox />} label="Study" />
                                            <FormControlLabel control={<Checkbox />} label="Working" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            }
                            
                            
                        </Box>
                        <Box sx={{ bgcolor: "#fff" }} p={2} display={"flex"} justifyContent={"space-between"}>
                            <Button type='button' variant="contained" onClick={() => setStep(1)}>Go Back</Button>
                            <Button type='button' variant="contained" disabled={isLoading} onClick={handleAddGuest} >Submit</Button>
                        </Box>
                    </>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default AddNewGuest