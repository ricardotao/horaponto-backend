const express = require('express');

const Point = require('../models/point');

const router = express.Router();

router.get('/index/:id/:dn', async (req, res) => {
    
    const year = new Date(req.params.dn).getFullYear();
    const month = new Date(req.params.dn).getMonth();
    const day = new Date(req.params.dn).getDate();

    const dateStart = new Date(year,month,day).setHours(00); 
    const dateEnd = new Date(year,month,day).setHours(23);

    const _date = new Date(req.params.dn);
    const dateFormat = _date.getFullYear() +'-'+ (_date.getMonth()+1) +'-'+_date.getDate();

    try {    
        const query = await Point.find({ 
            "UserId": req.params.id, 
            //"DatePoint": { $gte : dateStart, $lte: dateEnd }
            "DateDay": dateFormat
        });

        const points = [];
        query.forEach((item) => (
            points.push({
                point: item, 
                hour: new Date(item.DatePoint).getHours(), 
                minute: new Date(item.DatePoint).getMinutes()  
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
        const dateFormat = _date.getFullYear() +'-'+ (_date.getMonth()+1) +'-'+_date.getDate();
        const _dateHour = new Date(Hour);
        
        let point = null;
        if(await Point.findOne({ "UserId": UserId, "DateDay": dateFormat, "Type": Type })){
            await Point.updateOne(
                { "UserId": UserId },
                {
                    '$set':{
                        "DatePoint": Hour,
                        "Type": Type
                    }
                },
                { upsert: true }
            );
            point = {
                "UserId": UserId,
                "DateDay": _date,
                "DatePoint": Hour,
                "Type": Type
            };
        }
        else{
            point = await Point.create({
                "UserId": UserId,
                "DateDay": dateFormat,
                "DatePoint": Hour,
                "Type": Type
            });
        }   
        
        const points = [];
        points.push({
            point,
            hour: _dateHour.getHours(), 
            minute: _dateHour.getMinutes()
        });
        return res.send({ 
            points  
         });
    }
    catch(erro){
        return res.status(400).send({ error: 'Update Point: ' + erro });
    }
});

module.exports = app => app.use('/Point', router);