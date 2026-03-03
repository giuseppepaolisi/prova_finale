from psycopg2.extras import RealDictCursor
from psycopg2 import errors as psycopg2_errors
from fastapi import HTTPException

class SubscriptModel:
    
    @staticmethod
    def join(user, event, conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # BLOCCO della riga dell'evento prima di fare qualsiasi altra cosa
                # Se un'altra transazione sta già lavorando su questo evento, 
                # il codice si fermerà qui finché l'altra non ha finito.
                query_lock = "SELECT id_event FROM events WHERE id_event = %s FOR UPDATE"
                cur.execute(query_lock, (event,))
                query_insert = "INSERT INTO subscriptions (id_user, id_event) VALUES (%s, %s) RETURNING *"
                
                cur.execute(query_insert, (user, event))
                subscript = cur.fetchone()
                print(f"*******Subscript: {subscript}")
                
                # Gestione degli errori di iscrizione
                if subscript is None:
                    raise HTTPException(status_code=404, detail="Non è possibile iscriversi all'evento")
                
                query_update_events = "UPDATE events SET subscriptions = subscriptions + 1 WHERE id_event = %s RETURNING *"
                cur.execute(query_update_events, (event,))
                event_data = cur.fetchone()
            
                return subscript
                
        except psycopg2_errors.UniqueViolation:
            raise HTTPException(status_code=409, detail="Sei già iscritto a questo evento")
        except Exception as e:
            print("Errore iscrizione", e)
            raise HTTPException(status_code=500, detail="Errore durante l'iscrizione")
