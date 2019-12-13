const express = require('express');

const Point = require('../model/point');

const router = express.Router();

outer.get('/index/:id', async (req, res) => {
    try {
        const point = await Point.findOne({ "UserId": req.params.id });
        return res.send({ point });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Get Index Point: ' + erro });
    }
});

router.post('/', async (req, res) => {

    const {
        UserId,
        Day,
        Hour,
        Type
    } = req.body;

    try{
        const _Point = null;
        if(await Point.findOne({ UserId, "DateDay": Day })){
            _Point = await User.updateOne(
                { "UserId": point.id, "DateDay": point.DateDay },
                {
                    '$set':{
                        "DatePoint": Hour,
                        "Type": Type
                    }
                },
                { upsert: true }
            );
        }
        else{
            _Point = await Point.create({
                "UserId": UserId,
                "DateDay": Day,
                "DatePoint": Hour,
                "Type": Type
            });
        }

        return res.send({ _Point });
    }
    catch(erro){
        return res.status(400).send({ error: 'Update Point: ' + erro });
    }
});

module.exports = app => app.use('/Point', router);