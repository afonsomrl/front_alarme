function carregaInfo(){
    var objUser = localStorage.getItem("userAlarme");

    if (!objUser){  // esse objeto não foi recuperado do cache local, logo alguem tentou acessar a página sem se logar
       window.location = "index.html";
    }

    var usuario = JSON.parse(objUser); // reconverto de texto (recuperado do storage) para um obj. em memória

    document.getElementById("fotoUser").innerHTML = `<img src="${usuario.linkFoto}" width="100%"></img>`;
    document.getElementById("infoUser").innerHTML = `<strong> Nome : </strong> ${usuario.nome} <br>
                                                     <strong> Email: </strong> ${usuario.email} <br>
                                                     <strong> RACF : </strong> ${usuario.racf} <br>
                                                     
            <button type="button" class="btn btn-primary" onclick="logout()">Logout</button>`;
}

function logout(){
    localStorage.removeItem("userAlarme");
    window.location = "index.html";
}