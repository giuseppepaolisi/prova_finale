import re

from fastapi import HTTPException

from models.users_model import UsersModel

class UsersController:
    
    @staticmethod
    def login(user, conn):
        try:
            # Controllo su user
            if user.email is None or user.email.strip() == "":
                raise HTTPException(status_code=400, detail="Email è obbligatoria")
            # Controllo regex email
            if not re.match(r"[^@]+@[^@]+\.[^@]+", user.email):
                raise HTTPException(status_code=400, detail="Email non valida")
            
            return UsersModel.check_user(user, conn)
            
        except Exception as e:
            print("Login Fallito", e)
            raise e
        
    @staticmethod
    def signup(user, conn):
        try:
            # Controllo su user
            if user.name is None or user.name.strip() == "":
                raise HTTPException(status_code=400, detail="Name è obbligatorio")
            if user.email is None or user.email.strip() == "":
                raise HTTPException(status_code=400, detail="Email è obbligatoria")
            if user.role is None or user.role.strip() == "":
                raise HTTPException(status_code=400, detail="Role è obbligatorio")
            # Controllo regex email
            if not re.match(r"[^@]+@[^@]+\.[^@]+", user.email):
                raise HTTPException(status_code=400, detail="Email non valida")
            
            return UsersModel.create_user(user, conn)
        except Exception as e:
            print("Signup Fallito", e)
            raise e
