function gerarRelatorio(){
    /*
    1 - pegar as datas do formulário
    2 - montar a mensagem de datas para serem enviadas ao BackEnd
    3 - montar o cabeçalho POST
    4 - invocar o BackEnd através da função FETCH
    5 - criar uma função para montar o relatório a partir do que o for retornado no Fetch
    */

     // 1 - pegar as datas
     var txtDataInicio = document.getElementById("txtDataInicio").value;
     var txtDataFim    = document.getElementById("txtDataFim").value;

     // 2 - montar a mensagem de datas para serem  enviadas ao BackEnd
     var msgBody = {
         dataInicio : txtDataInicio,
         dataFim    : txtDataFim
     };

     // 3 - montar o cabeçalho POST
     var cabecalho = {
         method  : "POST",
         body    : JSON.stringify(msgBody),
         headers : {
             "Content-type":"application/json"
         } 
     };

     // 4 - invocar o backend
     fetch("http://localhost:8088/eventos/intervalo", cabecalho)
        .then(res   => res.json())    // se eu receber uma resposta, extraio o JSON do seu body
        .then(lista => preencheRelatorio(lista)); // com a extração, recebo uma lista que será usada para preencher o relatorio
}


function preencheRelatorio(lista){
    var txtRelatorio = ""; 

    for (i=0; i < lista.length; i++){
         var evento = lista[i];  // vou facilitar a manipulação
        txtRelatorio += `${evento.data} - ${evento.equipamento.hostname} | ${evento.equipamento.ip} :
                         ${evento.alarme.nome} <br>`; 
    }
    document.getElementById("relatorio").innerHTML = txtRelatorio;
}



