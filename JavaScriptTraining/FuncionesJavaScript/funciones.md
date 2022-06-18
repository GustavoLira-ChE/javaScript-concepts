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



# Evaluación 
- Di 3 formas para que una función se llame a sí misma.
> 1. El nombre de la función.
> 2. arguments.callee
> 3. Una variable dentro del ámbito que se refiera a la función

- ¿Qué es una closure? ¿Para qué sirve? 
Es una función que fue definida dentro de otra y que tienen acceso a todas las variables y funciones que fueron definidas en la función que encapsula.

- ¿Cómo se crea una función con un número de parámetros variable? 
- ¿Qué es una arrow function? 
- ¿Qué son los “rest parameters”? 
- ¿Qué es una IIFE? ¿Qué utilidades tiene?  
- Asumiendo que estamos en “strict mode” ¿A qué apunta this en los siguientes casos? 
1. En el ámbito global de un navegador 
2. En un método definido dentro de un objeto 
3. En una función definida en el ámbito global 
4. Dentro de este listener hecho con la librería jQuery: $( ‘ but t on. j scl i ck’ ). on(‘ cl i ck’ , f unct i on(event ) { }); 
- ¿Podemos alterar el this de una función antes de llamarla? Si es así… ¿cómo? 
- ¿Qué es el currying? ¿Sirve solo para presumir o tiene alguna utilidad?