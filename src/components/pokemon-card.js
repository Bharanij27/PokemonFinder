class PokemonCart extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode : 'open'});
        this.shadowRoot.innerHTML = `<style>
        .m-5{
            display: flex;
            justify-content: center;
            margin-top: 20px;
            color: red;
        }</style>`;

        const pokemonName = this.getAttribute("pokemon-name");
        const search = this.getAttribute("search");
        if(pokemonName) {
            this.fetchPokemon(pokemonName, search)
        }
    }

    fetchPokemon(pokemonName, search){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(fetchData => fetchData.json())
        .then(data  => {
            this.addPokemonCard(data)
            this.shadowRoot.innerHTML = `<pokemon-card class="mt-3" pokemon-data = ${JSON.stringify(data)}></pokemon-card></div>`
            console.log(search);
            search && localStorage.setItem("last-search", pokemonName);
        }).catch((e) => {
            this.shadowRoot.innerHTML = `<div class="m-5">No data found</div>`
        });
    }

    addPokemonCard(pokemon) {
        this.shadowRoot.innerHTML = pokemon ?  `
        <style>
        .m-5{
            display: flex;
        }
        .card{
            display: flex;
            margin: 3rem 0rem;
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            border-radius: 20px;
            padding: 2rem;
        }
        .card-img-container{
            margin-right: 1rem;
        }
        .card-body{}
        .card-data{}
        .card-title {
            font-size: 1.5rem;
            margin: 0;
        }
        .card-text{}
        </style>
        <div class="card">
            <div class="card-img-container">
            <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" class="card-img" alt="pokemon-img">
            </div>
            <div class="card-body">
            <div class="card-data">
                <h5 class="card-title">Name : ${pokemon.name.toUpperCase()}</h5>
                <p class="card-text">Base Experience : ${pokemon.base_experience}</p>
                <p class="card-text">Height : ${pokemon.height}</p>
                <p class="card-text">Weight : ${pokemon.weight}</p>
                <p class="card-text">Moves : ${pokemon.moves.reduce((acc, movesData) => acc += movesData.move.name + ", ", '') }</p>
            </div>
            </div>
        </div>` : ''
    }
}

customElements.define("pokemon-card", PokemonCart);