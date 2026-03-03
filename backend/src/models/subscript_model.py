from psycopg2.extras import RealDictCursor
from fastapi import HTTPException

class SubscriptModel:
    
    @staticmethod
    def join(user, event, conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                query_insert = "INSERT INTO subscriptions (id_user, id_event) VALUES (%s, %s) RETURNING *"
                
                cur.execute(query_insert, (user, event))
                subscript = cur.fetchone()
                print(f"*******Subscript: {subscript}")
                
                # Gestione degli errori di iscrizione
                if subscript is None:
                    raise HTTPException(status_code=404, detail="Non è possibile iscriversi all'evento")
                
                return subscript
                
        except Exception as e:
            print("Errore iscrizione", e)
            raise HTTPException(status_code=400, detail="Errore nella registrazione")