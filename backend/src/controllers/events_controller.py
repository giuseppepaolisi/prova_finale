from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
from models.events_model import EventsModel

class EventsController:
    
    @staticmethod
    def get_events(conn):
        return EventsModel.get_events(conn)
        
    @staticmethod
    def get_event(id_event, conn):
        try:
            # Controllo su id_event
            if id_event is None or int(id_event) <= 0:
                raise HTTPException(status_code=400, detail="id_event deve essere un numero positivo")
            
            return EventsModel.get_event(id_event, conn)
            
        except Exception as e:
            print("Errore get_events ", e)
            raise e
        
    @staticmethod
    def create_event(event, conn):
        try:
            # Fare controllo su event
            if not event.titolo or not event.descrizione or not event.capacity or not event.category:
                raise HTTPException(status_code=400, detail="Tutti i campi sono obbligatori")
            return EventsModel.create_event(event, conn)
            
        except Exception as e:
            print("Errore create_event ", e)
            raise e