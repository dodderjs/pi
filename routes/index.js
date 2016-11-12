var express = require('express');
var router = express.Router();
var configs = require('../configs');
var db = require('../lib/db');

router.post('/temperature', function (req, res, next) {
	if (req.body.api_key !== configs.api_key) {
		return res.status(500).send('Something broke!');
	}

	db.getConnection()
		.then(function (connection) {
			if (!req.body.temp || !req.body.pres) {
				throw new Error('no params');
			}
			return connection.query('INSERT INTO temperature SET ?', { temp: req.body.temp, pres: req.body.pres });
		})
		.then(function (list) {
			res.status(200).send('New temperature data inserted');
		})
		.catch(function (err) {
			console.log(err);
			return res.status(500).send('Something broke!');
		});
});

router.get('/temperature', function (req, res, next) {
	db.getConnection()
		.then(function (connection) {
			return connection.query('SELECT temp, pres, created_at FROM temperature ORDER BY created_at DESC LIMIT 20');
		})
		.then(function (list) {
			res.json(list);
		})
		.catch(function (err) {
			return res.status(500).send('Something broke!')
		});
});

/* GET home page. */
router.get('/*', function (req, res, next) {
  res.render('index', { title: 'Dodder.hu' });
});

module.exports = router;
