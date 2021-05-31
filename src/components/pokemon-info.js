class PokemonInfo extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `<app-header/></app-header><div class="container p-5">`

        let pathName = location.pathname;
        let pokemonName = pathName.slice(location.pathname.lastIndexOf('/') + 1).toLowerCase();
        if(!pokemonName.length) location.href = "/"
        else{
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(fetchData => fetchData.json())
            .then(data  => {
                this.innerHTML += `<pokemon-card class="mt-3" pokemon-data = ${JSON.stringify(data)}></pokemon-card></div>`
                }
            ).catch(() => {
                this.innerHTML += `No data found</div>`
            });
        }
    }
}

customElements.define('pokemon-info', PokemonInfo);