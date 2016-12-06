const express = require('express');
const app = express();
const router = express.Router();              // get an instance of the express Router
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Iganiq8o');
const Bear = require('./models/bear');

// middleware to use for all requests
router.use((req, res, next) => {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
/**
 * @swagger
 * definition:
 *   Bear:
 *     properties:
 *       name:
 *         type: string
 *		 _id:
 *			type: string
 */

router.route('/bears')
/**
 * @swagger
 * /bears:
 *   post:
 *     tags:
 *       - Bears
 *     description: create a new Bear
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bear
 *         description: Bear object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Bear'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
.post((req, res) => {
    const bear = new Bear();      // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save((err) => {
        if (err)
            res.send(err);

        res.json({ message: 'Bear created!' });
    });
    
})
/**
 * @swagger
 * /bears:
 *   get:
 *     tags:
 *       - Bears
 *     description: Returns all Bears
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Bears
 *         schema:
 *           $ref: '#/definitions/Bear'
 */
.get((req, res) =>{
    Bear.find((err, bears) => {
        if (err)
            res.send(err);

        res.json(bears);
    });
});

router.route('/bears/:bear_id')
/**
 * @swagger
 * /bears/{bear_id}:
 *   get:
 *     tags:
 *       - Bears
 *     description: Returns a single bear
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bear_id
 *         description: bear's bear_id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single bear
 *         schema:
 *           $ref: '#/definitions/Bear'
 */
.get((req, res) =>{
    Bear.findById(req.params.bear_id, (err, bear)=> {
        if (err)
            res.send(err);
        res.json(bear);
    });
})
/**
 * @swagger
 * /bears/{bear_id}:
 *   put:
 *     tags:
 *       - Bears
 *     description: update a Bear
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bear_id
 *         description: bear's bear_id
 *         in: path
 *         required: true
 *         type: string
 *       - name: bear
 *         description: Bear object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Bear'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
.put((req, res) =>{

    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, (err, bear) => {

        if (err)
            res.send(err);

        bear.name = req.body.name;  // update the bears info

        // save the bear
        bear.save((err) => {
            if (err)
                res.send(err);

            res.json({ message: 'Bear updated!' });
        });

    });
})
/**
 * @swagger
 * /bears/{id}:
 *   delete:
 *     tags:
 *       - Bears
 *     description: Deletes a single bear
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Bear's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
.delete((req, res)=> {
    Bear.remove({
        _id: req.params.bear_id
    }, (err, bear) =>{
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;