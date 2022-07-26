const express = require('express');
const mysql2 = require('mysql2');

const connection = mysql2.createConnection(

    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'movies_db'
    },
    console.log(`Connected to the Movies database.`)
);

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/movies', (req, res) => {
    connection.query(`SELECT movies.movie_name, reviews.review FROM movies INNER JOIN reviews ON movies.id=reviews.movie_id`, (err, movies) => {
        if (err) {
            console.error(err);
        }
        // console.log(movies);
        res.json(movies);
    })
})

app.post('/api/add-movie', (req, res) => {
    const {movie_name} = req.body;
    connection.query(`INSERT INTO movies (movie_name) VALUES ('${movie_name}')`, (err, status) => {
        if (err) {
            console.error(err);
            res.send(err)
        } else {
        console.log(status)
        res.send(status);
        }
    })
})

app.put('/api/update-review', (req, res) => {
    const {review} = req.body;
    console.log(review);
    connection.query(`UPDATE reviews SET review = '${review}' WHERE reviews.movie_id = 1`, (err, status) => {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            res.send(status);
        }
    })
})

app.delete('/api/movie/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    connection.query(`DELETE FROM movies WHERE id = ${id}`, (err, status) => {
        if (err) {
            console.error(err);
            res.send(err);
        } else {
            res.send(status);
        }
    })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));