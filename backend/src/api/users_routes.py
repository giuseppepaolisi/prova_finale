from fastapi import routing, Depends, status
from core.database import db
from controllers.users_controller import UsersController
from pydantic import BaseModel
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from core.token_utility import create_access_token

# Definiamo dove FastAPI deve cercare il token (nell'header Authorization)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class UserBase(BaseModel):
    email: str
    
class User(UserBase):
    name: str
    role: str

router = routing.APIRouter()

@router.post("/login", status_code=200)
def login(email: UserBase, conn = Depends(db.get_conn)):
    user = UsersController.login(email, conn)
    if user is not None:
        # Creazione del payload per il token
        payload = {
            "email": user.get("email"),
            "role": user.get("role"),
            "name": user.get("name"),
        }
        access_token = create_access_token(data=payload)
        return {"access_token": access_token, "token_type": "bearer", "user": payload}
    return {}

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: User, conn = Depends(db.get_conn)):
    return UsersController.signup(user, conn)
