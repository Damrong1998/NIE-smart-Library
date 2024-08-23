"use client"
import { db } from '@/app/db/firebase'
import { Input } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

function Search() {

    const [search, setSearch] = useState("")
    const [title, setTitle] = useState("")
    const [books, setBooks] = useState([])

    console.log(title)


    useEffect(() => {

        const getBooks = async () => {
            const books_ref = collection(db, 'books')
            const q = query(books_ref, 
                where("code", ">=", search), where("code", "<=", search + "\uf8ff"),
                where("title", ">=", title), where("title", "<=", title + "\uf8ff")
            )

            const doc_refs = await getDocs(q)

            const res = []

            doc_refs.forEach(book => {
                res.push({
                    id: book.id, 
                    ...book.data()
                })
            })

            console.log(res)
            setBooks(res)
        }

        if (search.length > 0 || title.length > 0) { 
            getBooks()
        }


    }, [search, title])

    return (
        <div>
            <Input 
                type='text' 
                placeholder='Search here...' 
                onChange={(e) => setSearch(e.target.value)}
                // onMouseDown={(e) => setValue(e.target.value)}
            />

            <Input 
                type='text' 
                placeholder='Title...' 
                onChange={(e) => setTitle(e.target.value)}
            />
            <div>Search</div>
            { books &&
                books.map((book, index) => (
                    <div  key={book.id}>
                        <div style={{color: "red"}}>Hello</div>
                        <ol>
                            <li>{book.title }</li>
                            <li>{book.code }</li>
                            <li>{book.language }</li>
                            <li>{book.floor }</li>
                            <li>{book.year}</li>
                            {/* <li>{book.book_type}</li> */}
                        </ol>
                    </div>
                ))
            }
        </div>
    )
}

export default Search