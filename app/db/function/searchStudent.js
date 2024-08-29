import { db } from './../firebase';
import { addDoc, and, collection, doc, getDocs, limit, or, orderBy, query, setDoc, startAfter, Timestamp, where } from 'firebase/firestore'


// First
const searchStudentFirst = async ({search}) => {
    let isExist = false;
    const docRef = collection(db, "students")
    const firstQuery = query(docRef,
        and(
            or( 
                and(where("userNameKh", ">=", search), where("userNameKh", "<=", search + "\uf8ff")),
                and(where("userNameEn", ">=", search), where("userNameEn", "<=", search + "\uf8ff")),
                and(where("userNameEn2", ">=", search), where("userNameEn2", "<=", search + "\uf8ff")),
                and(where("studentId", ">=", search), where("studentId", "<=", search + "\uf8ff")),
                and(where("studentId2", ">=", search), where("studentId2", "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt"),
        limit(5)
    );
    const docSnap = await getDocs(firstQuery)

    const lastVisible = docSnap.docs[docSnap.docs.length-1];
    console.log("last", lastVisible);
    let data = []
    if (docSnap.empty) {
        console.log('No more data');
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

    return { data, lastVisible, isExist }
}

// Next
const searchStudentNext = async ({search, lastDoc}) => {
    let isExist = false;
    const docRef = collection(db, 'students')
    const nextQuery = query(docRef,
        and(
            or( 
                and(where("userNameKh", ">=", search), where("userNameKh", "<=", search + "\uf8ff")),
                and(where("userNameEn", ">=", search), where("userNameEn", "<=", search + "\uf8ff")),
                and(where("userNameEn2", ">=", search), where("userNameEn2", "<=", search + "\uf8ff")),
                and(where("studentId", ">=", search), where("studentId", "<=", search + "\uf8ff")),
                and(where("studentId2", ">=", search), where("studentId2", "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt"),
        startAfter(lastDoc),
        limit(5)
    );

    const docSnap = await getDocs(nextQuery)

    const lastVisible = docSnap.docs[docSnap.docs.length-1];
    // console.log("last", lastVisible);

    let data = [];

    if (docSnap.empty) {
        console.log('No more data');
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
    return { data, lastVisible, isExist }
}



export { searchStudentFirst, searchStudentNext}