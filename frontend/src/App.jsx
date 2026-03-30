import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Events from './componets/Events'
import InsertEvent from './componets/InsertEvent'
import Event from './componets/Event'
import { useAuth } from './auth/useAuth'
import { createAuthenticatedFetch } from './auth/apiClient'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/';

function App() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);

  // Create authenticated fetch function
  const authenticatedFetch = createAuthenticatedFetch(() => token);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch(`${API_BASE_URL}/events`);

      if (!response.ok) {
        throw Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (e) {
      setEvents([]);
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }

  const showEvent = async (id) => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/events/${id}`);

      if (!response.ok) {
        throw Error("Failed to fetch event");
      }

      const data = await response.json();
      setEvent(data);
    } catch (e) {
      console.error("Fetch error:", e);
      setEvent(null);
    }
  }

  const addEvent = async (event) => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/events`, {
        method: "POST",
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw Error("Failed to create event");
      }

      const data = await response.json();
      loadData();
      console.log(data);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className="app-container">
      {/* Header/Navbar */}
      <header className="app-header">
        <div className="header-content">
          <h1>Events Manager</h1>
          <div className="user-section">
            {user && (
              <>
                <span className="user-info">
                  {user.name} ({user.role})
                </span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <InsertEvent onSave={addEvent} />

        {event === null ? (
          <label>Seleziona Evento</label>
        ) : (
          <Event event={event} />
        )}

        {loading ? (
          <label>Loading data...</label>
        ) : (
          <Events events={events} show={showEvent} />
        )}
      </main>
    </div>
  )
}

export default App