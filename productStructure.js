const products = [
  "preto-PP", 
  "preto-M", 
  "preto-G", 
  "preto-GG", 
  "preto-GG", 
  "branco-PP", 
  "branco-G", 
  "vermelho-M", 
  "azul-XG", 
  "azul-XG", 
  "azul-P", 
  "azul-XG"
]

// CLASSES

class Vestido {
  constructor(cor){
      this.cor = cor;
      this.tamanhos = [];
  }

  getCor(){
      return this.cor;
  }

  addTamanho(tamanho){
    this.tamanhos.push(tamanho);
    this.tamanhos.sort((a, b) => a.localeCompare(b))
  }

  getTamanho(){
      return this.tamanho;
  }
}


class VestidosLista {
  constructor(){
    this.lista = [];
  }

  addVestido(vestido){
      this.lista.push(vestido);
  }

  getLista(){
      return this.lista;
  }
}

//

module.exports = () => {
  const lista = new VestidosLista();
  const fetchedLista = [];
  let vestidosCor = [];
  let result = '';

  //dividindo os vestidos entre cores e tamanhos
  products.forEach(value => {
    let vestido = value.split("-");
    fetchedLista.push(vestido);
  })

  //criando uma lista apenas com as cores adicioandas
  fetchedLista.forEach((value, index, array) => {
    const nextIndex = index + 1;
    const currentCor = value[0];
    const nextCor = nextIndex < array.length ? array[nextIndex][0] : null;

    if(currentCor.localeCompare(nextCor) !== 0){
      vestidosCor.push(currentCor);
    }
  })

  //criando um objeto vestido, adicionando os tamanhos disponiveis para a cor e colocando ela dentro do objeto lista
  vestidosCor.forEach(cor => {
    const vestido = new Vestido(cor)
    fetchedLista.forEach((fetchedVest) => {
      if(cor.localeCompare(fetchedVest[0]) === 0){
        vestido.addTamanho(fetchedVest[1]);
      }
    })
    lista.addVestido(vestido);
  })
 
  //criando um json apartir das informações adquiridas para depois transformar em um objeto
  lista.getLista().forEach((val, valIndex, valArray) =>{
    let tamanhosLista = [];

    result += `\t"${val.cor}":{\n`

    //tirando repetições de tamanho e botando dentro de uma lista
    val.tamanhos.forEach((tamanho, index, array) => {
        const nextIndex = index + 1;
        const currentTam = tamanho;
        const nextTam = nextIndex < array.length ? array[nextIndex] : null;
    
        if(currentTam.localeCompare(nextTam) !== 0){
          tamanhosLista.push(currentTam);
        }
    });

    //usando a lista sem tamanhos repetidos para contar quantas repetições ocorreram na originalmente
    tamanhosLista.forEach((tamanho, index, array) => {
      let count = 0;

      val.tamanhos.forEach((fetchedTamanho) => {
        if(tamanho.localeCompare(fetchedTamanho) === 0){
          count += 1;
        }
      });
      index !== array.length -1 ? result += `\t\t"${tamanho}": ${count},\n` : result += `\t\t"${tamanho}": ${count}\n`;
    });

    result += `\t}${valIndex !== valArray.length -1 ? "," : " "} \n`
  })
  result = `{\n${result}}`

  return JSON.parse(result);
}