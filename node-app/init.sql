CREATE TABLE buteco_table (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO buteco_table (id, nome, email) VALUES
(1, 'buteco', 'buteco@buteco'),
(2, 'leo', 'leo@leoo');
