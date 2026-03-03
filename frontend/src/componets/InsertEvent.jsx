import React, { useState } from "react";

function InsertEvent({ onSave }) {

    const [event, setEvent] = useState({titolo : '', descrizione : '', capacity : 1, category: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prevEvent => ({
            ...prevEvent,
            [name]: value
        }));
    }

    const handleInput = (e) => {
        e.preventDefault();
        onSave(event);
        setEvent({titolo : '', descrizione : '', capacity : 1, category: ''});
    }

    return (
        <div>
            <form onSubmit={handleInput}>
                <label>Titolo</label>
                <input type="text" name="titolo" value={event.titolo} onChange={handleChange} />
                <br></br>
                
                <label>Descrizione</label>
                <br></br>
                <textarea name="descrizione" value={event.descrizione} onChange={handleChange} />
                <br></br>
                
                <label>Capacità</label>
                <input type="number" min="1" step="1" name="capacity" value={event.capacity} onChange={handleChange} />
                <br></br>
                
                <label>Categoria</label>
                <input type="text" name="category" value={event.category} onChange={handleChange} />
                <br></br>
                
                <button type="submit">Crea Evento</button>
            </form>
        </div>
    );
}

export default InsertEvent;