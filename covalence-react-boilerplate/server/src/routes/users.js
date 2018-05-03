import { Router } from "express";
let router = Router();
import Table from '../table';
import {executeQuery} from '../config/db';
import { callProcedure } from "../config/db";

const usersTable = new Table("users");

router.get("/", (req, res) => {
    usersTable.getAll()
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    usersTable.getOne(req.params.id)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/name/:username", (req, res) => {
    let query = `SELECT id FROM users WHERE name='${req.params.username}';`;
    executeQuery(query)
    .then( (results) => {
        res.json(results[0])
    })
    .catch( (err) => {
        console.log(err)
        res.sendStatus(500);
    })
});

router.get("/chirps/:id", (req, res) => {
    callProcedure("spUserChirps", req.params.id)
    .then( (results) => {
        res.json(results[0])
    })
    .catch( (err) => {
        console.log(err)
        res.sendStatus(500);
    })
});

router.post("/", (req, res) => {
    usersTable.insert(req.body)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
    usersTable.update(req.params.id, req.body)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
    usersTable.delete(req.params.id)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;