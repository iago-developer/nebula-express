class Cliente {
  private nomeCompleto:string = "";
  private idade:number = 0;
  
  constructor(nomeCompleto:string, idade:number) {
    this.nomeCompleto = nomeCompleto;
    this.idade = idade;
  }
}

const cliente = new Cliente("Matheus",18);