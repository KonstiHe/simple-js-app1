let pokemonRepository = (function () {
  let pokemonList = [
    {name:"Bulbasaur", height:7, types:["grass","poison"]},
    {name: "Venusaur", height: 2, types:["grass","poison"]},
    {name: "Charizard", height:1.7, types:["fire","flying"]},
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem (pokemon)
  {
  let unorderedList=document.querySelector(".pokemon-list");
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText=pokemon.name;
  button.classList.add("button-class");
  listItem.appendChild(button);
  unorderedList.appendChild(listItem);
  button.addEventListener("click", function(event){
    showDetails(pokemon);
  })
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();



pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
