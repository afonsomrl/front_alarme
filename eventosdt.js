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

     // 4 - invocar o backend
     fetch("http://localhost:8088/eventos/intervalo", cabecalho)
        .then(res   => res.json())    // se eu receber uma resposta, extraio o JSON do seu body
        .then(lista => preencheRelatorio(lista)); // com a extração, recebo uma lista que será usada para preencher o relatorio
}


function preencheRelatorio(lista){
    var txtRelatorio = `<table id="tabelaRelatorio" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Hostname</th>
                                    <th>IP</th>
                                    <th>Alarme</th>
                                </tr>
                            </thead>
                            <tbody>`; 

    for (i=0; i < lista.length; i++){
         var evento = lista[i];  // vou facilitar a manipulação
        txtRelatorio += ` <tr>
                        <td>${evento.data}</td> 
                        <td>${evento.equipamento.hostname} </td>
                        <td> ${evento.equipamento.ip} </td>
                         <td> ${evento.alarme.nome} </td>
                         </tr>`; 
    }

    txtRelatorio += `</tbody> </table>`;
    document.getElementById("relatorio").innerHTML = txtRelatorio;

    $('#tabelaRelatorio').DataTable();
}



