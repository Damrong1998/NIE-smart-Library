"use client"
import React, { useEffect, useState } from 'react'
import { getData, getDataById } from '@/app/db/function/CRUD';
import { Typography } from '@mui/material';
import EditFormBook from '../../forms/EditFormBook';

function EditStudent({params}) {
    const {id} = params;

    const [book, setBook] = useState("")

    useEffect(() => {
        // Book Type 
        const getBook = async (params) => {
            const data = await getDataById('books', id)
            setBook(data)
        }

        getBook()
    }, [])

    if (book == "") {
        return (
            <>
                <Typography>Loading...</Typography>
            </>
        )
    }
    
    return <EditFormBook id={id} data={book} />;
}

export default EditStudent