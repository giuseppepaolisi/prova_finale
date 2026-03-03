from psycopg2.extras import RealDictCursor
from fastapi import HTTPException

class SubscriptController:
    
    @staticmethod
    def join(user, event, conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query_insert = "INSERT INTO subscriptions (id_user, id_event) VALUES (%s, %s) RETURNING *"
                query_update_events = "UPDATE events SET subscriptions = subscriptions + 1 WHERE id_event = %s RETURNING *"
                
                cur.execute(query_insert, (user, event))
                subscript = cur.fetchone()
                print(f"*******Subscript: {subscript}")
                
                if (subscript is None):
                    # Si sta iscrivendo due volte allo stesso evento
                    raise HTTPException(status_code=400, detail="Utente già iscritto")

                cur.execute(query_update_events, (event,))
                event = cur.fetchone()
                print(f"*******Event: {event}")
                
                return subscript, event
                
        except Exception as e:
            print("Errore iscrizione", e)
            raise HTTPException(status_code=400, detail="Errore nella registrazione")