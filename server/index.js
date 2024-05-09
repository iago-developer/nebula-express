"use strict";
class Cliente {
    constructor(nomeCompleto, idade) {
        this.nomeCompleto = "";
        this.idade = 0;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
    }
}
const cliente = new Cliente("Matheus", 18);
console.log(cliente)