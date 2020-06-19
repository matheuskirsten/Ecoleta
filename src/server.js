const express = require("express")
const server = express()

// pegar o banco de dados

const db = require("./database/db")


server.use(express.static("public"))
//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))

//utilizando o template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//configurar a pasta public
//configurar caminhos da app
//req = requisiçao
//res = resposta


server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    //req.query() sao as query string das url


    return res.render("create-point.html", )
})

server.post("/savepoint", (req,res) => {

    //console.log(req.body)

    //alimentar o banco de dados
    const query =  `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?); 
    `

    const values =  [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render ("create-point.html", {saved: true})
    }

     db.run(query, values, afterInsertData)

})

server.get("/search-results", (req, res) => {

    const search = req.query.search 

    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus reegistros: ")
        console.log(rows)

        const total = rows.length

        return res.render("search-results.html", {places: rows, total: total})


    })
    
})


//ligar o servidor
server.listen(3000)