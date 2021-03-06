const express = require('express');

const Point = require('../models/point');

const router = express.Router();

router.get('/index/:id/:dn', async (req, res) => {

    const datePoint = new Date(req.params.dn);
    console.log("datePoint: ", datePoint);
    const dateQuery = datePoint.getFullYear() +'-'+ (datePoint.getMonth()+1) +'-'+datePoint.getUTCDate();
    console.log("dataQuery: ", dateQuery);

    try {    
        const query = await Point.find({ 
            "UserId": req.params.id, 
            "DatePoint": dateQuery
        });

        const points = [];
        query.forEach((item) => (
            points.push({
                point: item, 
                hour: new Date(item.DateHourPoint).getUTCHours(), 
                minute: new Date(item.DateHourPoint).getUTCMinutes()  
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
        const datePoint = new Date(Day);
        console.log("datePoint: ", datePoint);
        const dateQuery = datePoint.getFullYear() +'-'+ (datePoint.getMonth()+1) +'-'+datePoint.getUTCDate();
        console.log("dateQuery: ", dateQuery);
        //const dateHourPoint = new Date(Hour);
        const dateHourPoint = new Date();
        console.log("dateHourPoint: ", dateHourPoint);
        
        let point = null;
        const findPoint = await Point.findOne({ "UserId": UserId, "DatePoint": dateQuery, "Type": Type });
        if(findPoint){
            await Point.updateOne(
                { "_id": findPoint.id },
                {
                    '$set':{
                        "DateHourPoint": dateHourPoint,
                        "Type": Type
                    }
                },
                { upsert: true }
            );
            point = {
                "UserId": UserId,
                "DatePoint": datePoint,
                "DateHourPoint": dateHourPoint,
                "Type": Type
            };
        }
        else{
            point = await Point.create({
                "UserId": UserId,
                "DatePoint": datePoint,
                "DateHourPoint": dateHourPoint,
                "Type": Type
            });
        }   
        
        const points = [];
        points.push({
            point,
            hour: dateHourPoint.getUTCHours(), 
            minute: dateHourPoint.getUTCMinutes()
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