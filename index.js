// #1 - Connect your express application to a mysql server
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

// #2 - CREATE DATABASE sysdev_recruitment;

/* #3

    CREATE TABLE programming_languages(
        id INT NOT NULL AUTOINCREMENT,
        favorites VARCHAR(255),
        PRIMARY KEY (id)
    );

*/

// #4 - Insert the value of the ‘favorite’ query parameter to the table.
const express = require('express')
const app = express()
const PORT = 3000

// Accepts json - if .get is replaced with .post below
app.use(express.json()) 

//When you enter the URL showed above (http://localhost:3000), insert the data
app.get('/', (req, res) => {
    const favorite = req.body?.favorite ?? 'Javascript';

    if (typeof favorite !== 'string') {
        return res.status(400).json({'error': 'Input must be a string'})
    }

    const q = `INSERT INTO programming_languages SET favorites = ?`
    connection.query(q, [favorite], (err) => {
        if (err) {
            console.error(err)
        }
        else {
            return res.status(201).json({'message': 'Data inserted successfully'})
        }
    })
})


app.listen(PORT, () => console.log(`Listening to port ${PORT}`))

