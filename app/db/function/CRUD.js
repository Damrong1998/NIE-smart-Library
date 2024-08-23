
import { db } from '../firebase';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore'


const getDataByFieldName = async (collection_name, studentId, dateCode ) => {
    const booksRef = collection(db, collection_name)
    const q = query(booksRef, 
        where("studentId", "==", studentId), 
        where("dateCode", "==", dateCode)
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

const isDocExist = async(collection_name, id) => {
    const docRef = doc(db, collection_name, id);
    const docSnap = await getDoc(docRef);

    let status = false;
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        status = true;
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        status = false;
    }

    return status;
}



// fetch data from books collection
const getData = async(collection_name) => {
    const snapshot = await getDocs(collection(db, collection_name))

    if (snapshot.empty) {
        console.log('There is no collection name', collection_name);
        return;
    } 

    const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))

    console.log(data)
    return data;
}

const getDataById = async(collection_name, id) => {

    const snapshot = await getDocs(collection(db, collection_name))
    if (snapshot.empty) {
        console.log('There is no collection name', collection_name);
        return;
    } 

    const docRef = doc(db, collection_name, id);
    const docSnap = await getDoc(docRef);

    let data = "";

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        data = docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        data = "None";
    }
    return data
}

// add data to books collection
const addData = async (collection_name, data) => {
    try {
        const docData = {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: Timestamp.fromDate(new Date("December 10, 1815")),
        };
        
        const docRef  = await addDoc(collection(db, collection_name), docData);

        console.log("Data added", docRef.id )
        return true;

    } catch (error) {
        console.log("Error", error )
        return false;
    }
}

// update data to books collection
const setData = async (collection_name, id, data) => {
    try {
        const docData = {
            ...data,
            updatedAt: serverTimestamp(),
        };
        
        const docRef  = doc(db, collection_name, id);
        await setDoc(docRef, docData)

        console.log("Data Created")
        return true;

    } catch (error) {
        console.log("Error", error )
        return false;
    }
}

const updateData = async (collection_name, id, data) => {
    try {
        const docData = {
            ...data,
            updatedAt: serverTimestamp(),
        };
        
        const docRef  = doc(db, collection_name, id);
        await updateDoc(docRef, docData)

        console.log("Data Updated" )
        return true;

    } catch (error) {
        console.log("Error", error )
        return false;
    }
}

// delete data to books collection
const deleteData = async (collection_name, id) => {
    try {
        const docRef = await deleteDoc(doc(db, collection_name, id));

        console.log("Data deleted.", docRef.id )
        return true;
    } catch (error) {
        console.log("Error", error )
        return false;
    }
}

const findId = async (params) => {
    
}

export { getData, getDataById, addData, setData, updateData, deleteData, getDataByFieldName, isDocExist}