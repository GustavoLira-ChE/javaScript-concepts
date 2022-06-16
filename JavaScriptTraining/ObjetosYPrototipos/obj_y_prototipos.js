function Dog (name , breed){
    this.name = name 
    this.breed = breed
}

Dog.prototype = {
    constructor: Dog,
    describe: function(){
        alert(`Dog's name: ${this.name} its breed is ${this.breed}`)
    }
}

const dogObjectArrays = []
const request = new XMLHttpRequest();
request.open("GET","https://dog.ceo/api/breeds/list/all");
request.send();
request.onload = function(){
    const json = JSON.parse(request.responseText);
    const arrayEntris = Object.entries(json.message)
    arrayEntris.map(element => {
        if(element[1].length > 0){
            for(let i = 0; i < element[1].length; i++){
                let breed = [element[0], element[1][i]]
                dogObjectArrays.push(new Dog("firulais",breed))
            }
        } else{
            let breed = element[0]
            dogObjectArrays.push(new Dog("firulais",breed))
        }
    })
    console.log(dogObjectArrays);
}