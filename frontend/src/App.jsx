import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Events from './componets/Events'
import InsertEvent from './componets/InsertEvent'
import Event from './componets/Event'

function App() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/events");

      if(!response.ok) {
        throw Error("Errore get events");
      }

      const data = await response.json();
      setEvents(data);
    }
    catch (e) {
      setEvents([]);
      console.error("Errore fetch");
    } finally {
      setLoading(false);
    }
  }

  const showEvent = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8000/events/${id}`);

      if(!response.ok) {
        throw Error("Errore get events");
      }

      const data = await response.json();
      console.log(`*****${data}`);
      setEvent(data);
    }
    catch (e) {
      console.error("Errore fetch ", e);
      setEvent(null);
    }
  }

  const addEvent = async (event) => {
    try {
      const response = await fetch(`http://localhost:8000/events`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(event)
      });

      if(!response.ok) {
        throw Error("Errore get events");
      }

      const data = await response.json();

      // aggiuornamento pessimistico
      loadData();
      // aggionamento ottimistico
      // 
      console.log(data);
    }
    catch (e) {
      console.error("Errore fetch", e);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      
      <InsertEvent onSave={addEvent}/>
       { event === null ?
        <label>Seleziona Evento</label>
        :
        <Event event={event}/>
        }

      {
        loading ?
        <label>Loading data...</label>
        :
        <Events events={events} show={showEvent}/>
      }
    </div>
  )
}

export default App