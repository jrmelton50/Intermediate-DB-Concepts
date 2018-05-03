import { Router } from "express";
let router = Router();
import Table from '../table';
import { callProcedure } from "../config/db";

const chirpsTable = new Table("chirps");

router.get("/", (req, res) => {
    // chirpsTable.getAll()
    callProcedure("spUsersAndChirps")
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    chirpsTable.getOne(req.params.id)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// NEW VERSION
router.post("/", (req, res) => {
    // console.log("req.body = ", req.body);
    chirpsTable.insert(req.body)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// OLD VERSION
// router.post("/", (req, res) => {
//     chirpstore.CreateChirp(req.body);
//     res.sendStatus(200);
// });


// NEW VERSION
router.put("/:id", (req, res) => {
    chirpsTable.update(req.params.id, req.body)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// OLD VERSION
// router.put("/:id", (req, res) => {
//     console.log(req.body);
//     chirpstore.UpdateChirp(req.params.id, req.body);
//     res.sendStatus(200);
// });


// NEW VERSION
router.delete("/:id", (req, res) => {
    chirpsTable.delete(req.params.id)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// OLD VERSION
// router.delete("/:id", (req, res) => {
//     chirpstore.DeleteChirp(req.params.id);
//     res.sendStatus(200);
// });

module.exports = router;