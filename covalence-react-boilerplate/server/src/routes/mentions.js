import { Router } from "express";
let router = Router();
import Table from '../table';
const mentionsTable = new Table("mentions");
import { callProcedure } from "../config/db";
import { executeQuery } from '../config/db';


// router.get("/", (req, res) => {
//     callProcedure("spUserMentions");
//     // mentionsTable.getAll()
//     // .then( (results) => {
//     //     res.json(results)
//     // })
//     // .catch( (err) => {
//     //     console.log(err);
//     //     res.sendStatus(500);
//     // });
// }); 

router.get("/:id", (req, res) => {
    callProcedure("spUserMentions", req.params.id)
    .then( (results) => {
        res.json(results[0])
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    // console.log("req.body = ", req.body);
    mentionsTable.insert(req.body)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
    mentionsTable.update(req.params.id, req.body)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
    // mentionsTable.delete(req.params.id)
    executeQuery(`DELETE FROM mentions WHERE chirpid = ${req.params.id}`)
    .then( (results) => {
        res.json(results)
    })
    .catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});


module.exports = router;