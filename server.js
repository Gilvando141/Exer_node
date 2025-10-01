
require('dotenv').config(); //variaveis de ambiente para escoder no repositorio senhas
const express = require('express');//inicia o express
const app = express();
const mongo = require('mongoose');//A base dados para que seja salvos
const session = require('express-session');//session para salvar um cookie e o sevidor vai pegar
const MongoStore = require('connect-mongo');//Para salvar a assenions na base de dados naão na memoria
const flash = require('connect-flash');//Mensagens rapidas salvas na sessão
const routes = require('./routes');//rotas (./, /contaos, /home)
const path = require('path');//para rota do arquivo
const helmet = require('helmet');//recomedação do express
const csrf = require('csurf');//são tokens para os fomularios, para nenhum app possa postar coisa dentro da aplicação
const {middlewareGlobal, csrfMiddleware}= require('./src/middleware/middleware');//middleware funções que pode ser executada no meio do caminho
const { default: mongoose } = require('mongoose');
//para conoectar e deixar os cookie salvo para o sevidor sabe qual é o usuario
const sessionOptions = session({
    secret: 'akdnfoasjdnoaiefmapomap()**&',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
mongo.connect(process.env.CONNECTIONSTRING)//conexão com a base de dados
    .then(()=>{
        app.emit('Ok');//ele vai emitir um sinal para se pego la em baixo no localhost
    })
    .catch(e=> console.log(e));


//configução que vão utializar dentro do express
app.use(express.urlencoded({extended: true}));//aqui pode postar formulario para dentro da aplicação
app.use(express.json());//para fazer o parsejson para dentro da aplicação
app.use(express.static(path.resolve(__dirname, 'public')));//esse aqui é para o sevidor acessar os arquivos da pasta public direto da aplicação
app.use(helmet());
app.use(sessionOptions);//configuração de sessão
app.use(csrf());//executando o token para os fomularios
app.use(flash());//executando o flash
//o middleware aqui vai estar em todas as rotas, se fizer no router.js ele so vai ficar em um rota so
app.use(middlewareGlobal);
app.use(csrfMiddleware);
//app.use(checkCsrfError);
//app.use(outromiddleware)


app.set('views', path.resolve(__dirname, 'src', 'views'));//views arquivos que vão rederenziar na tela normalmente html
app.set('view engine', 'ejs');//estamos usando a enginer ejs, mas tem outras que são diferentes

app.use(routes);//execusão das rotas
app.on('Ok',()=>{
    app.listen(3030, ()=>{
    console.log('Servidor executando...');
    console.log('Acessar: http://localhost:3030');
    });
});

