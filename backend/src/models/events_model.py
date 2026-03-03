from psycopg2.extras import RealDictCursor
from fastapi import HTTPException

class EventsModel:
    @staticmethod
    def get_events(conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                sql = "SELECT * FROM events"
                cur.execute(sql)
                
                return cur.fetchall()
            
        except Exception as e:
            print("Errore get_events ", e)
            raise e
    
    @staticmethod
    def get_event(id_event, conn):
        try:
            # Fare controllo su id_event
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                sql = "SELECT * FROM events WHERE id_event = %s"
                cur.execute(sql, (id_event,))
                event = cur.fetchone()
                if event in None:
                    raise HTTPException(status_code=404, detail="Evento non trovato")
                return event
            
        except Exception as e:
            print("Errore get_events ", e)
            raise e
        
    @staticmethod
    def create_event(event, conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                sql = "INSERT INTO events (titolo, descrizione, capacity, category) VALUES (%s, %s, %s, %s) RETURNING *"
                cur.execute(sql, (event.titolo, event.descrizione, event.capacity, event.category))
                
                new_ev = cur.fetchone()
                if new_ev is None:
                    raise HTTPException(status_code=404, detail="Non è possbile creare l'evento")
                return new_ev
            
        except Exception as e:
            print("Errore get_events ", e)
            raise e
        
    def increment_subscriptions(id_event, conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                sql = "UPDATE events SET subscriptions = subscriptions + 1 WHERE id_event = %s RETURNING *"
                cur.execute(sql, (id_event,))
                
                event = cur.fetchone()
                if event is None:
                    raise HTTPException(status_code=404, detail="Evento non trovato")
                return event
            
        except Exception as e:
            print("Errore increment_subscriptions ", e)
            raise HTTPException(status_code=500, detail="Errore durante l'incremento delle iscrizioni")