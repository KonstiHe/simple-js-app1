let pokemonList=[
  {name:"Bulbasaur", height:"7", types:["grass","poison"]},
  {name: "Venusaur", height: "2", types:["grass","poison"]},
  {name: "Charizard", height:"1.7", types:["fire","flying"]}];

let text="<ul>";
for (let i=0; i<pokemonList.length; i++){
  if (pokemonList[i].height>"6") {
    document.write( text+"<li>"+pokemonList[i].name+" (height:"+pokemonList[i].height+")- Wow. That is big!");
  } else {
    document.write(text+"<li>"+pokemonList[i].name+" (height:"+pokemonList[i].height+")");
  }
  }
