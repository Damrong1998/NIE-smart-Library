import { db } from './../firebase';
import { addDoc, collection, doc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore'



const searchStudentByCode = async (studentId) => {
    const booksRef = collection(db, 'students')
    const q = query(booksRef, where("studentId", "==", studentId))

    const books = await getDocs(q)

    const data = []

    books.forEach((book) => {
        data.push({
            id: book.id, 
            ...book.data()
        })
    })

    console.log(data)
    return data
}

const searchBooks = async ({title, code, floorId}) => {
    const booksRef = collection(db, 'books')
    const q = query(booksRef, 
        where("title", ">=", title), where("title", "<=", title + "\uf8ff"),
        where("code", ">=", code), where("code", "<=", code + "\uf8ff"),
        where("floorId", ">=", floorId), where("floorId", "<=", floorId + "\uf8ff"),
    )

    const books = await getDocs(q)

    const data = []

    books.forEach((book) => {
        data.push({
            id: book.id, 
            ...book.data()
        })
    })

    console.log(data)
    return data
}


const searchData = async ({name, field01, text01, field02, text02}) => {
    const books_ref = collection(db, 'books')
    const q = query(books_ref, 
        where(field01, ">=", text01), where(field01, "<=", text01 + "\uf8ff"),
        where(field02, ">=", text02), where(field02, "<=", text02 + "\uf8ff")
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
    return res;
}

export { searchBooks, searchData, searchStudentByCode}