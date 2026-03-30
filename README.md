# Prova Finale

Questo repository contiene un semplice progetto full‑stack realizzato con FastAPI (backend) e React + Vite (frontend). L'obiettivo è gestire eventi con autenticazione JWT e autorizzazione minimale.

## Struttura del progetto

```
prova_finale/
├── backend/                # API Python
│   ├── Dockerfile
│   ├── requirements.txt
│   └── src/
│       ├── api/            # rotte FastAPI
│       │   ├── events_routes.py
│       │   ├── users_routes.py
│       │   └── subscript_routes.py
│       ├── controllers/    # logica applicativa
│       ├── core/           # database, token, configurazione
│       └── models/         # accesso dati PostgreSQL
└── frontend/               # applicazione React
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── auth/           # gestione autenticazione JWT
        ├── componets/      # componenti React riutilizzabili
        ├── pages/          # pagine (Dashboard, ecc.)
        ├── styles/         # CSS globali/componenti
        └── AppRoutes.jsx   # definizione delle rotte
```

## Funzionalità principali

- **Autenticazione**: login via email, JWT rilasciato dal backend.
- **Gestione eventi**: visualizzazione di tutti gli eventi, dettaglio evento, inserimento eventi (solo admin).
- **Iscrizione agli eventi**: endpoint `/join` per aggiungere una iscrizione.
- **Protezione delle pagine**: rotte frontend protette tramite `ProtectedRoute` e contesto di autenticazione.
- **Sessione persistente**: token memorizzato in localStorage.

## Requisiti

- Python 3.8 +
- Vite React
- PostgreSQL


## Avvio del frontend

```bash
cd frontend
npm install
npm run dev
```

## Uso

1. Accedere a `http://localhost:5173/login`.
2. Inserire un indirizzo email registrato nel database (`signup` se necessario).
3. Dopo il login si viene reindirizzati a `/events`.
4. Gli utenti con ruolo `admin` possono inserire nuovi eventi.
5. Cliccando su un evento, si apre il dettaglio e si può "Join".

## Note di sviluppo

- Le rotte sono definite in `backend/src/api`.
- Il token JWT contiene `email`, `role`, `name` e `id_user`.
- Per aggiungere nuovi endpoint protetti, usare il middleware `verify_token` o passare il token nell'header.
- Il progetto non include refresh token o hashing password: è una demo.

## Disclaimer

Questo codice è fornito a scopo didattico. Non deve essere usato in produzione senza adeguate modifiche di sicurezza (hash delle password, HTTPS, gestione degli errori, ecc.).
