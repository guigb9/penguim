const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//Database

connection
.authenticate().then(() =>{
    console.log("Conexão feita com o banco de dados!")
}).catch((msgErro) =>{
    console.log(msgErro);
})


//estou dizendo para o express usar o EJS como View Engine (renderizador de HTML)
app.set('view engine', 'ejs');
app.use(express.static('public'));

//bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//rotas
app.get("/", (req, res) =>{
    //Faz a pesquisa de perguntas ordenadas pelo id de forma decrescente e salva na varável de perguntas para
    //renderizar no frontend
    Pergunta.findAll({row: true, order: [
        ['id', 'DESC']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvar-pergunta", (req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect("/");
    }).catch((err) =>{
        console.log(err);
    });
});

app.post("/salvar-resposta", (req, res) => {
    var resposta = req.body.resposta;
    var idPergunta = req.body.idPergunta;
    Resposta.create({
        corpo: resposta,
        perguntaId: idPergunta
    }).then(() =>{
        res.redirect("/pergunta/"+idPergunta);
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/")

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where:{
                    perguntaId: id
                },
                order:[
                    ['ID', 'DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("/")
        }
    });
});

app.listen(8080, () =>{console.log("App rodando!")});

