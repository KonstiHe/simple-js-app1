let pokemonRepository = (function () {
  let pokemonList = [
    {name:"Bulbasaur", height:"7", types:["grass","poison"]},
    {name: "Venusaur", height: "2", types:["grass","poison"]},
    {name: "Charizard", height:"1.7", types:["fire","flying"]},
  ];
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

  function myLoop(pokemon){
  if (pokemon.height>"6"){
    document.write( "<p>"+pokemon.name+" (height:"+pokemon.height+")- Wow. That is big! </p>")
  } else {
    document.write("<p>"+pokemon.name+" (height:"+pokemon.height+") </p>");
  }
};

pokemonList.forEach(myLoop);
