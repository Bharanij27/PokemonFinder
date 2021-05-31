class PokemonCart extends HTMLElement{
    pokemonData = {}
    connectedCallback() {
        const pokemon = JSON.parse(this.getAttribute("pokemon-data"));
        this.innerHTML = pokemon ?  `
        <div class="card mb-3 mt-5">
        <div class="row no-gutters">
            <div class="col-md-3">
            <img src="${pokemon?.sprites?.other?.dream_world?.front_default}" class="card-img img thumbnail" alt="pokemon-img">
            </div>
            <div class="col-md-9">
            <div class="card-body">
                <h5 class="card-title">Name : ${pokemon.name.toUpperCase()}</h5>
                <p class="card-text">Base Experience : ${pokemon.base_experience}</p>
                <p class="card-text">Height : ${pokemon.height}</p>
                <p class="card-text">Weight : ${pokemon.weight}</p>
                <p class="card-text">Moves : ${pokemon.moves.reduce((acc, movesData) => acc += movesData.move.name + ", ", '') }</p>
            </div>
            </div>
        </div>
        </div>` : ''
    }
}

customElements.define("pokemon-card", PokemonCart);