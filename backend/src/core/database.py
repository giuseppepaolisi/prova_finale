from psycopg2 import pool
from dotenv import load_dotenv
import os

load_dotenv()


class DBManager:
    def __init__(self):
        self._pool = None
        self.create_connection_pool()
        
    def create_connection_pool(self):
        try:
            if self._pool is None:
                self._pool = pool.SimpleConnectionPool(
                    1,
                    10,
                    host=os.getenv("DB_HOST"),
                    port=os.getenv("DB_PORT", 5432),
                    user=os.getenv("DB_USER"),
                    password=os.getenv("DB_PASSWORD"),
                    dbname=os.getenv("DB_NAME")
                )
        except Exception as e:
            print("Errore connessione pool", e)
            raise e
        
    def get_conn(self):
        conn = self._pool.getconn()
        
        try:
            yield conn
            
            conn.commit()
            
        except Exception as e:
            print("Errore connessione", e)
            conn.rollback()
            raise e
            
        finally:
            self._pool.putconn(conn)
            
db = DBManager()