import { db } from './../firebase';
import { addDoc, and, collection, doc, getDocs, limit, or, orderBy, query, setDoc, startAfter, Timestamp, where } from 'firebase/firestore'


// First
const searchFirst = async (collection_name, {field01, field02, search}) => {
    let isLoading = true;
    let isExist = false;
    const docRef = collection(db, collection_name)
    const firstQuery = query(docRef,
        and(
            or( 
                // and(where("title", ">=", search), where("title", "<=", search + "\uf8ff")),
                and(where(field01, ">=", search), where(field01, "<=", search + "\uf8ff")),
                // and(where("code", ">=", search), where("code", "<=", search + "\uf8ff")),
                and(where(field02, ">=", search), where(field02, "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt"),
        limit(4)
    );
    const docSnap = await getDocs(firstQuery)

    const lastVisible = docSnap.docs[docSnap.docs.length-1];
    // console.log("last", lastVisible);
    let data = []
    if (docSnap.empty) {
        console.log('No more data');
        isLoading = false;
        isExist = false;
        return {data};
    } 
    isExist = true;


    docSnap.forEach((book) => {
        data.push({
            id: book.id, 
            ...book.data()
        })
    })
    console.log(data)
    isLoading = false;

    return { data, lastVisible, isLoading, isExist }
}

// Next
const searchNext = async (collection_name, {field01, field02, search, lastDoc}) => {
    let isLoading = true;
    let isExist = false;
    const docRef = collection(db, collection_name)
    const nextQuery = query(docRef,
        and(
            or( 
                // and(where("title", ">=", search), where("title", "<=", search + "\uf8ff")),
                and(where(field01, ">=", search), where(field01, "<=", search + "\uf8ff")),
                // and(where("code", ">=", search), where("code", "<=", search + "\uf8ff")),
                and(where(field02, ">=", search), where(field02, "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt"),
        startAfter(lastDoc),
        limit(4)
    );

    const docSnap = await getDocs(nextQuery)

    const lastVisible = docSnap.docs[docSnap.docs.length-1];
    // console.log("last", lastVisible);

    let data = [];

    if (docSnap.empty) {
        console.log('No more data');
        isLoading = false;
        isExist = false;
        return {data};
    } 
    isExist = true;

    docSnap.forEach((book) => {
        data.push({
            id: book.id, 
            ...book.data()
        })
    })
    console.log(data)
    isLoading = false;
    return { data, lastVisible, isLoading, isExist }
}

// 
const searchStudentByCode = async (studentId) => {
    const docRef = collection(db, 'students')
    const q = query(docRef, where("studentId", "==", studentId))

    const docSnap = await getDocs(q)

    const data = []

    docSnap.forEach((book) => {
        data.push({
            id: book.id, 
            ...book.data()
        })
    })

    console.log(data)
    return data
}


// Normal
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

export { searchData, searchStudentByCode, searchFirst, searchNext}