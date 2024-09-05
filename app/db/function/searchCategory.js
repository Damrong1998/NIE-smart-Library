import { db } from '../firebase';
import { addDoc, and, collection, doc, getDocs, limit, or, orderBy, query, setDoc, startAfter, Timestamp, where } from 'firebase/firestore'

// fetch data from books collection
const getCategory = async({typeId}) => {
    const docsRef = collection(db, 'book_categories')
    const firstQuery = query(docsRef,
        and(
            or(where("typeId", "==", typeId)),
            // or(where("status", "==", "active")),
        ),
        orderBy("createdAt"),
        limit(8)
    );
    const docs = await getDocs(firstQuery)

    let data = []
    if (docs.empty) {
        console.log('No more data');
        return data;
    } 

    docs.forEach((doc) => {
        data.push({
            id: doc.id, 
            ...doc.data()
        })
    })
    return data;
}

export { getCategory }