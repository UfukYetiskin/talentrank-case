import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { storage } from "@/utils/firebase";


export const getAllDocs = async (collectionName) => {
    try{
        const fetchDocs= await getDocs(collection(storage, collectionName));
        const docs = fetchDocs?.docs?.map((doc) => ({
            id : doc?.id,
            ...doc.data(),
        }));
        return docs;
    }catch(error){
        console.error("Error fethinc docs", error);
        throw error;
    }
}

export const getDocById = async (collectionName, data) => {
    try{
        const docRef = await addDoc(collection(storage, collectionName), data);
        return docRef.id;
    }catch(error){
        console.error("Error fethinc doc", error);
        throw error;
    }
}

export const updateDocument = async (collectionName, id, data) => {
    try {
      const docRef = doc(storage, collectionName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
};

export const deleteDocument = async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
};