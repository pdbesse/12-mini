USE movies_db;

INSERT INTO movies (movie_name)
VALUES ('John Wick'),
        ('Harry Potter');

INSERT INTO reviews (review, movie_id)
VALUES ('great movie', 1),
        ('also a great movie', 2);
