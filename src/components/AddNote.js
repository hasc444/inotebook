import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note,setNote] = useState({title: '', description: '', tag: 'default'})

    const handelClick=(e)=>{
        addNote(note.title, note.description, note.tag)
         props.showAlert("Note added Successfully", "success")
        e.preventDefault()
        setNote({title: '', description: '', tag: 'default'})
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>

            <form className=' my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.title} id="title" name="title" aria-describedby="emailHelp" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.description} id="description" name="description" minLength={5} required />
                </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.tag} id="tag" name="tag" />
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5} onClick={handelClick} className="btn btn-primary">Add Note</button>
            </form>


        </div>
    )
}

export default AddNote
