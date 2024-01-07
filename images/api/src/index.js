const app = require ("./app")
const port = 3000

app.listen(port, (err) => {
    if(!err){
        console.log("server is listening on port" + port)

    }else{
        console.error(err)
    }
} )