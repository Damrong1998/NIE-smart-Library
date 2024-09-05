import { db } from './../firebase';
import { addDoc, and, collection, doc, getDocs, limit, or, orderBy, query, setDoc, startAfter, Timestamp, where } from 'firebase/firestore'


// First
const searchMediaFirst = async ({search}) => {
    let isExist = false;
    const docRef = collection(db, "media")
    const firstQuery = query(docRef,
        and(
            or( 
                and(where("name", ">=", search), where("name", "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt", "desc"),
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


    docSnap.forEach((doc) => {
        data.push({
            id: doc.id, 
            ...doc.data()
        })
    })
    console.log(data)

    return { data, lastVisible, isExist }
}

// Next
const searchMediaNext = async ({search, lastDoc}) => {
    let isExist = false;
    const docRef = collection(db, 'media')
    const nextQuery = query(docRef,
        and(
            or( 
                and(where("name", ">=", search), where("name", "<=", search + "\uf8ff")),
            ),
            or(where("status", "==", "active")),
        ),
        orderBy("createdAt", "desc"),
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

    docSnap.forEach((doc) => {
        data.push({
            id: doc.id, 
            ...doc.data()
        })
    })
    console.log(data)
    return { data, lastVisible, isExist }
}



export { searchMediaFirst, searchMediaNext }