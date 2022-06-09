//Ejemplo 1: crear una clase vacía
class Person {
}
console.log(Person);

//console.log(typeof Person, typeof Person1)

//Ejemplo2
//Crear un objeto a partir de una clase
let person1 = new Person() //Instanciar
console.log(`Instancia de una clase creada ${person1}`)

//Ejemplo3
//Crear objeto con atributos
class Pokemon {
    constructor(name, type, attack) {
        this.name = name
        this.type = type
        this.attack = attack
    }
}
//Instanciar objeto con atributos
let pikachu = new Pokemon('pikachu', 'electric', 'thunder')
let charizard = new Pokemon('charizard', ['fire', 'flight'], 'Fireblast')
console.log(charizard)
console.log(pikachu, typeof Pokemon, typeof pikachu)

// Ejemplo 4: Métodos en los objetos
class Repository {
    constructor(name, author, language, stars) {
        this.name = name
        this.author = author
        this.language = language
        this.stars = stars
    }
    getNumberStars() {
        return `Repository ${this.name} has ${this.stars} stars`
    }
}

let myRepository = new Repository('pokedex', 'gustavol', 'javascript', 5)
console.log(myRepository.getNumberStars())

//Ejemplo 5: Atributos con valores por Default
class PullRequest {
    constructor(repo, title, lines_changed) {
        this.repo = repo
        this.title = title
        this.lines_changed = lines_changed
        this.status = 'OPEN'
        this.dateCreated = new Date()
    }

    getInfo() {
        return `This PR is in the repo: ${this.repo} (status: ${this.status}) and was created on ${this.dateCreated}`
    }
}

let myPR = new PullRequest('pokedex', 'mi first PR', 150)
console.log(myPR.getInfo())
const myPR2 = new PullRequest("LaunchX", "Mi segundo PR", 99)
console.log(myPR2.getInfo())

// Ejemplo 6: Getters para acceder a los atributos del objeto
class SoccerPlayer {
    constructor(name, age, team, position) {
        this.name = name
        this.age = age
        this.team = team
        this.position = position
        this.yellowCard = 5
        this.redCard = 1
    }

    get getTotalFaultCard() {
        console.log(`${this.name} has ${this.yellowCard} yellow cards and ${this.redCard} red cards`)
    }
}

let nacho = new SoccerPlayer('nacho', 20, 'Leon', 'Defense')
nacho.getTotalFaultCard

// Ejemplo 7: Setters para modificar los atributos del objeto
class SoccerPlayer2 {
    constructor(name, age, team, position) {
        this.name = name
        this.age = age
        this.team = team
        this.position = position
        this.yellowCard = 0
        this.redCard = 0
        this.goals = 0
    }

    get getTotalFaultCard() {
        console.log(`${this.name} has ${this.yellowCard} yellow cards and ${this.redCard} red cards`)
    }

    get getGoalsScore() {
        console.log(`${this.name} has ${this.goals} goals as ${this.position}`)
    }

    set setYellowCards(yellow_card) {
        this.yellowCard += yellow_card
    }
    set setRedCards(red_card) {
        this.redCard += red_card
    }
    set setGoals(goals) {
        this.goals += goals
    }
}

let cr7 = new SoccerPlayer2('Cristian Ronaldo', 35, 'Manchester United', 'Forward')
//Usando los getter
cr7.getGoalsScore
cr7.getTotalFaultCard

//Usando los setter
cr7.setGoals = 300
cr7.getGoalsScore

cr7.setYellowCards = 20
cr7.setRedCards = 5
cr7.getTotalFaultCard

/* Ejemplo 8: Métodos static nos ayudan a escribir métodos
en una clase que podemos usar sin necesidad de instanciar 
algún objeto */
class Toolbox {
    static getMostUsefulTools() {
        return ["Command line", "git", "Text Editor"]
    }
}
// Puedo llamar el método static directamente con el nombre de la clase
console.log(Toolbox.getMostUsefulTools())
// Si intentamos instanciar un objeto, no podremos llamar este método static
//const toolbox = new Toolbox()
//console.log(toolbox.getMostUsefulTools()) // is not a function

/* 
HERENCIA: Nos permite relacionar clases entre sí y 
reutilizar sus componentes
*/

//Ejemplo 9: Herencia entre dos clases
class Computer {
    constructor(cpu, ram, gpu, storage) {
        this.cpu = cpu
        this.ram = ram
        this.gpu = gpu
        this.storage = storage
    }
    get getMainComputerComponents() {
        return `Your computer has ${this.cpu} CPU, ${this.ram} RAM, ${this.gpu} GPU, and ${this.storage} storage`
    }
    //Method
    computerStatus() {
        return 'Your computer is Awesome!!!'
    }
    getMoreInfo() {
        let computerInfo = this.getMainComputerComponents
        let computerStatus = this.computerStatus

        return `${computerInfo}. 
        ${computerStatus()}`
    }
}
let myComputer = new Computer('Ryzen 5', 'Crucial 12GB', 'NVIDIA GeForce RTX 3080', 'WD_BLACK 500GB SSD')
console.log(myComputer)
console.log(myComputer.getMainComputerComponents)
/* Se usa la palabra extends para indicar que heredarás las 
propiedades de la clase Padre (Computer) en la clase 
definida.
Podemos definir una clase vacía y rehusar todos los componentes
de la clase padre */
class Desktop extends Computer {
}
let myDesktopComputer = new Desktop('Intel I7 9000k', 'Samsung M393a2 16GB', 'GIGABYTE GeForce RTX 2060', 'Kingston 480GB SSD')
console.log(myDesktopComputer)
console.log(myDesktopComputer.getMainComputerComponents)

// Ejemplo 10: Overrinding methods
class Laptop extends Computer {
    constructor(cpu, ram, gpu, storage, battery) {
        //// SUPER nos ayudará a llamar el constructor padre
        super(cpu, ram, gpu, storage)
        // Agregamos este atributo de la clase Viajero, es exclusiva de esta clase y no de la clase padre
        this.battery = battery
    }
    getMoreInfo() {
        let computerInfo = this.getMainComputerComponents
        let computerStatus = this.computerStatus

        return `${computerInfo}.
        Your battery is ${this.battery}
        ${computerStatus()}`
    }
}

let myLaptop = new Laptop('Ryzen 7 5800x', 'DELL 32GB DDR4 SODIMM', 'GeForce RTX 30-Series', 'WD blue 250GB SSD', 'NoteBook Baterry Acer Nitro 5 3815mAh')
console.log(myLaptop)
console.log(myLaptop.getMainComputerComponents)
console.log(myLaptop.getMoreInfo())

//Propiedade privadas
class ClassWithPrivateField {
    // Cada atributo privado tienen que ser declarado dentro de la clase
    #privateField;

    constructor() {
        this.#privateField = 42;
    }

    set setPrivateField(newNumber){
        this.#privateField = newNumber;
    }
    get getPrivateField(){
        return this.#privateField;
    }
}

const instance = new ClassWithPrivateField()
//instance.#privateField === 42;   // Syntax error
instance.setPrivateField = 43;
console.log(instance.getPrivateField)