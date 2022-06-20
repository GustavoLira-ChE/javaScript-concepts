String.prototype.multiply = function multiply(number) {
    let len = this.length;
    let myString = ""
    for(let i = 0; i < len; i++){
        myString += this.charAt(i)
    }
    for(let i = 0; i < number; i++){
        console.log(i, myString)
    }

}
var myString = new String("my string");

myString.multiply(2)
"Hola mundo".multiply(6)
