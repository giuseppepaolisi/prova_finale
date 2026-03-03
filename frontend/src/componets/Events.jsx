import React from "react";

function Events ({events, show}) {

    /*onClick={show(ev.id_event)}*/
    return (
        <div>
            <h2>Eventi</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            Titolo
                        </th>
                        <th>
                            Data
                        </th>
                        <th>
                            Capacità
                        </th>
                        <th>
                            Iscritti
                        </th>
                    </tr>
                </thead>
                <tbody>
                                {
                    events.map(ev => (
                        <tr key={ev.id_event} onClick={() => show(ev.id_event)}>
                            <td>{ev.titolo}</td>
                            <td>{ev.date}</td>
                            <td>{ev.capacity}</td>
                            <td>{ev.subscriptions}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Events;