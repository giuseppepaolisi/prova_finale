from fastapi import routing, Depends, status
from core.database import db
from controllers.subscript_controller import SubscriptController
from pydantic import BaseModel

class SubscriptBase(BaseModel):
    id_user: int
    id_event: int
    
router = routing.APIRouter(prefix="/join")

@router.post("/", status_code=status.HTTP_201_CREATED)
def join(subscript: SubscriptBase, conn = Depends(db.get_conn)):
    subscript = SubscriptController.join(user=subscript.id_user, event=subscript.id_event, conn=conn)
    return subscript

