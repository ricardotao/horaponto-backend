const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

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

router.get('/index/:id', async (req, res) => {
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
            
            user.Name = Name;
            user.Avatar = Avatar;

        return res.send({ user });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Update User: ' + erro });
    }
});

router.post('/authentication', async (req, res) => {
    const {
        Email,
        Password
    } = req.body;

    try {
        const user = await User.findOne({ Email }).select('+Password');

        if(!user)
            return res.status(400).send({error: 'User not found.'});

        if(await !bcrypt.compareSync(Password, user.Password))
            return res.status(400).send({error: 'User or Password incorrect.'});

        user.Password = null;

        return res.send({ user });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Authentication: ' + erro });
    }
});

router.post('/changePassword/:id', async (req, res) => {

    const {
        Password
    } = req.body;

    try {
        const user = await User.findOne({ "_id": req.params.id });

        if (!user)
            return res.status(400).send({ error: 'User not found.' });

        const hash = await bcrypt.hash(Password, 12) 
        await User.updateOne(
            { "_id": user.id },
            {
                '$set': {
                    "Password": hash,
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


router.post('/forgotPassword', async (req, res) => {

    const {
        Email,
        Password
    } = req.body;

    try {
        const user = await User.findOne({ "Email": Email });

        if (!user)
            return res.status(400).send({ error: 'User not found.' });

        const hash = await bcrypt.hash(Password, 12) 
        await User.updateOne(
            { "_id": user.id },
            {
                '$set': {
                    "Password": hash,
                }
            },
            { new: true, upsert: true }
        );

        return res.send({ user });
    }
    catch (erro) {
        return res.status(400).send({ error: 'Forgot Password: ' + erro });
    }
});

module.exports = app => app.use('/User', router);