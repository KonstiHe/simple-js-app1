let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  let modalContainer=document.querySelector('#modal-container');

function add(pokemon) {
    pokemonList.push(pokemon);
  }

function getAll() {
    return pokemonList;
  }

function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item");
    let button = document.createElement("button");
    button.classList.add("btn-outline-success");
    button.classList.add("btn-block");
    button.innerText = pokemon.name;

    button.type="button";
    button.dataset.toggle="modal";
    button.dataset.target="#modal-container";
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        //console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      return item;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function (item) {
      showModal(item);
    });
  }


function showModal(item) {
    let modal=$('.modal-content');
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $('<h1>' + item.name + '</h1>');
    // creating img in modal content

  let imageElementFront = $(
      '<img class="modal-img" alt="Front of ' +
        item.name +
        '" ' +
        'style="width:50%">'
    );
    imageElementFront.attr('src', item.imageUrlFront);

  let imageElementBack = $(
      '<img class="modal-img" alt="Back of ' +
        item.name +
        '" ' +
        ' style="width:50%">'
    );
    imageElementBack.attr('src', item.imageUrl);
    // creating element for height in modal content
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
    // creating element for weight in modal content
    let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');
    // creating element for type in modal content
    let typesDiv = document.createElement('div');
    typesDiv.classList.add('type-wrapper');
    typesDiv.classList.add('row');

    item.types.forEach((type) => {
      let typesElement = document.createElement('span');
      let typesText = document.createElement('p');
      typesText.innerText = type.type.name;
      typesElement.classList.add('type');
      typesElement.classList.add('col');
      typesElement.classList.add(type.type.name);
      typesElement.appendChild(typesText);
      typesDiv.appendChild(typesElement);
    });

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesDiv);

    $("#pokemonModal").modal("toggle");
  }

function hideModal() {
  modalContainer.classList.remove('is-visible');
}




window.addEventListener ('keydown', (e)=>{
  let modalContainer=document.querySelector('#modal-container');
  if (e.key==='Escape'&& modalContainer.classList.contains ('is-visible')){
    hideModal();
  }
});

modalContainer.addEventListener ('click', (e)=>{
  let target=e.target;
  if(target===modalContainer){
    hideModal();
  }
});

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
