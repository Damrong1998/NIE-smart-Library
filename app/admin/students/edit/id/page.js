"use client"
import React, { useEffect, useState } from 'react'
import EditFormStudent from '../../forms/EditFormStudent';
import { getData, getDataById } from '@/app/db/function/CRUD';
import { Typography } from '@mui/material';

function EditStudent({params}) {
    const {id} = params;

    const [student, setStudent] = useState("")

    useEffect(() => {
        // Book Type 
        const getStudent = async (params) => {
            const data = await getDataById('students', id)
            setStudent(data)
        }

        getStudent()
    }, [])

    if (student == "") {
        return (
            <>
                <Typography>Loading...</Typography>
            </>
        )
    }
    
    return <EditFormStudent id={id} data={student} />;
}

export default EditStudent