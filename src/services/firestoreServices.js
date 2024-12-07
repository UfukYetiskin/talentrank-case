import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { storage } from "@/utils/firebase";


export const getAllDocs = async () => {
    try {
      // Verileri getir
      const fetchDocs = await getDocs(collection(storage, "talentrank"));
  
      // Her belgeyi id ve içeriğiyle birlikte döndür
      const docs = fetchDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return docs;
    } catch (error) {
      console.error(`Error fetching documents from collection: ${collectionName}`, error);
      throw new Error("Belge getirme işlemi başarısız oldu.");
    }
  
};

export const getDocById = async (id) => {
  try {
    const docRef = doc(storage, "talentrank", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Belge bulunamadı");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};


export const addDocument = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(storage, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
};

export const updateDocById = async ( id, updatedData) => {
  try {
    const docRef = doc(storage, "talentrank", id);
    await updateDoc(docRef, updatedData);
    console.log(`Belge ${id} başarıyla güncellendi.`);
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const deleteDocById = async ( id) => {
  try {
    const docRef = doc(storage, "talentrank", id);
    await deleteDoc(docRef);
    console.log(`Belge ${id} başarıyla silindi.`);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};