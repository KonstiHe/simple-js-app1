let pokemonRepository = (function() {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=10',
    n = document.querySelector('#modal-container');
  function o() {
    n.classList.remove('is-visible');
  }
  return (
    window.addEventListener('keydown', e => {
      let t = document.querySelector('#modal-container');
      'Escape' === e.key && t.classList.contains('is-visible') && o();
    }),
    n.addEventListener('click', e => {
      e.target === n && o();
    }),
    {
      getAll: function() {
        return e;
      },
      addListItem: function(e) {
        let t = document.querySelector('.pokemon-list'),
          n = document.createElement('li');
        n.classList.add('list-group-item');
        let o = document.createElement('button');
        o.classList.add('btn-outline-success'),
          o.classList.add('btn-block'),
          (o.innerText = e.name),
          (o.type = 'button'),
          (o.dataset.toggle = 'modal'),
          (o.dataset.target = '#modal-container'),
          n.appendChild(o),
          t.appendChild(n),
          o.addEventListener('click', function() {
            var t;
            (t = e),
              pokemonRepository.loadDetails(t).then(function(e) {
                !(function(e) {
                  let t = $('.modal-body'),
                    n = $('.modal-title');
                  n.empty(), t.empty();
                  let o = $('<h1>' + e.name + '</h1>'),
                    a = $(
                      '<img class="modal-img" alt="Front of ' +
                        e.name +
                        '" style="width:50%">'
                    );
                  a.attr('src', e.imageUrlFront);
                  let i = $(
                    '<img class="modal-img" alt="Back of ' +
                      e.name +
                      '"  style="width:50%">'
                  );
                  i.attr('src', e.imageUrl);
                  let l = $('<p>Height : ' + e.height + '</p>'),
                    s = $('<p>Weight : ' + e.weight + '</p>'),
                    c = document.createElement('div');
                  c.classList.add('type-wrapper'),
                    c.classList.add('row'),
                    e.types.forEach(e => {
                      let t = document.createElement('span'),
                        n = document.createElement('p');
                      (n.innerText = e.type.name),
                        t.classList.add('type'),
                        t.classList.add('col'),
                        t.classList.add(e.type.name),
                        t.appendChild(n),
                        c.appendChild(t);
                    }),
                    n.append(o),
                    t.append(a),
                    t.append(i),
                    t.append(l),
                    t.append(s),
                    t.append(c),
                    $('#pokemonModal').modal('toggle');
                })(e);
              });
          });
      },
      loadList: function() {
        return fetch(t)
          .then(function(e) {
            return e.json();
          })
          .then(function(t) {
            t.results.forEach(function(t) {
              !(function(t) {
                e.push(t);
              })({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function(e) {
            console.error(e);
          });
      },
      loadDetails: function(e) {
        let t = e.detailsUrl;
        return fetch(t)
          .then(function(e) {
            return e.json();
          })
          .then(function(t) {
            return (
              (e.imageUrl = t.sprites.front_default),
              (e.height = t.height),
              (e.types = t.types),
              (e.weight = t.weight),
              e
            );
          })
          .catch(function(e) {
            console.error(e);
          });
      }
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
