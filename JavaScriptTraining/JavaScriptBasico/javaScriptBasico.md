# JavaScript conceptos básicos

## Truthy and Falsy (abstract and strict equality)

Cuando se usa `==` para comparar valores JavaScript convierte cada valor a uan representacion en `string` antes de comparar.
Cuando se usa `===` la comparacioón que hace JavaScript es precisa entre los dos valores, no se convierte ningún valor, todo es tal como es.

JavaScript asigna uno de los 7 tipos de datos primitivos:
- `Undefined`
- `null`
- Boolean (`true` or `false`)
- Number (incluyendo `Infinity` y `NaN`)
- BigInt (Un valor entero mayor a 2^53)
- `string` (dato de texto)
- Symbol (un único e inmutable primitivo nuevo en ES6/2015)

Todo lo demás es un objeto, incluyendo a los array

Los siguientes valores son siempre falsos:

- `false`
- `0`
- `-0`
- `0n` (BigInt cero)
- ``` `` ```, `''`, `""` (un string vacío)
- `null`
- `undefined`
- `NaN`

### Recomendación al trabajar con valores falsos o verdaderos
1. Evita las comparaciones directas
```JavaScript
// En lugar de
if(x == false){}
// comprueba si x es false, 0, '', o []

// usa
if(!x){}
// comprueba si x es false, 0, '', NaN, null o undefined
```

## Modo estricto 'strict mode'

> **Nota:** Algunas veces se puede ver que al mode no estricto predeterminado se le llama _sloppy mode_.

El modo estricto de ECMAScript5 es una forma de elegir una variante restringida de JavaScript. El modo estricto no es sólo un subconjunto: intencionalemte tiene diferencias semánticas del código normal.

> **Nota:** los navegadores que no soportan el modo estricto ejecutarán el código con un comportamiento diferente a los que sí lo soportan, por lo tanto es recomendable siempre hacer pruebas de de las características más relevantes del modo estricto.

El modo estricto y no estricto pueden coexistir.

El modo estricto hace varios cambios a la semántica normal de JS:
1. Elimina algunos errores silenciosos de JS cambiandolos por `throw errors`.
2. Arregla algunos errores que hacen dificil para los motores de JS realizar optimizaciones. Algunas veces el código en modo estricto puede correr más rápido que un código idéntico pero no estricto.
3. Prohíbe cierta sintaxis que probablemente sea definida en futuras versiones de ECMAScript.

### Invocar el modo estricto
El modo estricto se aplica a un script completo o a funciones individuales. No se aplica a bloques entre corchetes {}; intentar aplicarlo en tales contextos no hace nada.

#### Modo estricto para scripts
Para invocar el modo estricto en todo un script, se escribe exactamente `"use strict"` antes que cualquier otra expresión.

```JavaScript
// Sintaxis del modo estricto para todo el script
'use strict';
var v = "¡Hola! ¡Estoy en modo estricto para script!";

```

no es posible concatenar ciegamente scripts conflictivos entre sí. El problema es mezclar scripts en modo estricto con scripts en modo no estricto.

#### Modo estricto para funciones
 para invocar el modo estricto para una función, escribe exactamente "use strict";  en el cuerpo de la función antes de cualquier otra expresión.

```JavaScript
function strict() {
  // Sintaxis del modo estricto a nivel de función
  'use strict';
  function nested() { return "¡Y yo también!"; }
  return "¡Hola!  ¡Soy una función en modo estricto!  " + nested();
}
function notStrict() { return "Yo no soy estricto."; }

```

#### Modo estricto para módulos
ECMAScript 2015 introdujo módulos y por tanto una tercera manera de entrar en el modo estricto. Todo el contenido de los módulos de JavaScript se encuentra automáticamente en modo estricto, sin necesidad de una declaración para iniciarlo.

### Cambios en modo estricto
El modo estricto cambia la sintaxis y el comportamiento en tiempo de ejecución. Los cambios generalmente caen dentro de estas categorías, cambios que:
1. Convierten equivocaciones en errores
2. Simplifican cómo se calcula el nombre de una variable particular
3. Simplifican  el uso de `eval` y `arguments`
4. hacen más facil escribir JS "seguro"
5. Anticipan la evolución futura de ECMAScript

#### Convertir equivocaciones en errores
El modo estricto trata las equivocaciones como errores, para que se puedan descubrir y subsanar inmediatamente.

En **primer lugar**, el modo estricto hace imposible crear variables globales por accidente.
```JavaScript
'use strict';
                       // Asumiendo que exista una variable global llamada mistypedVariable
mistypeVariable = 17;  // esta línea lanza un ReferenceError debido a
                       // una errata en el nombre de la variable
```
En **segundo lugar**, el modo estricto lanza una excepción en asignaciones que de otro modo fallarían silenciosamente.
```JavaScript
'use strict';

// Asignación a una no-escritura global
var undefined = 5; // lanza un TypeError
var Infinity = 5; // lanza un TypeError

// Asignación a una propiedad de no-escritura
var obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // lanza un TypeError

// Asignación a una propiedad de tipo getter
var obj2 = { get x() { return 17; } };
obj2.x = 5; // lanza un TypeError

// Asignación a una nueva propiedad en un objeto no extensible
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // lanza un TypeError
```
En **tercer lugar**, el modo estricto lanza una excepción al intentar eliminar propiedades no eliminables 
```JavaScript
'use strict';
delete Object.prototype; // lanza un TypeError
```
En **cuarto lugar**, la versión de modo estricto anterior a Gecko 34 requiere que todas las propiedades nombradas en un objeto sean únicas. Duplicar nombres de propiedades es un error de sintaxis en modo estricto.
```JavaScript
'use strict';
var o = { p: 1, p: 2 }; // !!! error de sintaxis
```
En **quinto lugar**, el modo estricto requiere que los nombres de los parámetros de una función sean únicos.  en modo estricto, duplicar nombres de argumentos es un error de sintaxis:
```JavaScript
function sum(a, a, c) { // !!! error de sintaxis
  'use strict';
  return a + a + c; // incorrecto si este código se ejecutó
}
```
En sexto lugar, en modo estricto ECMAScript 5 se prohíbe la notación octal. La notación octal no es parte de ECMAScript 5, pero está soportada en todos los navegadores. Una sintaxis de cero a la izquierda para los octales rara vez es útil y se puede usar por error, por lo que el modo estricto lo convierte en un error de sintaxis:
```JavaScript
'use strict';
var sum = 015 + // !!! error de sintaxis
          197 +
          142;

var sumWithOctal = 0o10 + 8;
console.log(sumWithOctal); // 16
```
**Séptimo Lugar**, el modo estricto en ECMAScript 2015 prohíbe establecer propiedades en valores primitivos. La sintaxis octal rara vez es útil y se puede usar equivocadamente, de modo que en modo estricto, utilizar notación octal lanza un TypeError:
```JavaScript
(function() {
'use strict';

false.true = '';         // TypeError
(14).sailing = 'home';   // TypeError
'with'.you = 'far away'; // TypeError

})();
```

#### Simplificación en el uso de variables
El modo estricto simplifica el modo en que el nombre de una variable es asignado a un variable particular en el código. Muchas optimizaciones del compilador se basan en la habilidad para decir el lugar específico en que una variable está almacenada, lo cual es crítico para una optimización completa del código JavaScript.

**Primero**, el modo estricto prohíbe el uso de with. El problema con with es que cualquier nombre dentro del bloque pude ser asignado a una propiedad del objecto pasado como argumento, o a una variable en su ámbito circundante (o incluso global), en tiempo de ejecución:
```JavaScript
'use strict';
var x = 17;
with (obj) { // !!! error de sintaxis
  // Si este no estuviera un modo estricto, ¿sería var x?, o
  // ¿sería obj.x en su lugar?  Es imposible en general
  // decirlo sin ejecutar el código, por lo que el nombre no
  // se puede optimizar.
  x;
}
```
**Segundo**, el uso de eval en modo estricto no introduce nuevas variables en el ámbito circundante. En código normal, `eval("var x;")` introduce una variable `x` dentro de la función circundante o el ámbito global. En modo estricto, `eval` crea variables solo para el código que se está evaluando, por lo que `eval` no puede afectar si un nombre se refiere a una variable externa o a alguna variable local:
```JavaScript
var x = 17;
var evalX = eval("'use strict'; var x = 42; x");
console.assert(x === 17);
console.assert(evalX === 42);
```
**Tercero**, el modo estricto prohíbe eliminar nombres planos. De este modo, delete name produce un error de sintaxis.
```JavaScript
'use strict';

var x;
delete x; // !!! error de sintaxis

eval("var y; delete y;"); // !!! error de sintaxis
```

#### Haciendo eval y arguments más simples
El modo estricto hace que el uso de arguments y eval sea más intuitivo.
El modo estricto ofrece un gran paso al tratar a `eval` y a `arguments` como palabras clave
**Primero**, las palabras eval y arguments no se pueden ligar o asignar en la sintaxis del lenguaje.
```JavaScript
'use strict';
eval = 17;
arguments++;
++eval;
var obj = { set p(arguments) { } };
var eval;
try { } catch (arguments) { }
function x(eval) { }
function arguments() { }
var y = function eval() { };
var f = new Function("arguments", "'use strict'; return 17;");
```
**Segundo**, el modo estricto no permite usar alias en elementos del objecto `arguments` creados dentro de la función.
```JavaScript
function f(a) {
  'use strict';
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);
```
**Tercero**, arguments.callee no está soportado.
```JavaScript
'use strict';
var f = function() { return arguments.callee; };
f(); // lanza un TypeError
```

## Clases (Classes)
Las clases son una plantilla para la creacción de objetos. Son una mejora sintáctica sobre la herencia basada en prototipos de JS. Las clases en JS proveen una sintaxis mucho más clara y simple para crear objetos y manejar la herencia.

### Definiendo las clases
Las clases son funciones especiales, como las funciones expresivas y declarativas, la sintaxis de una clase tiene dos componentes:
- clases declarativas
- clases expresivas 

#### Clases declarativas
Para declarar una clase de usa la palabra reservada `class` y el nombre de la clase:
```JavaScript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
##### Hoisting
Una importante diferencia entre las funciones y las clases declarativas es que mientras las funciones declarativas pueden ser llamadas antes de ser definidas, las clases declarativas deben estar definidas antes de pueden ser instanciadas.

#### Clases expresivas
Estas clases pueden ser nombradas o anónimas.
```JavaScript
// Anonima
let Rectangulo = class {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
};

console.log(Rectangulo.name);
// output: "Rectangulo"

// Nombrada
let Rectangulo = class Rectangulo2 {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
};
console.log(Rectangulo.name);
// output: "Rectangulo2"
```
### Class body and method definitions
El cuerpo de una clase es la parte que se encuentra dentro de las llaves `{}`. Aquí es donde se definen los miembros de la clase, como los métodos o el constuctror.

#### Strict mode
El cuerpo de una clase es ejecutado en modo estricto.

#### Constructor
El método constructor es un método especial para crear e inicializar un objeto construido usando `class`. Solo puedo haber un método llamado "constructor" en una clase.
Un constructor puede usar la palabra reservada `super` para llamar al constructor para llamar al constructor de la super clase.

#### Bloques de inicialización estaticos (demo)
Son una característica especial de una `class` que permite inicializar de una manera más flexible las propiedades estaticas.
Los bloques estaticos permiten a las declaraciones ser evaluadas durante su inicializacion, lo cual permite inicializaciones que incluyan `try...catch` o asignar multiples campos de un único valor.

#### Métodos prototipo
```JavaScript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

#### Métodos generadores
```JavaScript
class Polygon {
  constructor(...sides) {
    this.sides = sides;
  }
  // Method
  *getSides() {
    for(const side of this.sides){
      yield side;
    }
  }
}

const pentagon = new Polygon(1,2,3,4,5);

console.log([...pentagon.getSides()]); // [1,2,3,4,5]
```
#### Propiedades y métodos estaticos
La palabra reservada `static` define un método o propiedad estatica de una clase. Los miembros estaticos son llamados sin intanciar sus clases y no pueden ser llamados a través de una instancia de clase. Los métodos estaticos a ménudo son usados para crear _utility functions_ para una aplicación, y las propiedades estaticas a ménudo son usadas para caches, configuraciones, u cualquier otro dato que no necesite ser replicado en las instancias.
```JavaScript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance;    // undefined
p2.displayName; // undefined
p2.distance;    // undefined

console.log(Point.displayName);      // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755
```
#### Propiedades de instancia
Las propiedades de instancia deben ser definidad dentro de método de clase:
```JavaScript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
### Declaraciones de campo
- Declaraciones de campo publicas
Con JS la sintax de declaracion de campo, el ejemplo anterios puede ser reescrito como:
```JavaScript
class Rectangle {
  height = 0;
  width;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
    No se necesita usar `let`, `const`, o `var`.
- Declaraciones de campo privadas
usando declaraciones privadas, la definición se puede reescribir como:
```JavaScript
class Rectangle {
  #height = 0;
  #width;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}
```

### Subclases con `extends`
La palabra reservada `extends` es usada in la declaración de clases para crear una clase como hija de otra clase:
```JavaScript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

### Llamadas a Super clases con `super`
La palabra reservada `super` es usada para llamar métodos correspondientes a la super clase. 
```JavaScript
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(`${this.name} roars.`);
  }
}

let l = new Lion('Fuzzy');
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.
```

## var, let y const
### var
Antes de ES6 las declaraciones `var` eran las que mandaban.
El ámbito (scope), significa esencialmente dónde esta disponible esa variable para su uso. Las declaraciones `var` tienen un ámbito global o un ámbito de función o local.
Si `var` es declarado fuera de una función este estará disponible para su uso en todo el bloque de código o plantilla declarado. Si por el contrario `var` esta definido dentro de una función, este solo estará disponible para ser usado dentro de la función.
```JavaScript
    var tester = "hey, hola";
    
    function nuevaFuncion() {
        var hola = "hola";
    }
    console.log(hola); // error: hola is not defined
```
Las variable declaradas con var pueden volver a declararse y modificarse.
```JavaScript
    var saludar = "hey, hola";
    var saludar = "dice Hola tambien";
    saludar = "dice Hola tambien";
```
Hoisting es un mecanismo de JS en el que las variables y declaraciones de funciones se mueven a la parte superior de su ámbito (scope) antes de la ejecución del código.

El Hoisting de var si escribimos las siguientes lineas:
```JavaScript
    console.log (saludar);
    var saludar = "dice hola"
```
Se interpretaría de la siguiente manera:
```JavaScript
    var saludar;
    console.log(saludar); // saludar is undefined
    saludar = "dice hola"
```
Esto quiere decir que las variables definidas con `var` se elevan a la parte superior de su ámbito (scope) y se inicializan con un valor de `undefined`
### let
`let` es una mejora de las declaraciones con `var`. let tienen un ámbito de bloque.
> **Nota** un bloque es un trozo de código delimitado por `{ }`. Una variable declarada con `let` sólo está disponible para su uso dentro de ese bloque.
```JavaScript
   let saludar = "dice Hola";
   let tiempos = 4;

   if (tiempos > 3) {
        let hola = "dice Hola tambien";
        console.log(hola);// "dice Hola tambien"
    }
   console.log(hola) // hola is not defined
```
`let` puede modificarse pero no volverse a declarar dentro de su ámbito. Sin embargo si la misma variable se define en diferentes ámbitos, no habrá ningún error.
```JavaScript
    let saludar = "dice Hola";
    if (true) {
        let saludar = "dice Hola tambien";
        console.log(saludar); // "dice Hola tambien"
    }
    console.log(saludar); // "dice Hola"
```
las declaraciones `let` se elevan a la parte superior de su ámbito. Pero a diferencia de `var` estás no se inicializan con `undefined`.

### const
Las variables declaradas con `const` mantienen sus valores constantes. 
Al igual que con let las declaraciones const tienen un ámbito de bloque.
`const` no se puede modificar ni volver a declararse, pero si un objeto es declarado con `const` este no podrá actualizarse, pero las propiedades del objeto sí pueden actualizarse.
```JavaScript
    const saludar = {
        mensaje: "dice Hola",
        tiempos: 4
    }
```
Esto no puede hacerse:
```JavaScript
    saludar = {
        palabras: "Hola",
        numero: "cinco"
    } // error:  Assignment to constant variable.
```
Esto sí:
```JavaScript
    saludar.mensaje = "dice Hola tambien";
```
Al igual que `let`, las declaraciones `const` se elevan a la parte superior pero no se inicializan. 

## Plantillas literales (Template literals)
Las _Template literals_ son cadenas literales que habilitan el uso de expresiones incrustadas. Con ellas, es posible utilizar cadanas de caracteres de mas de una línea, y funcionalidades de intrepolación de cadenas de caracteres.
### Sintaxis
```JavaScript
    `texto de cadena de caracteres`

    `línea 1 de la cadena de caracteres
    línea 2 de la cadena de caracteres`

    `texto de cadena de caracteres ${expresión} texto adicional`

    etiqueta`texto de cadena de caracteres ${expresión} texto adicional`
```
### Descripción
- Son delimitadas usando ` `` ` tilde invertida.
- Pueden contener marcadores, identificados por el signo de dólar y envueltos en llaves `${expresión}`
- Si hay una expresión antes de la plantillaliteral, se le conoce como plantilla etiquetada.

## Delegación de eventos en JavaScript
La delegación de eventos es una técnica simple en la cual se añade un manejador de eventos simple a un elemento padre para evitar tener que añadir manejadores de eventos a multiples elementos hijos.



# Evaluación 
- ¿Qué diferencia hay entre == y ===? 
> El operador _loose equality_ (==) permite comparar valores convirtiendolos a un typo de valor común primero y después haciendo la comprobación si son iguales. El operador _strict equality_ (===) permite comparar los valores combrobando si son igulaes tal y con son.

- ¿Qué es el “strict mode”?
> Es una variante restringida de JavaScript la cual hace cambios en la sintaxis y en los tiempos de ejecución, conviertiendo equivocaciones en errores, corrigiendo errores que hacen dificil que los motores de JS realicen optimizaciones. 

- ¿Qué son exactamente las clases en JavaScript? ¿Cambian el modelo de orientación a objetos que ya existía antes de ES2015?
> Son una plantilla para la creación de objetos, Son una mejora sintáctica sobre la herencia basada en prototipos de JS. Las clases en JS proveen una sintaxis mucho más clara y simple para crear objetos y manejar la herencia.
Y no cambia el modelo solo es una mejora en la sintaxis al definir objetos y manejar su herencia.

- ¿Qué diferencia hay entre una declaración de función y una de clase?
> Las funciones declarativas pueden ser llamadas antes de ser definidad en lo que se conoce como hoisting, mientras que las clases declarativas deben primero que ser definidas antes de poder hacer una instancia de la clase.

- ¿En qué modo se ejecuta el contenido de una clase?
> En modo estricto

- ¿Qué tipos de ámbito (scope) tiene JavaScript? ¿Cómo se crea uno nuevo?
> Existen dos ámbitos en JS el ámbito global y el ámbito local, un ámbito global es aquel que dentro de un script las declaraciones quedan fuera de una función o un bloque de código, mientras que un ámbito local es cuando las declaraciones quedan dentro del bloque de código o función.

- ¿Qué es y cómo funciona el hoisting? 
> Hoisting es el comportamiento por defecto de JS en el que la declaración de variables y funciones se mueve automaticamente al principio del scope

- ¿Qué es una “temporal dead zone”? 
> Es un periodo de tiempo durante el cual no se puede acceder a las declaraciones hechas con `let` y `const`.
> La zona temporal muerta empieza cuando la ejecución del código entra en el bloque que contienen declaraciones `let` y `const` y continua hasta que las declaraciones and sido ejecutadas.

- ¿Qué diferencia hay entre var y let? 
> `var` tiene un scope global o local dependiendo de donde es definido, este puede ser actualizado y declarado de nuevo, el hoisting de var hace que la variable se declare e inicialice en el inicio de su scope. `let` tienen un scope de bloque cuando es definido dentro de `{ }` se mantiene su scope dentro de las llaves, este puede ser actualizado pero no se puede volver a declarar, en cuanto al hoisting de `let` este es declaro en el top de su scope pero no es inicializado.

- ¿Cuándo deberías usar const? 
> Cuando se requiere declarar una variable o función que no podrá ser actualizada o nuevamente declarada.

- Explica cómo funciona la delegación de eventos 
> La delegación de eventos es una técnica simple en la cual se añade un manejador de eventos simple a un elemento padre para evitar tener que añadir manejadores de eventos a multiples elementos hijos.


- Describe con detalle las 3 fases por las que pasa un evento en el navegador.
> Cuando un evento es desencadenado en una elemento que tiene como elemento padre, los navegadores modernos ejecutan 3 diferentes fases: captura, objetivo y burbujeo
> - fase de captura: el navegador comprueba si el elemento padre principal tienen un manejador de eventos registrado en el, y lo ejecuta si sí. Después se mueve a un elemento hijo y hace la misma comprobación hasta que llega al elemento padre directo del elemento que fue clickeado.
> - Fase de objetivo: el navegador comprueba si la propiedad `target` tiene un manejador de eventos para el evento `click` registrado en este, y lo ejecuta si sí.
> - Fase de burbujeo: El navegador comprueba si el padre directo del elemento clickeado tienen un manejador de eventos `click` registrado en este, y lo corre si sí. Después se mueve al siguiente elemento ancestro y realiza el mismo proceso, despues al siguiente hasta alcanzar el elemento `<html>`.
