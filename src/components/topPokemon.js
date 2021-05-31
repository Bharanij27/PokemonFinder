class TopPokemon extends HTMLElement{
  pokemonData = [];

  connectedCallback() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    .then(fetchData => fetchData.json())
    .then(data  => {
          this.pokemonData = data?.results|| [];
          this.innerHTML = `
          <app-header></app-header>
          <div class="container">
          <table class="table table-striped table-hover text-center mx-auto">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Pokemon</th>
              </tr>
            </thead>    
            <tbody>
              ${this.generateTbody()}
            </tbody>
          </table>
          </div>
          `;
    })
    .catch(e => console.log(e))
    .finally(() =>{
      this.pokemonData.forEach((data, idx) => {  
        // this.setLocal(data)
      });
    })
  }

  

  generateTbody = () => {
    let tbody = '';
    this.pokemonData.forEach((data, idx) => {
      let pokemonName = data?.name;
      tbody += `<tr><th scope="row">${idx + 1}</th><td>
        <a href="/pokemon/${pokemonName}">${pokemonName.toUpperCase() || ""}</a>
      </td>`
    });
    return tbody;
  }

  // setLocal = (url) => {
  //   console.log(this)
  //   localStorage.setItem('pokemon-url', url)
  // }

}

customElements.define('top-pokemon', TopPokemon);