const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.get('/store', async (req, res) => {
    try {
        const user = await User.find();
        return res.send({ user });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Get List Store User: ' + erro });
    }
});

outer.get('/index/:id', async (req, res) => {
    try {
        const user = await User.findOne({ "_id": req.params.id });
        return res.send({ user });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Get Index User: ' + erro });
    }
});

router.post('/', async (req, res) => {

    const {
        Name,
        Email,
        Password,
        Avatar,
    } = req.body;

    try{
        if(await User.findOne({ Email }))
            return res.status(400).send({ error: 'User exists.' });

        const user = await User.create({
            "Name": Name,
            "Email": Email,
            "Password": Password,
            "Avatar": Avatar
         });

        user.Password = undefined;
        return res.send({ user });
    }
    catch(erro){
        return res.status(400).send({ error: 'Add User: ' + erro });
    }
});

router.put('/:id', async (req, res) => {

    const {
        Name,
        Email,
        Password,
        Avatar,
    } = req.body;

    try {
        const user = await User.findOne({ "_id": req.params.id });

        if(!user)
            return res.status(400).send({ error: 'User not found.' });

        await User.updateOne(
            { "_id": user.id },
            {
                '$set':{
                    "Name": Name,
                    "Avatar": Avatar
                }
            },
            { upsert: true }
        );

        return res.send({ user });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Update User: ' + erro });
    }
});

router.put('/ChangePassword/:id', async (req, res) => {

    const {
        Password
    } = req.body;


    try {
        const user = await User.findOne({ "_id": req.params.id });

        if (!user)
            return res.status(400).send({ error: 'User not found.' });

        await User.updateOne(
            { "_id": user.id },
            {
                '$set': {
                    "Password": Password,
                }
            },
            { new: true, upsert: true }
        );

        return res.send({ user });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Change Password: ' + erro });
    }
});

module.exports = app => app.use('/User', router);