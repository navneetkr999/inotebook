import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/notecontext';

const NoteItem = ({ note, editNote, showAlert }) => {
    const { _id, title, description, tag, date } = note;
    const fullText = description;
    const maxLength = 100;
    const notesContext = useContext(NoteContext);
    const { deleteNote } = notesContext;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleShowMoreLess = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h2 className="card-title">{title}</h2>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {editNote(note)}}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(_id); showAlert("Note deleted successfully!!", "success");}}></i>
                    </div>
                    <h5 className="card-tags">Tags: {tag}</h5>
                    <p className="card-text">
                        {
                            isExpanded ? fullText : fullText.substring(0, maxLength) + '...'
                        }
                        <a href="#" onClick={toggleShowMoreLess} style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </a>
                    </p>
                    <p className="card-date">{date}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
