const values = [false, 0, -0, 0n, "", null, undefined, NaN, '0', 'false', [], {}, function () { }]

for (let i = 0; i < values.length; i++) {
    if (values[i]) {
        console.log(`Esto es verdadero: ${values[i]}`);
    } else {
        console.log(`Esto es falso: ${values[i]}`);
    }
}

var foo = 1;
function bar() {
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);
}
bar();

var a = 1;
function b() {
    var a = 10;
    return;
    function a() { }
}
b();
console.log(a, "a");

class Animal {
    speak() {
        return this;
    }
    static eat() {
        return this;
    }
}

let obj = new Animal();
console.log(obj.speak()); // the Animal object
let speak = obj.speak;
console.log(speak); // undefined

console.log(Animal.eat()) // class Animal
let eat = Animal.eat;
console.log(eat()); // undefined

class Cat {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Lion extends Cat {
    constructor(name, state) {
        super(name)
        this.state = state;
    }
    speak() {
        super.speak();
        console.log(`${this.name} roars. ${this.state}`);
    }
}

let l = new Lion('Fuzzy', 'wild');
l.speak();

console.log(saludar); // "dice Hola"
var saludar = "dice Hola";
if (true) {
    let saludar = "dice Hola tambien";
    console.log(saludar); // "dice Hola tambien"
}