from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
from models.subscript_model import SubscriptModel

class SubscriptController:
    
    @staticmethod
    def join(user, event, conn):
        try:
            # Controllo su user e event
            if user is None or user <= 0:
                raise HTTPException(status_code=400, detail="user è obbligatorio e deve essere un numero positivo")
            if event is None or event <= 0:
                raise HTTPException(status_code=400, detail="event è obbligatorio e deve essere un numero positivo")
            
            subscript = SubscriptModel.join(user, event, conn)

            return subscript
                
        except Exception as e:
            print("Errore iscrizione", e)
            raise e