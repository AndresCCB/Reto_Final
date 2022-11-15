import {saveEstu, saveMatri, saveClass, getEstu, getMatri, 
    getClass, on_get_estu, on_get_matri, on_get_class, 
    deleteEstu, deleteMatri, deleteClass, updateEstu, updateMatri, updateClass} from "./firebase.js"


const EstudiantesContainer = document.getElementById('estudiantes-container')
const EstudianteForm = document.getElementById('Estudiante-formulario')

const MatriculaForm = document.getElementById('Matricula-formulario')
const MatriculasContainer = document.getElementById('matriculas-container')

const ClaseForm = document.getElementById('Clase-formulario')
const ClasesContainer = document.getElementById('clases-container')

let editStatusEstudi = false;
let editStatusMatri = false;
let editStatusClass = false;

let idEstudi = ''
let idMatri = ''
let idClass = ''

window.addEventListener('DOMContentLoaded', async () => {
    
    // Mostrar estudiantes
    on_get_estu((estudiantes)=>{
        let html = '';
        
        estudiantes.forEach(doc => {
        const estudiante = doc.data()
        html += `<h4>Estudiante</h4>
            <div class ="crud-header">
                <h5>ID : ${estudiante.id_estudiante}</h5>
                <p>Apellidos: ${estudiante.apellidos_estudiante}</p>
                <p>Nombres: ${estudiante.nombre_estudiante}</p>
                <div>
                    <button class="button is-danger" data-id="${doc.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="button is-warning" data-id="${doc.id}" >
                        <i class="fas fa-pencil"></i>
                    </button>
                </div>
            </div>
        `
        })

        EstudiantesContainer.innerHTML = html
        const btnsDeleteEstudiante = EstudiantesContainer.querySelectorAll('.button.is-danger')

        //Borrar estudiante
        btnsDeleteEstudiante.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset }}) => {
                deleteEstu(dataset.id)
            })
        })

        const btnEditEstudiante = EstudiantesContainer.querySelectorAll('.button.is-warning')

        // Editar estudiante
        btnEditEstudiante.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getEstu(e.target.dataset.id)
                const estudiante = doc.data()

                EstudianteForm['id-estudiante'].value = estudiante.id_estudiante
                EstudianteForm['apellido-estudiante'].value = estudiante.apellidos_estudiante
                EstudianteForm['nombre-estudiante'].value = estudiante.nombre_estudiante

                editStatusEstudi = true
                idEstudi = doc.id
                EstudianteForm['btn-guardar-estudi'].innerText = 'Actualizar'
            })
        })
    })

    //Mostrar matriculas
    on_get_matri((matriculas)=>{
        let html = '';
        
        matriculas.forEach(doc => {
        const matricula = doc.data()
        html += `<h4>Matricula</h4>
            <div class ="crud-header">
                <h5>ID Matricula : ${matricula.id_matricula}</h5>
                <p>ID Clase: ${matricula.id_clase}</p>
                <p>ID Estudiante: ${matricula.id_estudiante}</p>
                <div>
                    <button class="button is-danger" data-id="${doc.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="button is-warning" data-id="${doc.id}" >
                        <i class="fas fa-pencil"></i>
                    </button>
                </div>
            </div>
        `
    })

    MatriculasContainer.innerHTML = html
    const btnsDeleteMatricula = MatriculasContainer.querySelectorAll('.button.is-danger')

        //Borrar matriculas
        btnsDeleteMatricula.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset }}) => {
                deleteMatri(dataset.id)
            })
        })

        const btnEditMatricula = MatriculasContainer.querySelectorAll('.button.is-warning')

        // Editar matricula
        btnEditMatricula.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getMatri(e.target.dataset.id)
                const matricula = doc.data()

                MatriculaForm['id-matricula'].value = matricula.id_matricula
                MatriculaForm['id-estudiante-Matri'].value = matricula.id_estudiante_Matri
                MatriculaForm['id-clase-Matr'].value = matricula.id_clase_Matri

                editStatusMatri = true
                idMatri = doc.id
                MatriculaForm['btn-guardar-matri'].innerText = 'Actualizar'
            })
        })
    })

    //Mostrar clases
    on_get_class((clases)=>{
        let html = '';
        
        clases.forEach(doc => {
        const clase = doc.data()
        html += `<h4>Clase</h4>
            <div class ="crud-header">
                <h5>ID Clase : ${clase.id_clase}</h5>
                <p>Titulo: ${clase.titulo}</p>
                <p>Descripción: ${clase.descripcion}</p>
                <div>
                    <button class="button is-danger" data-id="${doc.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="button is-warning" data-id="${doc.id}" >
                        <i class="fas fa-pencil"></i>
                    </button>
                </div>
            </div>
        `
    })
    ClasesContainer.innerHTML = html
    const btnsDeleteClase = ClasesContainer.querySelectorAll('.button.is-danger')

        //Borrar clase
        btnsDeleteClase.forEach(btn => {
            btn.addEventListener('click', ({target: { dataset }}) => {
                deleteClass(dataset.id)
            })
        })

        const btnEditClase = ClasesContainer.querySelectorAll('.button.is-warning')

        // Editar clase
        btnEditClase.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getClass(e.target.dataset.id)
                const clase = doc.data()

                ClaseForm['id-clase'].value = clase.id_clase
                ClaseForm['titulo-clase'].value = clase.titulo
                ClaseForm['clase-description'].value = clase.descripcion

                editStatusClass = true
                idClass = doc.id
                ClaseForm['btn-guardar-class'].innerText = 'Actualizar'
            })
        })
    })
})

//GUARDAR ESTUDIANTE
EstudianteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const id_estudiante = EstudianteForm['id-estudiante']
    const apellidos_estudiante = EstudianteForm['apellido-estudiante']
    const nombre_estudiante = EstudianteForm['nombre-estudiante']

    if (!editStatusEstudi) {
        saveEstu(parseInt(id_estudiante.value), apellidos_estudiante.value, nombre_estudiante.value)
    } else {
        updateEstu(idEstudi, {id : parseInt(id_estudiante.value), apellidos_estudiante : apellidos_estudiante.value,
                                        nombre_estudiante: nombre_estudiante.value})
        editStatusEstudi = false
        EstudianteForm['btn-guardar-estudi'].innerText = 'Guardar Estudiante'
    }

    EstudianteForm.reset()
})

//GUARDAR MATRICULA
MatriculaForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const id_matricula = MatriculaForm['id-matricula']
    const id_estudiante_Matri = MatriculaForm['id-estudiante-Matri']
    const id_clase_Matri = MatriculaForm['id-clase-Matri']

    if (!editStatusMatri) {
        saveMatri(parseInt(id_matricula.value), parseInt(id_estudiante_Matri.value), id_clase_Matri.value)
    } else {
        updateMatri(idMatri, {id_matricula : parseInt(id_matricula.value), id_estudiante_Matri : parseInt(id_estudiante_Matri.value),
                                        id_clase_Matri: id_clase_Matri.value})
        editStatusMatri = false
        MatriculaForm['btn-guardar-matricula'].innerText = 'Guardar Matricula'
    }

    MatriculaForm.reset()
})

//GUARDAR CLASE
ClaseForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const id_clase = ClaseForm['id-clase']
    const titulo = ClaseForm['titulo-clase']
    const descripcion = ClaseForm['clase-description']

    
    if (!editStatusClass) {
        saveClass(id_clase.value, titulo.value, descripcion.value)
    } else {
        updateClass(idClass, {id_clase : id_clase.value, descripcion : descripcion.value,
                                        titulo: titulo.value})
            editStatusClass = false
            ClaseForm['btn-guardar-class'].innerText = 'Guardar Clase'
    }

    ClaseForm.reset()
})