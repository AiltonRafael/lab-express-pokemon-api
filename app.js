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
    const pokemonMatchById = allPokemon.find((pokemonId) => (pokemonId.id) === parseInt(req.params.id))
    res.status(200).send(pokemonMatchById)
})

app.get('/search/:name', (req, res) => {

    // const pokemonMatchByName = allPokemon.find((currentPokemon) => (currentPokemon.name) === req.params.name)
    // res.status(200).send(pokemonMatchByName)
   
    let pokemonMatchByTypes = allPokemon.filter((currentPokemon) => currentPokemon.types.includes((currentTypes) => console.log(currentTypes) === req.params.name))
    res.status(200).send(`Hello dear ${pokemonMatchByTypes}`)
   
})
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
