const express = require('express');

const Point = require('../models/point');

const router = express.Router();

router.get('/index/:id/:dn', async (req, res) => {
    
    const year = new Date(req.params.dn).getUTCFullYear();
    const month = new Date(req.params.dn).getUTCMonth();
    const day = new Date(req.params.dn).getUTCDate();

    const dateStart = new Date(year,month,day).setUTCHours(00); 
    const dateEnd = new Date(year,month,day).setUTCHours(23);

    try {    
        const query = await Point.find({ 
            "UserId": req.params.id, 
            "DatePoint": { $gte : dateStart, $lte: dateEnd }
        });

        const points = [];
        query.forEach((item) => (
            points.push({
                point: item, 
                hour: new Date(item.DatePoint).getUTCHours(), 
                minute: new Date(item.DatePoint).getUTCMinutes()  
            })));

        return res.send({ 
            points
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