document.querySelector('button').onclick = function () {
    let valorInvestido = document.querySelector('#valor_investido').valueAsNumber;
    let taxaJuros = document.querySelector('#taxa_juros').valueAsNumber / 100;
    let periodo = document.querySelector('#periodo').valueAsNumber;

    let modeloPeriodo = document.querySelector('#modelo_periodo').value;
    if (modeloPeriodo == 'anos') {
        periodo = periodo * 12;
    }

    let modeloTaxa = document.querySelector('#modelo_taxa_juros').value;
    if (modeloTaxa == 'anual') {
        taxaJuros = taxaJuros / 12;
    }

    result = validar(valorInvestido, taxaJuros, periodo);

    if (result == true) {

        let montante = calculaMontante(valorInvestido, taxaJuros, periodo);
        let jurosCompostos = calculaJurosCompostos(montante, valorInvestido);

        montarTabelaResumo(valorInvestido, jurosCompostos, montante);
        montarTabelaMensal(taxaJuros, periodo, valorInvestido);
    }
}

function calculaMontante(valorInvestido, taxa, periodo) {
    let montante = valorInvestido * ((1 + taxa) ** periodo);
    return montante;
}

function calculaJurosCompostos(montante, valorInvestido) {
    let jurosCompostos = montante - valorInvestido;
    return jurosCompostos;
}

function montarTabelaResumo(valorInvestido, jurosCompostos, montante) {
    let resumoValorInvestido = document.querySelector('#total_investido');
    resumoValorInvestido.textContent = 'R$ ' + parseFloat(valorInvestido.toFixed(2)).toLocaleString('PT');

    let resumoTotalJuros = document.querySelector('#total_juros');
    resumoTotalJuros.textContent = 'R$ ' + parseFloat(jurosCompostos.toFixed(2)).toLocaleString('PT');

    let resumoTotalMontante = document.querySelector('#total');
    resumoTotalMontante.textContent = 'R$ ' + parseFloat(montante.toFixed(2)).toLocaleString('PT');
}

function montarTabelaMensal(taxa, periodo, valorInvestido) {
    let tabela = document.querySelector('#tabela_resultados tbody');
    tabela.innerHTML = "";

    for (let i = 1; i <= periodo; i++) {
        let linha = tabela.insertRow(-1);

        let cellPeriodo = linha.insertCell();
        let cellJuros = linha.insertCell();
        let cellMontante = linha.insertCell();

        let jurosAtual = valorInvestido * taxa;
        valorInvestido += jurosAtual;

        cellPeriodo.innerHTML = i;
        cellJuros.innerHTML = parseFloat(jurosAtual.toFixed(2)).toLocaleString('PT');
        cellMontante.innerHTML = parseFloat(valorInvestido.toFixed(2)).toLocaleString('PT');
    }
}

function validar(valorInvestido, taxaJuros, periodo) {

    if (periodo == 0 || periodo > 600) {
        alert("Informe um período diferente de zero e menor ou igual a 50 anos, ou 600 meses");
        formulario.periodo.focus();
        return false;
    }

    if (taxaJuros == 0) {
        alert("Digite um valor para a taxa de juros");
        formulario.taxa_juros.focus();
        return false;
    }

    if (valorInvestido == 0) {
        alert("Digite um valor para o valor investido");
        formulario.valor_investido.focus();
        return false;
    }

    return true;

}

