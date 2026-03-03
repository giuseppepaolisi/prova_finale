from psycopg2.extras import RealDictCursor
from fastapi import HTTPException

class UsersController:
    
    @staticmethod
    def login(user, conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                sql = "SELECT * FROM users WHERE email = %s"
                
                cur.execute(sql, (user.email,))
                
                log_user = cur.fetchone()
                if log_user is None:
                    raise HTTPException(status_code=404, detail="Utente Non trovao")
                return log_user
        except Exception as e:
            print("Login Fallito", e)
            raise e
        
    @staticmethod
    def signup(user, conn):
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                sql = "INSERT INTO users (name, email, role) VALUES (%s, %s, %s) RETURNING *"
                
                cur.execute(sql, (user.name, user.email, user.role))
                
                log_user = cur.fetchone()
                if log_user is None:
                    return HTTPException(status_code=404, detail="Non è possibile registrare l'utente")
                return log_user
        except Exception as e:
            print("Signup Fallito", e)
            raise e
