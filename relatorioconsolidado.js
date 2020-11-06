function logout(){
    localStorage.removeItem("userAlarme");
    window.location = "index.html";
}


function verificaLogin(){
    // basicamente vejo se tem o tal do "userAlarme" no localStorage. Se não tiver
    // significa que ninguem se conectou e, portanto, mando pro index
    var user = localStorage.getItem("userAlarme");
    if (!user){
        window.location = "index.html";
    }
}

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

     fetch("http://localhost:8088/eventos/consolidado/intervalo", cabecalho)
        .then(res => res.json())
        .then(lista => preencheRelatorio(lista));

}

function preencheRelatorio(lista){

    var txtRelatorio = "";
    for (i=0; i<lista.length; i++){
        var volume = lista[i];
        txtRelatorio += `${volume.nomeAlarme} : ${volume.quantidade} <br>`;
    }

    document.getElementById("relatorio").innerHTML = txtRelatorio;

}