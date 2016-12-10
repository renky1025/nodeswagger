const Movie = require('./models/movie');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Movie:
 *     properties:
 *       title:
 *         type: string
 *       releaseYear:
 *         type: string
 *       director:
 *         type: string
 *       genre:
 *         type: string
 */

router.route('/movies')
/**
 * @swagger
 * /movies:
 *   get:
 *     tags:
 *       - Movies
 *     description: Returns all movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of movies
 *         schema:
 *           $ref: '#/definitions/Movie'
 */
  .get(function(req, res) {
    Movie.find(function(err, movies) {
      if (err) {
        return res.send(err);
      }

      res.json(movies);
    });
  })
/**
 * @swagger
 * /movies:
 *   post:
 *     tags:
 *       - Movies
 *     description: create a new movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: movie
 *         description: Movie object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
  .post(function(req, res) {
    var movie = new Movie(req.body);
    movie.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Movie Added' });
    });
  });

router.route('/movies/:id')
/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     tags:
 *       - Movies
 *     description: Returns a single Movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Movie's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Movie
 *         schema:
 *           $ref: '#/definitions/Movie'
 */
.get(function(req, res) {
  Movie.findOne({ _id: req.params.id}, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json(movie);
  });
})
/**
 * @swagger
 * /bears/{id}:
 *   put:
 *     tags:
 *       - Movies
 *     description: update a new Movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: bear's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: movie
 *         description: Movie object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
.put(function(req,res){
  Movie.findOne({ _id: req.params.id }, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      movie[prop] = req.body[prop];
    }

    // save the movie
    movie.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Movie updated!' });
    });
  });
})
/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     tags:
 *       - Movies
 *     description: Deletes a single Movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Movie's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
.delete(function(req, res) {
  Movie.remove({
    _id: req.params.id
  }, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});



  module.exports = router;