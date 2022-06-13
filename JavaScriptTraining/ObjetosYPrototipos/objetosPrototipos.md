#  Objetos y prototipos 
----------------

# Objetos
Un objeto es una colección de datos relacionados y/o funcionalidad (que generalmente consta de algunas variables y funciones, que se denominan propiedades y métodos cuando están dentro de objetos)

Este es un objeto vacío:
``` JavaScript
var persona = {};
```
Este es un objeto con propiedades y métodos:
``` JavaScript
var persona = {
  nombre: ['Bob', 'Smith'],
  edad: 32,
  genero: 'masculino',
  intereses: ['música', 'esquí'],
  bio: function () {
    alert(this.nombre[0] + '' + this.nombre[1] + ' tiene ' + this.edad + ' años. Le gusta ' + this.intereses[0] + ' y ' + this.intereses[1] + '.');
  },
  saludo: function() {
    alert('Hola, Soy '+ this.nombre[0] + '. ');
  }
};
```

## Lenguaje basado en prototipos
JavaScript es a menudo descrito como un lenguaje basado en prototipos - para proporcionar mecanismos de herencia, los objetos pueden tener un objeto prototipo, el cual actúa como un objeto plantilla que hereda métodos y propiedades.

Un objeto prototipo del objeto puede tener a su vez otro objeto prototipo, el cual hereda métodos y propiedades, y así sucesivamente. Esto es conocido con frecuencia como la cadena de prototipos, y explica por qué objetos diferentes pueden tener disponibles propiedades y métodos definidos en otros objetos.

Las funciones constructoras son funciones que crean nuevos objetos. En estos se definen las propiedades y el comportamiento que pertenecerán a los nuevos objetos.

Ejemplo de función constructora:
```JavaScript
function Persona(nombre, apellido, edad, genero, intereses) {

  // definiendo de propiedades y métodos
  this.first = first;
  this.last = last;
//...
}

//Usar el constructor para crear nuevos objetos:
let person1 = new("John", "Due", 37, "male", ["soccer", "swimming"])
```

### Own properties
Las propiedades definidas dentro de la función constructora son denominadas propiedades propias, ya que cada instancia del constructor tendrá su propia copia de las propiedades definidas.

### Prototype properties
Debido a que existen algunas propiedades que siempre serán iguales para cada instancia del constructor, es mejor usar la propiedas `prototype` ya que las propiedades definidas dentro de prototype son compartidas para todas las instancias del constructor.

```JavaScript
function Dog(name){
    this.name = name;
}
Dog.prototype = {
    constructor: Dog,
    numleg: 2,
    eat: function(){
        console.log("chup chuup!")
    }
    describe: function(){
        console.log(`Hi my name is ${this.name}`)
    }
};
```
## JSON (JavaScript Object Notation)
Es un formato basado en texto estándar para representar estructuras de datos siguiendo la sintaxis de objetos de JavaScript. Usado generalmente para transmitir datos en aplicaciones web.
Debe ser convertido a un objeto nativo de JavaScript cuando se requiera acceder a sus datos, mediante el objeto global `JSON` que tiene los métodos disponibles para convetir entre JSON y objeto literal de JavaScript.

> Nota: Convertir una cadena a un objeto nativo se denomina parsing, mientras que convertir un objeto nativo a una cadena para que pueda ser transferido a través de la red se denomina stringification.

-------------------------------
# Evaluación

- ¿Dónde se definen las propiedades y métodos heredables de un objeto?
    > los métodos y propiedades son definidos en la propiedad `prototype`, que reside en la función constructora del objeto, no en la instancia misma del objeto.

- ¿Qué es la cadena de prototipos?
    > Es el mecanismo con el cual un objeto prototipo (OP1) puede tener un objeto prototipo del que le fueron heredados propiedades y métodos (OP0) y que a su vez el OP1 puede servir como plantilla para crear un nuevo objeto prototipo (OP3). 

- ¿Qué es y para qué sirve la propiedad constructor?
    > Es un valor que se encuentra dentro de la propiedad `prototype` dentro de una función constructora y su función es apuntar a la función constructora original.

- Según su posición en el objeto, ¿qué tipos de propiedades/métodos hay y en qué se diferencian?
    > Propiedades y métodos propios definidas dentro de la función constructoras, esto genera que cada instancia del constructor tenga su propia copia de las propiedades o métodos. Y las propiedades/métodos prototipados que son definidas dentro de la propiedad `propotype` esto hace que estas propiedades/métodos sean compartidos por todas las intancias y ayuda a heredarlos.
- ¿Cómo se crea un objeto que herede propiedades y métodos de otro en JavaScript? 
    > Si se esta usando función constructura es necesario asignar al `prototype` del nuevo objeto, el valor prototype del objeto que herada usando el método `create()` de `Object` Ejemplo:
    ```JavaScript
    ChildObject.prototype = Object.create(ParentObject.prototype)
    ```
    > Si se estan usando clases se puede hacer mediante `extends` como se muestra en el siguiente ejemplo:
    ```JavaScript
    class ChildObject extends ParentObject{
        constructor(){
            super()
        }
    }
    ```

- ¿Qué es JSON? ¿En qué se diferencia su sintaxis a la de un objeto JavaScript? 
>  - Todos los valores de tipo string deben ir entre comillas dobles, las comillas simples no están permitidas.
> - Del mismo modo, todas las claves (los nombres de los atributos) deben ir entre comillas dobles.
> - No admite ningún tipo de comentarios
> - Los valores numéricos han de estar en base decimal, no admite ceros a la izquierda.
> - No se admiten valores undefined.

- ¿Cómo convertimos la respuesta JSON de una llamada XHR a JavaScript? ¿Y JavaScript a JSON para enviar al servidor?
> `JSON.parse(<texto>)` nos devuelve un objeto creado a partir de un string que esté en formato JSON.

> `JSON.stringify(obj)` nos devuelve un string en formato JSON con los atributos del objeto obj. Si obj tiene atributos que sean funciones, serán ignorados.