const express = require('express');
const app = express();
const PORT = 8080;

// Connect to SQL
const mysql = require('mysql');
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'TransitU',
});

db.connect(err => {
	if(err) { throw err; }
	console.log("Connected to MySQL");
})

app.use(express.json());

app.listen(
	PORT,
	() => console.log(`API running on ${PORT}`)
);

// Get schedules
app.get('/classes/:id', (req, res) => {
	const { id } = req.params;
	const { data } = req.body;
	console.log(req.params);
	db.query(`SELECT * FROM user_classes WHERE user_id = ${id}`, (err, results) => {
		if(err) res.status(400).send(err);
		else res.status(200).send(results);
	});
});

// Update schedules
app.post('/classes/:id', (req, res) => {
	let data = req.body;
	const { id } = req.params;
	if(!data) res.status(400).send("You need to supply a JSON object");
	else {
		db.query(`INSERT INTO user_classes (user_id, classes) VALUES (${id}, '${JSON.stringify(data)}') ON DUPLICATE KEY UPDATE classes=VALUES(classes)`, (err, results) => {
			console.log(err);
			if(err) res.status(400).send(err);
			else res.status(200).send(results);
		});
	}
});