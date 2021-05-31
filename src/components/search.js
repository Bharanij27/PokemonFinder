class Search extends HTMLElement{
    connectedCallback(){
        let lastSearch = JSON.parse(localStorage.getItem("last-search"));
        this.innerHTML = `
            <app-header/></app-header>
            <div class="container p-5">
            <form id="formElem>
                <div class="form-row align-items-center">
                    <div class="col-sm-3 my-1">
                        <input type="text" class="form-control" id="pokemon-search" placeholder="pikachu" required>
                    </div>
                    <div class="col-auto my-1 mt-3">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
            <div class="mt-3"> Last Searched Pokemon : </div> 
            ${lastSearch ? `
            <div id="last-search">
             <pokemon-card class="mt-3" pokemon-data = ${JSON.stringify(lastSearch)}></pokemon-card> ` : "Haven't searched any"}
            </div>
            </div>
        `

        this.querySelector("form").onsubmit = ((e, a) => {
            e.preventDefault();
            let searchQuery = this.querySelector("#pokemon-search").value
            console.log(searchQuery)
            this.fetchPokemon(searchQuery);
            return false;
        })
    }

    fetchPokemon = (query) => {
        console.log(query.trim().toLowerCase());
        fetch(`https://pokeapi.co/api/v2/pokemon/${query.trim().toLowerCase()}`)
            .then(fetchData => fetchData.json())
            .then(data  => {
                document.querySelector("#last-search").innerHTML = data ?
                `<pokemon-card class="mt-3" pokemon-data = ${JSON.stringify(data)}></pokemon-card>`:""
                localStorage.setItem("last-search", JSON.stringify(data));
            }).catch((e)=>{
                console.log(e)
                document.querySelector("#last-search").innerHTML = "No data found for query"
            })
    }
}

customElements.define("search-pokemon", Search);