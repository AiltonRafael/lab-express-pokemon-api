const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/pokemon', (req, res) => {
    res.status(200).send(allPokemon)
})

app.get('/pokemon/:id', (req, res) => {
    if(req.params.id <= allPokemon.length){
        const pokemonMatchById = allPokemon.find((pokemonId) => (pokemonId.id) === parseInt(req.params.id))
        res.status(200).send(pokemonMatchById)
    } else (res.status(404).send(`Id ${req.params.id} doesn't exist`))
})

app.get('/search/:name', (req, res) => {

    if(allPokemon.find((currentPokemon) => currentPokemon.name === req.params.name)){
        const pokemonMatchByName = allPokemon.find((currentPokemon) => (currentPokemon.name) === req.params.name)
        res.status(200).send(pokemonMatchByName)
    } else if(allPokemon.find((currentPokemon) => true == currentPokemon.types.includes(req.params.name))) {
        let pokemonMatchByTypes = allPokemon.filter((currentPokemon) => true == currentPokemon.types.includes(req.params.name))
        res.status(200).send(pokemonMatchByTypes)  
    } else {
        res.status(404).send('Not found')
    }

  
})


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));