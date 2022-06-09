# Programación orientada a Objetos
Es un paradigma de programación que usa objetos y sus interacciones, para diseñar aplicaciones y programas informáticos. Está basado en varias técnicas, incluyendo herencia, abstracciones, polimorfismo y encapsulamiento
 ## Clase
 Actua como una platilla que define las propiedades, estados y comportamientos que son comunes para un número de objetos.
  
  ### Atributos
  Son características individuales que deferencian a un objeto de otro y determinan su apariencia, estado u otras cualidades. Los atributos se guardan en variables denominadas de instancia.
  
  ### Métodos
  Es un bloque de código que contiene una serie de instrucciones. Un programa hace que se ejecuten las instrucciones al llamar al método y especificando los argumentos del método necesarios.
 
 ## Objeto
 Son instancias de una clase. Es la unidad básica de un sistema. Un objeto es una entidad que tiene atributos, comportamiento e identidad.

 -------------

## Herencia (Inheritance)
Permite definir una clase en términos de otra clase (clase padre), la cual permite crear y mantener aplicaciones fácilmente.

## Polimorfirmo
Describe situaciones las cuales algo ocurre en varias diferentes formas. Polimorfirmo es a menudo expresado como una interfase con multiples funciones.

## Encapsulamiento
Es definido como el proceso de encerrar uno o mas elementos dentro de un paquete lógico o físico. En OOP previene el acceso a detalles de implementación u ocultamiento del estado, es decir, de los datos miembro de un objeto de manera que solo se pueda cambiar mediante las operaciones definidas para ese objeto.

## Abstracción
Una abstracción se enfoca en la visión externa de un objeto,  separa el comportamiento  específico de un objeto, a esta división que realiza se le conoce como la barrera de abstracción, la cuál se consigue aplicando el principio de mínimo compromiso.

## Identificador this
`this` hace referencia al contexto en el que se llama a una propiedad desde un método.

## Sobrecarga (Overloading)
La sobrecarga permite declarar métodos que se llamen igual pero que reciban parámetros diferentes (no pueden haber 2 métodos con el mismo nombre y los mismos parámetros),  lo que define a que método se ingresa, son los argumentos que se envían como parámetros.

## Sobreescritura (Overriding)
La Sobreescritura es la forma por la cual una clase hija puede re-definir los métodos de su clase Padre, de esta manera puede crear nuevos métodos con el mismo nombre de su superClase
En la sobreescritura nos debemos fijar en que la estructura del método sea igual a la de su superClase, no solo el mismo nombre sino el mismo numero de argumentos y tipo de retorno

## Evaluación
- ¿Cuál es la diferencia entre una Clase y un Objeto?
    La clase es un molde en el que se definen las propiedas y métodos que un objeto tendrá, el objeto es la instancia de la clase, donde ya le fueron asignados las propiedades al objeto especificas para este.
- ¿Qué es un atributo?
    Un atributo es una propiedad de cada objeto que lo diferencia de los demás objetos intanciados de la misma clase.
- ¿Qué es un método/función?
    Es un bloque de código definido dentro de una clase y los objetos puden utilizar para realizar acciones.
- ¿Qué es Herencia? 
    Es la manera en que una clase puede ser creada a partir de otra clase padre, la nueva clase creada tiene acceso a los métodos y atributos de la clase padre.
- ¿Qué es Encapsulación?
    Es aislar datos del objeto para que no puedan ser modificados de manera directa, solo teniendo acceso a estos o modificarlos usando operaciones definidas dentro del mismo objeto.
- ¿Qué es Polimorfismo?
    El polimorfismo es la capacidad que tienen un objeto de poder usar sus métodos y que el resultado de usarlo este en función de los argumentos pasados al método.
- ¿Qué es Sobrecarga?
    Permite declara métodos con el mismo nombre que usen diferentes parámetros, al llamar al método lo que define cual de todos se usará son los parámetros pasados.
- ¿Qué es Sobreescritura?
    La sobre escritura es la modificación de los métodos heredados de la clase padre para agregar una mayor funcionalidad el método de la clase hijo.


# Cohesión
 La cohesión nos indica el grado de relación existente entre los distintos elementos de una clase. Una clase tendrá una cohesión alta cuando todos sus métodos estén relacionados entre si, mediante llamadas entre clases o mediante el uso de variables cuyo ámbito se encuentre a nivel de clase.
 > A mayor cohesión mejor
 ## Beneficios de alta cohesión
 - facilita el mantenimiento de código
 - Mejora la lectura del código

# Acoplamiento 
El acoplamiento hace referencia al nivel de dependencia de una clase con respecto a elementos externos
 > A menor acoplamiento mejor
 ## Beneficios de un bajo acoplamiento
 - Facilidad de reutilizar código.
 - Facilita el mantenimiento
 - Mayor entendimiento del código.

## Beneficios de una alta cohesión y un bajo acoplamiento
- Mejorar el encapsulamiento
- Cumplir principios de SOLID o KISS

- ¿A qué se refiere el principio de la Cohesión?
    dentro de una clase sus métodos y atributos esten muy relacionados y que la clase tenga una sola funcionalidad y que esta funcionalidad la la logré realizar muy bien.
- ¿A qué se refiere el principio del Acoplamiento?
    El acomplamiento es el nivel de depencia de una clase a componentes externos, buscando que la clase tenga poca interacción con componentes o clases externas
- ¿Cuál es el equilibro que se busca en el buen diseño de clases respecto a la Cohesión y el Acoplamiento y por que?
    Que una clase tenga una alta cohesión y un bajo acoplamiento, lo que generaria código fácil de entender, fácil de mantener, mejora el encapsulamiento de la clase.