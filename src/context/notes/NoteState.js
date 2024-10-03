import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
    const obj = {
        "name": "Nav",
        "age": "28"
    }
    const [state, setState] = useState(obj);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "PKM",
                "age": "26"
            });
        }, 1000)
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;