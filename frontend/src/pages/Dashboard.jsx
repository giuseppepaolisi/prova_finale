import { useState, useEffect } from 'react'
import Events from '../componets/Events'
import InsertEvent from '../componets/InsertEvent'
import Event from '../componets/Event'
// serve per prendere il payload del token
import { useAuth } from '../auth/useAuth'

function Dashboard() {
  const { user, logout } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);

  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/events");

      if(!response.ok) {
        throw Error("Errore get events");
      }

      const data = await response.json();
      setError(null);
      setEvents(data);
    }
    catch (e) {
      setEvents([]);
      setError("Errore caricamento eventi");
      console.error("Errore fetch", e);
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
      setError(null);
      setEvent(data);
    }
    catch (e) {
      console.error("Errore fetch ", e);
      setError("Errore caricamento evento");
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
      setError(null);
      console.log(data);
    }
    catch (e) {
      console.error("Errore fetch", e);
      setError("Errore creazione evento");
    }
  }
  const handleJoin = async (event) => {
    if (!user) {
      console.error("No authenticated user");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/join`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          id_user: parseInt(user.id_user),
          id_event: parseInt(event.id_event)
        })
      });
      if (!response.ok) {
        throw Error("Errore join evento");
      }
      const data = await response.json();
      setError(null);
      loadData();
      console.log(data);

    } catch (e) {
      console.error("Errore fetch", e);
      setError("Errore join evento");
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Event Manager</a>
          <div className="navbar-nav ms-auto">
            {user ? (
              <>
                <span className="navbar-text me-3">Benvenuto, {user.name}</span>
                <button className="btn btn-outline-light" onClick={logout}>Logout</button>
              </>
            ) : (
              <a className="nav-link" href="/login">Login</a>
            )}
          </div>
        </div>
      </nav>
      {
        // Se l'utente è admin mostro il form per inserire un evento
        user && user.role === "admin" && <InsertEvent onSave={addEvent}/>
      }
       { event === null ?
        <label>Seleziona Evento</label>
        :
        <Event event={event} join={handleJoin}/>
        }

      {
        loading ?
        <label>Loading data...</label>
        :
        <Events events={events} show={showEvent}/>
      }

      {
        error && <div className="alert alert-danger mt-3">{error}</div>
      }
    </div>
  )
}

export default Dashboard