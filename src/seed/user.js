const User = require(`../app/models/user`);

module.exports.User = async () => {

    try{
        if (!await User.findOne({ "Email": "master@administrador.com" })){
            console.log('Add User Master');
            await User.create({
                "Name": "Master",
                "Email": "master@administrador.com",
                "Password": "Hora_Ponto_2019"
            });
        }
        else{
            console.log("Master exists.");
        }
    }
    catch (erro) {
        console.error(erro);
    }

};
