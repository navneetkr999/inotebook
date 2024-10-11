import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/notecontext';

const AddNote = ({showAlert}) => {
    const notesContext = useContext(NoteContext);
    const { addNote } = notesContext;

    const [noteValue, setNoteValue] = useState({title: '', tag: '', description:''});
    
    const handleClick = (e) => {
        e.preventDefault();
        console.log(localStorage.item);
        addNote(noteValue);
        setNoteValue({title: '', tag: '', description:''});
        showAlert("Note added successfully!!", "success");
    }
    
    const onChange = (e) => {
        setNoteValue({...noteValue, [e.target.name]: e.target.value})
    }
    
    return (
        <div>
            <h1>Add a note</h1>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="ttile" className="form-label">Title</label>
                    <input name='title' type="text" className="form-control" id="title" value={noteValue.title} placeholder="Enter your Title" onChange={onChange} minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input name='tag' type="text" className="form-control" id="tag" value={noteValue.tag} placeholder="Tags.." onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea name='description' className="form-control" id="description" value={noteValue.description} rows="10" onChange={onChange} minLength={100}></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default AddNote
