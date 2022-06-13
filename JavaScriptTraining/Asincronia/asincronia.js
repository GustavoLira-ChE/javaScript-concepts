// Scope Issues with Callbacks Inside Loops
for (var i = 1; i <= 3; i++) {
    console.log(i)
    setTimeout(function () {
        console.log(i + " second(s) elapsed");
    }, i * 1000);
}
//return ** 4 second(s) elapsed ** 3 times


for (var i = 1; i <= 3; i++) {
    (function(i) {
      setTimeout(function() {
        console.log(i + " second(s) elapsed");
      }, i * 1000);
    })(i);
}

const thePromise = new Promise((resolve, reject) => {
    resolve({
      doSomething: function() {
        return new Promise((resolve, reject) => {
          reject('error!') //you can pass any value
        })
      }
    })
})

thePromise
  .then(response => {
  return response.doSomething()
  })
  .then(response => {
  console.log(response)
  })
  .catch(error => {
  console.log(error)
  })

const URL = "https://pokeapi.co/api/v2/pokemon/1";

const data = fetch(URL)
  .then(response => response.json())
  .then(data => console.log(data, "From a promise"))
  .catch(error => console.log(error))


async function fetchPokemon(){
    const response = await fetch(URL);
    const results = response.json();
    return results
}

const showPokemon = async () => {
    let pokemon = await fetchPokemon();
    return console.log(pokemon, "from sync/await");
};

showPokemon();