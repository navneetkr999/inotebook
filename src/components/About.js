import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/notecontext'

const About = () => {
    const a = useContext(NoteContext);
    useEffect(() => {
        a.update();
    }, []);
    return (
        <div>
            This is About {a.state.name} and he is {a.state.age} years old
        </div>
    )
}

export default About
