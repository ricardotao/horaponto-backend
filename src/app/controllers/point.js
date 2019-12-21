const express = require('express');

const Point = require('../models/point');

const router = express.Router();

router.get('/index/:id/:day', async (req, res) => {
    try {
        const point = await Point.find({ "UserId": req.params.id, "DateDay.day": req.param.day });
        return res.send({ 
            type: point.Type, 
            dateday: point.DateDay, 
            datepoint: point.DatePoint, 
            hour: new Date(point.DatePoint).getUTCHours(), 
            minute: new Date(point.DatePoint).getUTCMinutes() 
        });
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
        const _date = new Date(Day);
        const dateQuery = _date.getDate() +'/'+ _date.getMonth() +'/'+ _date.getFullYear();
        
        const _Point = null;
        if(await Point.findOne({ UserId, "DateDay": dateQuery })){
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