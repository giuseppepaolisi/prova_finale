CREATE TABLE IF NOT EXISTS events (
    id_event SERIAL PRIMARY KEY,
    titolo VARCHAR(20) NOT NULL,
    descrizione VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    capacity INTEGER CHECK(capacity >= 0) NOT NULL DEFAULT 0,
    subscriptions INTEGER CHECK(subscriptions >= 0 AND subscriptions <= capacity) NOT NULL DEFAULT 0,
    category VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id_user INTEGER REFERENCES users(id_user),
    id_event INTEGER REFERENCES events(id_event),
    date_subscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_user, id_event) 
);

INSERT INTO events (titolo, descrizione, capacity, category) VALUES ('Workshop di coding', 'descrizione', 2, 'backend');
INSERT INTO users (name, email, role) VALUES ('giuseppe', 'giuseppe@gmail.com', 'student'), ('admin', 'admin@gmail.com', 'admin');
