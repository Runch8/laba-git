const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const app = express();

// ===== MIDDLEWARE =====

app.use(cors());

app.use(express.json());

// ===== DATABASE =====

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "sport_club"

});

// ===== CONNECT =====

db.connect((err) => {

    if (err) {

        console.log(err);

    } else {

        console.log(
            "MySQL Connected ✅"
        );

    }

});

// ===== LOGIN =====

app.post("/login", (req, res) => {

    const {
        email,
        password
    } = req.body;

    // ADMIN
    if (

        email === "admin@test.com"
        &&
        password === "1234"

    ) {

        return res.json({

            email,

            role: "ADMIN"

        });

    }

    // TRAINER
    if (

        email === "trainer@test.com"
        &&
        password === "1234"

    ) {

        return res.json({

            email,

            role: "TRAINER"

        });

    }

    // USER
    if (

        email === "user@test.com"
        &&
        password === "1234"

    ) {

        return res.json({

            email,

            role: "USER"

        });

    }

    // ERROR
    res.json({
        error: true
    });

});

// ======================================================
// TRAINERS
// ======================================================

// GET TRAINERS

app.get("/trainers", (req, res) => {

    db.query(

        "SELECT * FROM trainers",

        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json(result);

            }

        }

    );

});

// ADD TRAINER

app.post("/trainers", (req, res) => {

    const {
        name,
        specialization
    } = req.body;

    db.query(

        `
    INSERT INTO trainers
    (name, specialization)
    VALUES (?, ?)
    `,

        [
            name,
            specialization
        ],

        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({

                    id: result.insertId,

                    name,

                    specialization

                });

            }

        }

    );

});

// UPDATE TRAINER

app.put("/trainers/:id", (req, res) => {

    const {
        name,
        specialization
    } = req.body;

    db.query(

        `
    UPDATE trainers
    SET
      name=?,
      specialization=?
    WHERE id=?
    `,

        [

            name,
            specialization,

            req.params.id

        ],

        (err) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({
                    success: true
                });

            }

        }

    );

});

// DELETE TRAINER

app.delete("/trainers/:id", (req, res) => {

    db.query(

        "DELETE FROM trainers WHERE id=?",

        [req.params.id],

        (err) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({
                    success: true
                });

            }

        }

    );

});

// ======================================================
// MEMBERS
// ======================================================

// GET MEMBERS

app.get("/members", (req, res) => {

    db.query(

        "SELECT * FROM members",

        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json(result);

            }

        }

    );

});

// ADD MEMBER

app.post("/members", (req, res) => {

    const {

        name,
        phone,
        subscription,
        start_date,
        end_date

    } = req.body;

    db.query(

        `
    INSERT INTO members
    (
      name,
      phone,
      subscription,
      start_date,
      end_date
    )
    VALUES (?, ?, ?, ?, ?)
    `,

        [

            name,
            phone,
            subscription,
            start_date,
            end_date

        ],

        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({

                    id: result.insertId,

                    name,
                    phone,
                    subscription,

                    start_date,
                    end_date

                });

            }

        }

    );

});

// UPDATE MEMBER

app.put("/members/:id", (req, res) => {

    const {

        name,
        phone,
        subscription,
        start_date,
        end_date

    } = req.body;

    db.query(

        `
    UPDATE members
    SET
      name=?,
      phone=?,
      subscription=?,
      start_date=?,
      end_date=?
    WHERE id=?
    `,

        [

            name,
            phone,
            subscription,
            start_date,
            end_date,

            req.params.id

        ],

        (err) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({
                    success: true
                });

            }

        }

    );

});

// DELETE MEMBER

app.delete("/members/:id", (req, res) => {

    db.query(

        "DELETE FROM members WHERE id=?",

        [req.params.id],

        (err) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({
                    success: true
                });

            }

        }

    );

});

// ======================================================
// SESSIONS
// ======================================================

// GET SESSIONS

app.get("/sessions", (req, res) => {

    db.query(

        "SELECT * FROM sessions",

        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json(result);

            }

        }

    );

});

// ADD SESSION

app.post("/sessions", (req, res) => {

    const {

        title,
        trainer,
        session_date,
        session_time

    } = req.body;

    db.query(

        `
    INSERT INTO sessions
    (
      title,
      trainer,
      session_date,
      session_time
    )
    VALUES (?, ?, ?, ?)
    `,

        [

            title,
            trainer,
            session_date,
            session_time

        ],

        (err, result) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({

                    id: result.insertId,

                    title,
                    trainer,

                    session_date,
                    session_time

                });

            }

        }

    );

});

// DELETE SESSION

app.delete("/sessions/:id", (req, res) => {

    db.query(

        "DELETE FROM sessions WHERE id=?",

        [req.params.id],

        (err) => {

            if (err) {

                console.log(err);

                res.status(500).json(err);

            } else {

                res.json({
                    success: true
                });

            }

        }

    );

});

// ===== SERVER =====

app.listen(3001, () => {

    console.log(

        "Server running on port 3001 🚀"

    );

});