# Funciones
Las funciones son uno de los bloques de contrucción fundamentales en JavaScript. Una función en JavaScript es similar a un procedimiento - una serie de sentencias que realizan una tarea o calculan un valor, pueden tomar algunos datos de entrada y devolver datos de salida.

## Definiendo funciones
### Funciones declarativas
La definición de una función consiste de la keyword `function` seguido de:
- El nombre de la función
- Una lista de parámetros de la función, encerrados entre parentesis `( parameter )`.
- La sentencia de JS que define la función, encerrado entre llaver `{ statement }`

Por ejemplo:
```JavaScript
function square(number){
  return number * number
}
```
### Funciones expresivas
las funciones pueden también ser creadas como una función expresiva.
Como tal las funciones pueden ser anonimas:
```JavaScript
const square = function(number){
    return number * number
}
var x = square(4); //return 16
```
Sin embargo, se puede proveer de un nombre a una función expresiva. El proveer un nombre permite a la función hacer referencia a si misma, y hace más facil identificar la función al debuggear.
```JavaScript
const factorial = function fac(n){
    return n < 2 ? 1 : n * fac(n-1) 
}
console.log(factorial(3));
```
las funciones expresivas son convenientes al pasar una función como argumento de otra función.
Una función puede ser definida basado en una condición:
```JavaScript
var myFunc;
if(num === 0){
    myFunc = function (theObject) {
        theObject.make = "Toyota";
    }
}
```
## LLamando funciones
Definir una función no es ejecutarla.
Al llamar la función de hechoraliza la acción especifica con los parámetros indicados. Por ejemplo al definir la función `square`, se puede llamar de la siguiente manera:
```JavaScript
square(5)
```
Las funciones debe estar en el mismo ámbito (scope) donde son llamadas, pero las funciones declarativas pueden ser _hoisted_
```JavaScript
console.log(square(5));
/* ... */
function square(n) { return n * n }
```
El ámbito de una función es la función en la cual fue declarada (o el programa entero, si fue declarada en el nivel más alto).
Los argumentos de una función no están limitados a una cadena de texto o números. Se pueden pasar objetos enteros a una función.
Una función se puede llamar a si misma como en el caso de la función `factorial`:
```JavaScript
function factorial(n) {
  if ((n === 0) || (n === 1))
    return 1;
  else
    return (n * factorial(n - 1));
}
```
## Ámbito de una función (scope)
Una función definida en un ámbito global puede acceder a todas las variables definidas en el ámbito global. Una función definida dentro de otra función solo puede accedar a todas las variables definidad dentro de la función padre.

## Ámbito y conjunto de funciones

### Recursividad
Una función puede referirse a si misma y llamarse. Hay 3 maneras para que una función haga referencia a si misma:
1. El nombre de la función.
2. arguments.callee
3. Una variable dentro del ámbito que se refiera a la función
```JavaScript
var foo = function bar(){
    //statments go here
}
```
Dentro del cuerpo de la función, lo siguiente es equivalente:
1. `bar()`
2. `arguments.callee()`
3. `foo()`

Una función que se llama a si misma es llamada función recursiva.

### Funciones anidadas y cierres
Se pueden anidar funciones dentro de otras funciones. La función anidada (inner) es privada para su función contenedora (outer).
Un cierre es una expresión (generalmente una función) que puede tener variables libres junto con un entorno que une esas variables.
Ya que una función anidada es un cierre, esto significa que una función anidada puede heredar los argumentos y las variables de su función contenedora.
El siguiente ejemplo muestra funciones anidadas:
```JavaScript
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
a = addSquares(2, 3); // returns 13
b = addSquares(3, 4); // returns 25
c = addSquares(4, 5); // returns 41
```
### Preservación de variables
Viendo el siguiente ejemplo:
```JavaScript
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3); // Piensa en ello como: dame una función que agregue 3 a lo que sea que le des
                        // eso
result = fn_inside(5); // devuelve 8

result1 = outside(3)(5); // devuelve 8
```
Un cierre debe conservar los argumentos y variables en todos los ámbitos a los que hace referencia. Dado que cada llamada proporciona argumentos potencialmente diferentes, se crea un nuevo cierre para cada llamada de `outside`. La memoria se puede liberar solo cuando `inside` devuelto ya no es accesible.
### Funciones multianidadas
Las funciones se pueden anidar de forma múltiple.
Por lo tanto, los cierres puedn contener múltiples ámbitos; contienen de forma recursiva el ámbito de las funciones que la contienen. Esto se llama **Encadenamiento de alcance**.
Contemplando el siguiente ejemplo:
```JavaScript
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1); // registra 6 (1 + 2 + 3)
```
En este ejemplo, `C` accede a `y` de `B` y a `x` de `A`.
### Confilctos de nombre
Cuando dos argumentos o variables en el ámbito de un cierre tienen el mismo nombre, hay un conflicto de nombres. Tienen más prioridad el ámbito anidado.
## Usar el objeto `arguments`
El `arguments` de una función se mantiene en un objeto similar a un arreglo. Dentro de una función puedes abordar los argumentos que se le pasan de la siguiente manera:
```JavaScript
arguments[i]
``` 
donde i es el número ordinal del argumento empezando en 0.
Esto puede ser útil si no se sabe de antemano cuantos argumentos se pasarán a la función.
> **Nota**: La variable `arguments` es similar a un arreglo en el sentido que tiene un índice numerado y una propiedad `length`. Sin embargo, no posee todos los métodos de manipulación de un arreglo.
## Parámetros de función
En ECMAScript 2015, hay dos nuevos tipos de parámetros:
1. Parámetros predeterminador
Por default los parámetros de una función son `undefined` pero en algunas ocaciones resultará útil establecer un valor predeterminador deferente.
```JavaScript
function multiply(a, b = 1) {
  return a * b;
}

multiply(5); // 5
```

2. Parámetos rest
La síntaxis de parámetro rest permite representar un número indefinido de argumentos como un arreglo.
```JavaScript
function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]
```
## Funciones Flecha
Una expresión de función flecha, tiene una sintaxis más corta en comparación con las expresiones de función y no tienen su propio `this`, `arguments`, `super` o `new.target`. Las funciones fleja siempre son anónimas.
Dos factores imfluyeron en la introducción de las funciones flecha: funciones más cortas y no vinculantes de `this`.

## Immediately-Invoked Function Expression

Un patrón común en JS es ejecutar una función tan pronto como sea declarada:
```JavaScript
(function(){
    console.log("Hola mundo");
})()
```
Esta es una función anónima
La función no tienen nombre y no está guardada en ninguna variable, tiene dos parentesis al final de la función causando que sea ejecutada inmediatamente.
Las IIFE pueden ser usadas para bloquear datos, las variables declaradas dentro de una función IIFE no pueden ser usadas afuera.

# Understand `this` 
`this` keyword es usado como una abreviatura, una referencia, se refiere a un objeto, que es el sujeto en el contexto.
```JavaScript
var person = {
    firstName: "Penelope",
    lastName: "Barrymore",
    fullName: function () {
        ​// Notice we use "this" just as we used "he" in the example sentence earlier?:
        console.log(this.firstName + " " + this.lastName);
    ​// We could have also written this:​
        console.log(person.firstName + " " + person.lastName);
    }
}
```
El uso de `this` hace el código menos ambiguo, así como se usan los pronombres para referirse a una persona para hacer las oraciones más claras.
## JavaScript's `this` keyword Basics
Primero conocer que todas las funciones en JS tienen propiedades, justo como los objetos tienen propiedades. Y cuando una función se ejecuta, esta obtienen la propiedad `this`.
> **Nota**: Cuando usamos el modo estricto, `this` mantiene el valor `undefined` en funciones globales y en funciones anonimas que no están enlazadas a algún objeto.
`this` es usado dentro de una función y contiene el valor del objeto que invocó la función.

## El mayor logró con `this` keyword en JS
`this` no está asignado a un valor hasta que un objeto invoca la función donde `this` está definido.
## El uso de `this` en un ámbito global
Cuando el coódigo es ejecutado por el navegador, todas las variables globales y funciones, son definidas en el _window **object**_. Por lo tanto, cuando usamos `this` en una función global, este refiere a el objeto global _window_
## Cuando `this` es más incomprendido y se vuelve complicado
`this` es más incomprendido
- cuando compartimos un método que usa `this`
- cuando asignamos un método que usa `this` en una variable
- Cuando una función que usa `this` is pasada como un callback
- cuando `this` es usado dentro de un _closure_ (cierre)
### Arreglar `this` usado como un en un método pasado como una callback
Cuando ejecutamos un método en algun otro objeto diferente al objeto que inicialmente fue definido, `this` referirá al objeto que invocó el metodo donde `this` fue definido.
Para arreglar esto se puede usar el método _bind_
```JavaScript
otroObj.metodoOtroObj(objeto.metodo.bind(objeto))
```
### Arreglando `this` dentro de closure
Es importante tomar nota que los closure no pueden acceder a la variable `this` de la función contenedora usando la palabra `this` porque la variable `this` es accesible únicamente por la función en si misma, no por la función anidada.
`this` de una función anidada anónima no puede accedar al `this` de la función contenedora, asi que es enlazada el objeto global _window_, cuando el modo estricto no es usado.
Para arreglar esto, podemos asignar el valor de this a otra variable antes de entrar al método anónimo.
### Arreglar `this` cuando le método es asignado a una variable.
Al asignar un método a una variable, el `this` de ese método apuntará algúna variable que haga referencia al nombre que tienen `this` globalmente.
Podemos arreglar esto manteniendo `this` cuando el método es asignado a una variable usando el método `bind`
### Arreglar `this` cuando comparte métodos
Prestar métodos es una práctica común en el desarrollo con JS, al prestar un método de un objeto a otro `this` hará referencia al objeto en el cuál fue definido, por lo tanto, para arreglar esto es necesario usar el método `apply()`.

### JavaScript's Apply, call and Bind methods
`bind()` permite asignar facilmente cual objeto específico será enlazado a `this` cuando una función o método es invocado.
La necesidad de `bind` usualmente ocurre cuando se usa `this` en un método y se llama llama ese método desde otro método que recibe.
Bind permite compartir métodos, así como permite usar la aplicación de funciones parciales (function currying).

Los métodos `apply()` y `call()` son dos de los más usados in JS, permiten compartir funciones y configurar el valor de `this`en funciones invocadas. Además, el método `apply()` en particular permite ejecutar funciones con un arreglo de parámetros, tal que cada parámetro es pasado a la función individualmente cuando la función es ejecutada.

## Currying functions
_Currying_ es la forma de construir funciones que permitan aplicaciones parciales de los argumentos de una función. Lo que esto significa es que se puede pasar todos los argumentos que una función espera y tener un resultado, o pasar unos cuantos de los argumentos y tener una función como respuesta que esperará por el resto de los argumentos.
### Nuestro primer curry
```JavaScript
var greetCurried = function(greeting) {
  return function(name) {
    console.log(greeting + ", " + name);
  };
};
```
Este simple ajuste en la manera de escribir una función permite crear una nueva función para cuarlquier tipo de "saludo", y pasar a esa nueva función el nombre de la persona que queremos saludar.

# Evaluación 
- Di 3 formas para que una función se llame a sí misma.
> 1. El nombre de la función.
> 2. arguments.callee
> 3. Una variable dentro del ámbito que se refiera a la función

- ¿Qué es una closure? ¿Para qué sirve? 
> Es una función que fue definida dentro de otra y que tienen acceso a todas las variables y funciones que fueron definidas en la función que encapsula.
Un closure permite asociar algunos datos con una función que opera sobre esos datos. También se pueden emular métodos privados con closures

- ¿Cómo se crea una función con un número de parámetros variable?
> usando `arguments` se pueden pasar varios parámetros extras a una función y manejarlos pues cada parámetro extra tiene su propio índice.

> usando el parámetro rest se puede hacer esto, queda definido de la siguiente manera:
```JavaScript
function myFunc(ar1, ...agrs){
    console.log(ar1)
    for(let i = 0; i < agrs.length; i++){
        console.log(args[i])
    }
}
```

- ¿Qué es una arrow function?
> Una función de flecha es una alternativa compacta a la tradicional funcion expresada, pero es limitada y no puede ser usada en todas las situaciones:

>    1. No cuentan con su propio `this`, `arguments`, `super` enlazado y no deberian ser usadas como métodos.

>    2. No tienen acceso a la keyword `new.target`.

>    3. No están adecuadas para los métodos `call`, `apply`, y `bind`.

>    4. No pueden ser usadas como `constructors`.

>    5. No pueden usar `yield`, dentro de su cuerpo.


- ¿Qué son los “rest parameters”? 
> La sintaxis de parámetros rest permite a una función aceptar un número indefinido de argumentos como un array.
```JavaScript
function f(a, b, ...theArgs) {
  // ...
}
```
- ¿Qué es una IIFE? ¿Qué utilidades tiene? 
> Es un patrón de JS para ejecutar una función tan pronto como es declarada, sirve para protejer los datos, reducir el alcancé de la busqueda, era la manera de conseguir emular el encapsulamiento antes ES2015

- Asumiendo que estamos en “strict mode” ¿A qué apunta this en los siguientes casos? 
1. En el ámbito global de un navegador
> Undefined
2. En un método definido dentro de un objeto
>  Al objeto 
3. En una función definida en el ámbito global
> Al objeto global _window_ 
4. Dentro de este listener hecho con la librería jQuery: $(‘button.jsclick’).on(‘click’,function(event){ }); 
> undefined
- ¿Podemos alterar el this de una función antes de llamarla? Si es así… ¿cómo?
> Sí, usando los métodos bind, apply o call se pueden hacer modificaciones a la referencia de `this`

- ¿Qué es el currying? ¿Sirve solo para presumir o tiene alguna utilidad?
> es la transformación de una función que hace que `f(a,b,c)` se puede llamar como `f(a)(b)(c)`. JS implementa usualmente ambos llama la función como normalmente y retorna una función parcial si el número de argumentos pasados no es suficiente. Es usado en programación funcional para crear una función de orden mayor.