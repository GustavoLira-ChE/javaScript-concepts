# Functional programming
Programación funcional es una paradigma de programación que trata los cálculos como la evaluación de funciones matemáticas y evita cambios de estado y datos mutados.

Es importante entender que es una función de orden superior antes de empezar con programación funcional.
> Una función de orden superior puede tomar una función como un argumento o retornar una función como resultado. Recuerda que las funciones son valores.

La programación funcional hace que el código sea más reusable y gana versatilidad, así como hacer más fácil la lectura.
Un apropiado código funcional es caracterizado por la ausencia de efectos secundarios, significa que una función debería confiar solamente en sus argumentos como entradas y estos no deberían afectar su ambiente en ninguna forma.
## map methods
El método `map()` crea un nuevo arreglo con el resultado de llamar una función para cada elemento del array llamado.
ejemplo
```JavaScript
const numbers = [2, 4, 8 , 10];
const halver = numbers.map(x => x/2);
// halves es [1, 2, 4, 5]
``` 

## filter method 
El método `filter()` crea un nuevo array con los elementos que pasen un test implementado por la función provista.
```JavaScript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
const longWords = words.filter(word => word.length > 6);
// longWords is ["exuberant", "destruction", "present"]
``` 

## Reduce method
El método `reduce()` aplica una función contra un acumulador y cada elemento en el array (de derecha a izquierda) para reducirlo en un único valor.
```JavaScript
const reducer = (sum, value) => sum + value;
const total = [0, 1, 2, 3].reduce(reducer, 1);
// total is 7
```

# Reactive programming
La programación reactiva es programación con flujo de datos asincronicos.
Los tipicos eventos de click son realmente un flujo de evento asincrono, en el cual se puede observar y hacer algún efecto secundario. Se puede ser capaz de crear flujo de datos de cualquier cosa, no solo de eventos click o hover. 
Un flujo puede ser usado como la entrada de otro. Se puede filtrar un flujo para obtener uno que tenga únicamewnte aquellos eventos en los que se tiene interés.
Un flujo es una secuencia de eventos continuos ordenados en el tiempo. Estos pueden emitir 3 diferentes cosas: un valor, un error, o una señal de completado. 
Estos eventos emitidos se capturan solo asincronicamente, definiendo una función se ejecutará cuando un valor es emitido, otra función cuando un error es emitido, y otra función cuando "_completed_" es emitido. El "_listening_" del stream (flujo) es llamado **_subscribing_**. La función que definimos son observadores. El flujo es el sujeto siendo observado. Este es presisamente el **_Observer Design Pattern_**.
## Request and response
Todo puede ser un _stream_ (flujo). Es el mantra de Rx. Como ejemplo para crear un _stream_ para cargar 3 datos de cuentas de una API, simplemente es necesario (1) hacer una petición, (2) obtener una respuesta, (3) desplegar la respuesta.
Para empezar es necesario hacer solamente una petición, si es modelado como un flujo de datos, será un flujo con únicamente un valor emitido.
Cuando sea que una petición suceda, nos dice dos cosas: "Cuándo" la petición debería ser ejecutada es cuando el evento es emitido. Y "Qué" debería ser pedido es el valor emitido.
El término oficial para _stream_ es "Observable", por el hecho de que puede ser observado. 
```JavaScript
var requestStream = Rx.Observable.just("https://api.github.com/users");
``` 
Observable es una promesa. En Rx se puede fácilmente convertir una promesa en un observable haciendo `var stream = Rx.Observable.fromPromise(promise)`. La única diferencia es que los Observables no son Promesas/A+ obedientes, pero conceptualmente no hay choque. Una promesa es simplemente un observable con un simple valor emitido, Rx strems van más allá de las promesas permitiendo nuchos retornos de valores.

## Immutability in JavaScript
JavaScript no tiene listas inmutables así que se necesita un libreria externa por ahora (Mori o immutable.js).

# Evaluación
- ¿Qué es la programación funcional?
> La programación funcional es un paradigma de programacion que hace que los cálculos que se realizan en un programa sean parecidos a las funciones matemáticas evitando cambios de estado y mutaciones.
- ¿Qué ventajas aporta en JavaScript el estilo funcional?
> hacer el código más leible, reutilisable y flexible, así como garantizar la ausensia de efectos secundario, las funciones toman los argumentos de entrada y retornan su resultado sin afectar a su ámbiente.
- ¿Qué es una función de orden superior? 
> Son funciones que pueden tomar otras funciones como argumentos o retornar funciones como resultados.
- Describe la utilidad de los métodos map, reduce y filter llamados sobre un array. 
> Estos métodos permiten realizar operaciones sobre los elementos de un _array_ sin mutarlos, ya que generan un array diferente como resultado de las operaciones o elementos.
- ¿Qué es un stream?
- > Es una secuencia de eventos continuos ordenados en el tiempo, que pueden dar como resultado 3 cosas: un valor, un error o un "_completed_"
- ¿Qué es la programación reactiva? 
> La programación reactiva es programación con flujo de datos asincronicos.
Los tipicos eventos de click son realmente un flujo de evento asincrono, en el cual se puede observar y hacer algún efecto secundario. Se puede ser capaz de crear flujo de datos de cualquier cosa, no solo de eventos click o hover. 
- ¿Qué es un Observable? 
> Un observable es un stream por el hecho de que puede ser observado.
- ¿Qué diferencia hay entre un Observable y una Promesa? 
> El observable puede emitir muchos valores. Mientras que la promesa emite un simple valor.
- ¿Qué es la inmutabilidad? ¿Existe nativamente en JavaScript? 
> En programación inmutabilidad es la capacidad de no poder ser alterado o cambiado. En JavaScript un valor inmutable es aquel que una vex creado no puede ser cambiado. JavaScript no tienen una lista o plano inmutable por lo que es necesario recurrir a librerias externas como **Mori** o **immutable.js**.
- ¿Qué ventajas aporta la inmutabilidad? 
> La inmutabilidad de los datos en muchos casos incrementa el rendimiento general de las aplicaciones.