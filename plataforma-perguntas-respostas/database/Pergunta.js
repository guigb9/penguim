const Sequelize = require("sequelize");
const connection = require("./database");

//Definindo a tabela (Model)
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        alowNull: false
    }
});

//Sincronizando com o BD, (se tiver criada não mexe se não tiver criada cria uma tabela nova)
Pergunta.sync({force: false}).then(() =>{
    console.log("Tabela Criada");
});

module.exports = Pergunta;