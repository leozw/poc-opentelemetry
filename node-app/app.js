require('./instrumentations');

const express = require("express");
const { Pool } = require('pg');
const path = require('path');
const opentelemetry = require("@opentelemetry/api");

const PORT = parseInt(process.env.PORT || "8080");
const app = express();

const pool = new Pool({
  user: 'postgres',
  password: 'senhafacil',
  host: 'db',
  database: 'postgres',
  port: 5432,
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.use(express.static(path.join(__dirname, 'my-app/build')));

app.get("/rolldice", async (req, res) => {
  const tracer = opentelemetry.trace.getTracer("servico-node");

  try {
    const span = tracer.startSpan("rolldice-rota");
    span.setAttribute("service.name", "Buteco's - Random Numbers");

    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello, world!']);
    const message = result.rows[0].message;
    client.release();
    res.send(`Random Number: ${getRandomNumber(1, 6)}, Message: ${message}`);

    span.end();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/health", (req, res) => {
  res.status(200).send("Service is healthy");
});

app.get("/db", async (req, res) => {
  const tracer = opentelemetry.trace.getTracer("servico-node");

  try {
    const span = tracer.startSpan("db-rota");
    span.setAttribute("service.name", "Buteco's - Data Base");

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM buteco_table');
    client.release();
    res.json(result.rows);

    span.end();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/src', 'index.js'));
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});