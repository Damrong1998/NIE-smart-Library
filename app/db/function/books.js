
import { db } from './../firebase';
import { addDoc, collection, doc, getDocs, setDoc, Timestamp } from 'firebase/firestore'

// fetch data from books collection
const getBooks = async (name) => {
    const snapshot = await getDocs(collection(db, "books"))

    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }  

    const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))

    console.log(data)
    return data;
}


// add data to books collection
const addBook = async (title, code, data) => {
    try {
        const docData = {
            title: title,
            code: code,
            book_cover: "",
            book_typeID: "02",
            floorID: "01",
            categoryID: "03",
            languageID: "01",
            year: "03",
            file: "",
            status: "active",
            other: "",
            created_at: Timestamp.fromDate(new Date("December 10, 1815")),
        };
        
        const docRef  = await addDoc(collection(db, "books"), docData);

        console.log("Data added", docRef.id )

        return true;

    } catch (error) {
        console.log("Error", error )
        return false;
    }
}

// update data to books collection
const setBook = async ({id, title, code}) => {
    try {
        const docData = {
            title: title,
            code: code,
            book_cover: "",
            book_typeID: "02",
            floorID: "01",
            categoryID: "03",
            languageID: "01",
            year: "03",
            file: "",
            status: "active",
            other: "",
            created_at: Timestamp.fromDate(new Date("December 10, 1815")),
        };
        
        const docRef  = await setDoc(doc(db, "books", id), docData);

        console.log("Data added", docRef.id )

        return true;

    } catch (error) {
        console.log("Error", error )
        return false;
    }
}

// delete data to books collection
const deleteBook = async ({id, title, code}) => {
    try {
        const docRef = await deleteDoc(doc(db, "cities", "DC"));

        console.log("Data deleted.", docRef.id )
        return true;
    } catch (error) {
        console.log("Error", error )
        return false;
    }
}

export { getBooks, addBook, setBook, deleteBook }