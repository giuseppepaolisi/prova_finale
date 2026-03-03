from fastapi import routing, Depends, status
from core.database import db
from controllers.events_controller import EventsController
from pydantic import BaseModel

class EventBase(BaseModel):
    titolo: str
    descrizione: str
    capacity: int
    category: str
    
router = routing.APIRouter(prefix="/events")

@router.get("/", status_code=200)
def get_products(conn = Depends(db.get_conn)):
    return EventsController.get_events(conn)

@router.get("/{id}", status_code=200)
def get_products(id, conn = Depends(db.get_conn)):
    return EventsController.get_event(id, conn)

@router.post("/", status_code=status.HTTP_201_CREATED)
def insert_events(event: EventBase, conn= Depends(db.get_conn)):
    new_event = EventsController.create_event(event, conn)
    return new_event