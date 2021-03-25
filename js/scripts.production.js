
  let pokemonList = [
    {name:"Bulbasaur", height:"7", types:["grass","poison"]},
    {name: "Venusaur", height: "2", types:["grass","poison"]},
    {name: "Charizard", height:"1.7", types:["fire","flying"]},
  ];

  pokemonList.forEach(function(xxx){
 if (xxx.height>"6"){
    document.write( "<p>"+xxx.name+" (height:"+xxx.height+")- Wow. That is big! </p>")
  } else {
    document.write("<p>"+xxx.name+" (height:"+xxx.height+") </p>");
  }
});
