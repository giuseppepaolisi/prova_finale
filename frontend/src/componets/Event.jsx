import React from "react";

function Event ({event}) {

    return (
        <div>
            <label>Titolo: {event.titolo}</label>
            <label>Descrizione: {event.descrizione}</label>
            <label>Capacità: {event.capacity}</label>
            <label>Categoria: {event.category}</label>
            <button>Join</button>
        </div>
    );

}

export default Event;