class Search extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : 'open'})
        this.shadowRoot.appendChild(searchForm.content.cloneNode(true))
    }

    connectedCallback(){
        let lastSearch = localStorage.getItem("last-search");
        console.log('lastSearch', lastSearch);
        this.shadowRoot.querySelector("form").onsubmit = ((e, a) => {
            e.preventDefault();
            let searchQuery = this.shadowRoot.querySelector("#pokemon-search").value
            console.log(searchQuery)
            document.querySelector(".pokemon").innerHTML = `
            <pokemon-card pokemon-name = ${searchQuery} search=true></pokemon-card></div>`
            return false;
        })

        if(lastSearch){
            document.querySelector(".pokemon").innerHTML = `
            <pokemon-card pokemon-name = ${lastSearch}></pokemon-card></div>`
        }
    }
}


const searchForm = document.createElement("template");
searchForm.innerHTML = `
<style>
input[type=text] {
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  input[type=submit]:hover {
    background-color: #45a049;
  }
  
  .form-container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    width: max-content;
    margin: 20px 0;
  }
</style>

<div class="form-container">
<form id="formElem">
<input type="text"  name="pokemonname" id="pokemon-search" placeholder="Pikachu">
<input type="submit" value="Fetch">
</form>
</div>`

customElements.define("search-pokemon", Search);
