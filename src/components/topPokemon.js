class TopPokemon extends HTMLElement{
  pokemonData = [];

  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.shadowRoot.appendChild(tableTemplate.content.cloneNode(true));
    this.fetchPokemonData();
  }

  fetchPokemonData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
    .then(fetchData => fetchData.json())
    .then(data  => {
          this.pokemonData = data?.results|| [];
          this.generateTbody();
    })
    .catch(e => console.log(e))
  }
  

  generateTbody = () => {
    let tbody = this.shadowRoot.querySelector(".pokemon-list");
    this.pokemonData.forEach((data, idx) => {
      let pokemonName = data?.name || "";
      this.createRow(tbody, pokemonName, idx);
      this.shadowRoot.querySelector(`#${pokemonName}`).addEventListener("click", () => this.viewDetails(data)) 
    });
  }

  createRow(tbody, pokemonName, idx){
    let tableRow = document.createElement("tr")
    let position= document.createElement("td");
    position.innerHTML = idx + 1;

    let name= document.createElement("td");
    let namespan = document.createElement('span');
    namespan.className = "pokemon-name"
    namespan.id = pokemonName;
    namespan.innerHTML = pokemonName.substring(0,1).toUpperCase() + pokemonName.substring(1);
    
    name.appendChild(namespan);
    tableRow.appendChild(position)
    tableRow.appendChild(name);
    tbody.appendChild(tableRow);
  }

  viewDetails(data) {
    document.querySelector(".pokemon").innerHTML = `
    <pokemon-card pokemon-name = ${data.name}></pokemon-card></div>`
  }

  render(source){
    this.shadowRoot.innerHTML = source
  }
}

const tableTemplate = document.createElement("template");
tableTemplate.innerHTML = `
<style>
.pokemon-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
s
}

.pokemon-table td, .pokemon-table th {
  padding: 0.8rem;
}

.pokemon-table tr:nth-child(even){background-color: #f2f2f2;}

.pokemon-table tr:hover {background-color: #ddd;}

.pokemon-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #0d6efd;
  color: white;
}
.pokemon-name{
  cursor: pointer;
  padding: 10px;
}
</style>
<table class="pokemon-table">
<thead>
  <tr>
    <th>Position</th>
    <th>Pokemon</th>
  </tr>
</thead>
<tbody class="pokemon-list">
</tbody>
</table>
</div>`

customElements.define('top-pokemon', TopPokemon);