import sonIguales from "./scripts/exercise1.js";

const arg1Array = ["hola","hola","",{},[]];
const arg2Array = ["hola", "mundo", 0, {},0];

for(let i = 0; i < arg1Array.length; i++){
    console.log(sonIguales(arg1Array[i],arg2Array[i]))
}

function joinString(string, ...values){
    let newString = "";
    for(let i = 0; i < string.length; i++){
        if(i === 1){
            newString += values[i-1]
        }
        newString += string[i]
    }
    return newString
}
let animal = "fox"
const frase = joinString`The quick brown ${animal}, 
 jumps over the lazy dog`
console.log(frase);
document.addEventListener("DOMContentLoaded", ()=> {
    let html = `<div id="container" class="d-grid gap-2">`;
    for(let i = 0; i < 10; i++){
        if(i == 9){
            html += `<button id="boton${i+1}" value="${i+1}" type="button" class="btn btn-primary"><a style="color: white; text-decoration: none" href="https://www.google.com/" target="_blank">Boton ${i+1}</a></button>`    
        } else{
            html += `<button id="boton${i+1}" value="${i+1}" type="button" class="btn btn-primary">Boton ${i+1}</button>`
        }
    }
    html += "</div>"
    document.getElementById("display").innerHTML = html;
    const buttons = document.getElementsByTagName("button");
    console.log(buttons)
    function showButtonValue(event){
        console.log(event.target.value)
    }
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click",showButtonValue)
    }
})