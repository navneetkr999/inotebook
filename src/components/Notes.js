import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/notecontext';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = ({showAlert}) => {
    const notesContext = useContext(NoteContext);
    const { notes, getAllNotes, updateNote } = notesContext;

    const [noteValue, setNoteValue] = useState({id:'', etitle: '', etag: '', edescription:''});
    let navigate = useNavigate();
    
    useEffect(() => {
        localStorage.getItem('token') ? getAllNotes() : navigate('/login') ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const editNote = (currentNote) => {
        refOpen.current.click();
        setNoteValue({id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description});
    }

    const refOpen = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        updateNote(noteValue);
        refClose.current.click();
        showAlert("Note updated successfully!!", "success");
    }
    
    const onChange = (e) => {
        setNoteValue({...noteValue, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <AddNote showAlert={showAlert} />
            <button type="button" ref={refOpen} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNoteModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editNoteModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="ttile" className="form-label">Title</label>
                                    <input name='etitle' type="text" className="form-control" id="etitle" value={noteValue.etitle} placeholder="Enter your Title" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tags</label>
                                    <input name='etag' type="text" className="form-control" id="etag" value={noteValue.etag} placeholder="Tags.." onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name='edescription' className="form-control" id="edescription" value={noteValue.edescription} rows="10" onChange={onChange} ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {
                    notes.length > 0 ? notes.map((note) =>
                        <NoteItem key={note._id} editNote={editNote} showAlert={showAlert} note={note} />
                    )
                    :
                    <h3>Please add a note.</h3>
                }
            </div>
        </div>
    )
}

export default Notes;
