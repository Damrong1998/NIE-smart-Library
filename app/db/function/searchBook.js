import { db } from './../firebase';
import { addDoc, and, collection, doc, getDocs, limit, or, orderBy, query, setDoc, startAfter, Timestamp, where } from 'firebase/firestore'


// First
const searchBookFirst = async ({search}) => {
    let isLoading = true;
    let isExist = false;
    const booksRef = collection(db, 'books')
    const firstQuery = query(booksRef,
        and(
            or( 
                and(where("title", ">=", search), where("title", "<=", search + "\uf8ff")),
                and(where("title2", ">=", search), where("title2", "<=", search + "\uf8ff")),
                and(where("code", ">=", search), where("code", "<=", search + "\uf8ff")),
                and(where("code2", ">=", search), where("code2", "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt"),
        limit(8)
    );
    const books = await getDocs(firstQuery)

    const lastVisible = books.docs[books.docs.length-1];
    // console.log("last", lastVisible);
    let data = []
    if (books.empty) {
        console.log('No more data');
        isLoading = false;
        isExist = false;
        return {data};
    } 
    isExist = true;


    books.forEach((book) => {
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
const searchBookNext = async ({search, lastDoc}) => {
    let isLoading = true;
    let isExist = false;
    const booksRef = collection(db, 'books')
    const nextQuery = query(booksRef,
        and(
            or( 
                and(where("title", ">=", search), where("title", "<=", search + "\uf8ff")),
                and(where("title2", ">=", search), where("title2", "<=", search + "\uf8ff")),
                and(where("code", ">=", search), where("code", "<=", search + "\uf8ff")),
                and(where("code2", ">=", search), where("code2", "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt"),
        startAfter(lastDoc),
        limit(8)
    );

    const books = await getDocs(nextQuery)

    const lastVisible = books.docs[books.docs.length-1];
    // console.log("last", lastVisible);

    let data = [];

    if (books.empty) {
        console.log('No more data');
        isLoading = false;
        isExist = false;
        return {data};
    } 
    isExist = true;

    books.forEach((book) => {
        data.push({
            id: book.id, 
            ...book.data()
        })
    })
    console.log(data)
    isLoading = false;
    return { data, lastVisible, isLoading, isExist }
}

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
    // const q = query(booksRef, 
    //     where("title", ">=", title), where("title", "<=", title + "\uf8ff"),
    //     where("code", ">=", code), where("code", "<=", code + "\uf8ff"),
    //     where("floorId", ">=", floorId), where("floorId", "<=", floorId + "\uf8ff"),
    // )

    const q1 = query(booksRef,
        or( 
            and(where("title", ">=", title), where("title", "<=", title + "\uf8ff")),
            and(where("title2", ">=", title), where("title2", "<=", title + "\uf8ff")),
            and(where("code", ">=", title), where("code", "<=", title + "\uf8ff")),
            and(where("code2", ">=", title), where("code2", "<=", title + "\uf8ff")),
        ),
    )

    const q2 = query(booksRef,
    and(
        or(where("floorId", "==", "jsy7pYY6btE2unUugBoL")),
        or(where("categoryId", "==", "HnqOzAQOPCCo0i5MjAqQ")),
        or( 
            and(where("title", ">=", title), where("title", "<=", title + "\uf8ff")),
            and(where("title2", ">=", title), where("title2", "<=", title + "\uf8ff")),
            and(where("code", ">=", title), where("code", "<=", title + "\uf8ff")),
            and(where("code2", ">=", title), where("code2", "<=", title + "\uf8ff")),
        ),
    )   
)

    const books = await getDocs(q1)

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

export { searchBooks, searchData, searchStudentByCode, searchBookFirst, searchBookNext}