// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, 
    getDocs, onSnapshot, deleteDoc, 
    doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArYT_3o9WKDi_wdmLh32WKAikmrqGrt14",
    authDomain: "retofn-a63f7.firebaseapp.com",
    projectId: "retofn-a63f7",
    storageBucket: "retofn-a63f7.appspot.com",
    messagingSenderId: "468570950130",
    appId: "1:468570950130:web:3db85144a4a8bfc0fb036b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//Guardar datos
export const saveEstu = (id_estudiante,apellidos_estudiante,nombre_estudiante) =>
    addDoc(collection(db,"estudiantes"),{ id_estudiante,apellidos_estudiante,nombre_estudiante})

export const saveMatri = (id_matricula, id_estudiante, id_clase) =>
    addDoc(collection(db,"matriculas"),{ id_matricula, id_estudiante, id_clase})

export const saveClass = (id_clase, titulo, descripcion) =>
    addDoc(collection(db,"clases"),{ id_clase, titulo, descripcion})

//Obtener datos
export const get_estu = () => getDocs(collection(db,"estudiantes"))
export const on_get_estu = (callback) => onSnapshot(collection(db,"estudiantes"),callback)

export const get_Matri = () => getDocs(collection(db,"matriculas"))
export const on_get_matri = (callback) => onSnapshot(collection(db,"matriculas"),callback)

export const get_class = () => getDocs(collection(db,"clases"))
export const on_get_class = (callback) => onSnapshot(collection(db,"clases"),callback)


//Eliminar datos
export const deleteEstu = id => deleteDoc(doc(db,"estudiantes",id))
export const deleteMatri = id => deleteDoc(doc(db,"matriculas",id))
export const deleteClass = id => deleteDoc(doc(db,"clases",id))

export const getEstu = id => getDoc(doc(db,"estudiantes",id))
export const getMatri = id => getDoc(doc(db,"matriculas",id))
export const getClass = id => getDoc(doc(db,"clases",id))

//Actualizar datos
export const updateEstu = (id,newFields) => updateDoc(doc(db,"estudiantes",id),newFields)
export const updateMatri = (id,newFields) => updateDoc(doc(db,"matriculas",id),newFields)
export const updateClass = (id,newFields) => updateDoc(doc(db,"clases",id),newFields)