// Pegamos o formulário da página
const formulario = document.querySelector("form");

// Pegamos a área onde o resultado será exibido
const resultado = document.getElementById("resultado");


// Adicionamos um evento ao formulário
formulario.addEventListener("submit", function(event) {

    // Impede que a página recarregue ao enviar o formulário
    event.preventDefault();


    // Pegamos o serviço escolhido
    const selectServico = document.getElementById("servico");
    const servico = selectServico.value;
    const nomeServico = selectServico.selectedOptions[0].textContent;

    // Pegamos a quantidade de veículos
    const quantidade = Number(document.getElementById("qtdeveic").value);

    // Pegamos o serviço adicional
    const selectAdicional = document.getElementById("servicoad");
    const adicional = selectAdicional.value;
    const nomeAdicional = selectAdicional.selectedOptions[0].textContent;


    // Variável para guardar o valor do serviço principal
    let valorServico = 0;

    // Variável para guardar o valor do adicional
    let valorAdicional = 0;


    // Verificamos qual serviço foi escolhido
    if (servico === "revisao") {
        valorServico = 250;
    } else if (servico === "troca-oleo") {
        valorServico = 180;
    } else if (servico === "alinhamento") {
        valorServico = 120;
    }


    // Verificamos se existe serviço adicional
    if (adicional === "revisao") {
        valorAdicional = 250;
    } else if (adicional === "troca-oleo") {
        valorAdicional = 180;
    } else if (adicional === "alinhamento" ) {
        valorAdicional = 120;
    } else if (adicional === "lavagem") {
        valorAdicional = 50;
    }


    if (adicional !== "" && servico === adicional) {
        const mensagemErro = document.createElement("p");
        
        mensagemErro.textContent =
            "O serviço adicional não pode ser igual ao serviço principal.";

        resultado.replaceChildren(mensagemErro);
        mensagemErro.classList.add("mensagem-erro");
        return;   
    }

    // Calculamos o subtotal
    let subtotal = (valorServico * quantidade) + (valorAdicional * quantidade);


    // Variável para guardar o desconto
    let desconto = 0;


    // Regra usando if
    // Se o subtotal for maior ou igual a 500,
    // aplica 10% de desconto
    if (subtotal >= 500) {
        desconto = subtotal * 0.10;
    }


    // Calculamos o valor final
    let total = subtotal - desconto;
    
    // Exibimos o resultado dentro da página
    const paragrafoNome = document.createElement("p");
    paragrafoNome.textContent = "Nome: "+ document.getElementById("nome").value;

    const paragrafoEmail = document.createElement("p");
    paragrafoEmail.textContent = "Email: "+ document.getElementById("email").value;

    const paragrafoServico = document.createElement("p");
    paragrafoServico.textContent = "Serviço escolhido: "+ nomeServico;

    const paragrafoAdicional = document.createElement("p");
    paragrafoAdicional.textContent = "Serviço adicional: "+ nomeAdicional;

    const paragrafoQuantidade = document.createElement("p");
    paragrafoQuantidade.textContent = "Quantidade de veículos: "+ quantidade;

    const paragrafoDesconto = document.createElement("p");
    paragrafoDesconto.textContent = "Desconto: "+ formatarMoeda(desconto);

    const paragrafoSubtotal = document.createElement("p");
    paragrafoSubtotal.textContent = "Subtotal: "+ formatarMoeda(subtotal);

    const paragrafoTotal = document.createElement("p");
    paragrafoTotal.textContent = "Total: " + formatarMoeda(total);

    const titulo = document.createElement("h3");
    titulo.textContent = "Resultado do orçamento:";
    resultado.replaceChildren(titulo,paragrafoNome,paragrafoEmail,paragrafoServico,paragrafoAdicional,paragrafoQuantidade,paragrafoDesconto,paragrafoSubtotal,paragrafoTotal);

});

formulario.addEventListener("reset", function(event) {
    // Limpa o resultado exibido na página
    resultado.innerHTML = `
        <h3>Resultado do orçamento</h3>
        <p id="resultado-orcamento">Preencha o formulário para calcular o orçamento</p>
    `;
});

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}