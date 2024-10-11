import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
    const host = "http://localhost:4000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // fetch all notes via GET call
    const getAllNotes = async () => {
        try {
            // API call to fetch all notes
            const url = `${host}/api/notes/fetchallnotes/`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    }

    // Add a note via POST call
    const addNote = async ({title, tag, description}) => {
        try {
            // API call to add a note
            const url = `${host}/api/notes/addnote`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({title, tag, description})
            });
            const json = await response.json();
            console.log(json);
            
            if (json.success) {
                setNotes(notes.concat(json.savedNote));
            } else {
                alert(json.error);
            }
        } catch (error) {
            console.error("Failed to add notes:", error);
        }
    }
    
    // update a note via PUT call
    const updateNote = async (note) => {
        try{
            // API call to update notes
            const url = `${host}/api/notes/updatenote/${note.id}`
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({"title": note.etitle, "tag": note.etag, "description": note.edescription})
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error("Failed to update notes:", error);
        }

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === note.id) {
                newNotes[index].title = note.etitle;
                newNotes[index].tag = note.etag;
                newNotes[index].description = note.edescription;
                break;
            }
        }
        setNotes(newNotes);
    }

    // delete a note via DELETE call
    const deleteNote = async (id) => {
        try{
            // API call to delete notes
            const url = `${host}/api/notes/deletenote/${id}`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }

        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, getAllNotes, addNote, updateNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;