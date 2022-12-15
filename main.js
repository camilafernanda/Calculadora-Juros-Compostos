document.querySelector('button').onclick = function () {
    let valorInvestido = document.querySelector("#valor-investido").valueAsNumber;
    let taxaJuros = document.querySelector("#taxa-juros").valueAsNumber;
    let selectTaxaJuros = document.querySelector("#modelo-taxa-juros").value;
    let periodo = document.querySelector("#periodo").valueAsNumber;
    let selectPeriodo = document.querySelector("#modelo-periodo").value;

    selectPeriodo = String(selectPeriodo);
    selectTaxaJuros = String(selectTaxaJuros);

    periodoEmAnos = calculaPeriodo(periodo,selectPeriodo);
    taxaPorAno = calculaPeriodo(taxaJuros,selectTaxaJuros);
    montante = calculaMontante(valorInvestido, taxaPorAno, periodoEmAnos);
    jurosCompostos = calculaJurosCompostos(montante, valorInvestido);
    resultadosTabela(taxaPorAno, periodoEmAnos, valorInvestido);

    let tabelaCapital = document.querySelector("#total-investido");
    tabelaCapital.textContent = "R$ " + parseFloat(valorInvestido.toFixed(2)).toLocaleString('PT');

    let tabelaJurosCompostos = document.querySelector("#total-juros");
    tabelaJurosCompostos.textContent = "R$ " + parseFloat(jurosCompostos.toFixed(2)).toLocaleString('PT');

    let tabelaTotal = document.querySelector("#total");
    tabelaTotal.textContent = "R$ " + parseFloat(montante.toFixed(2)).toLocaleString('PT');
}

function calculaPeriodo(periodo, selectPeriodo) {
    let periodoEmAnos = 0;
    if (selectPeriodo == "anos") {
        periodoEmAnos = periodo;
    } else {
        periodoEmAnos = periodo / 12;
    }

    return periodoEmAnos;
}

function calculaTaxaJuros(taxaJuros, selectTaxaJuros) {
    let taxaPorAno = 0;
    if (selectTaxaJuros == "anual") {
        taxaPorAno = taxaJuros / 100;
    } else {
        taxaPorAno = (taxaJuros / 100) * 12;
    }

    return taxaPorAno;
}

function calculaMontante(valorInvestido, taxaPorAno, periodoEmAnos) {
    let montante = valorInvestido * ((1 + taxaPorAno) ** periodoEmAnos);
    return montante;
}

function calculaJurosCompostos(montante, valorInvestido) {
    let jurosCompostos = montante - valorInvestido;
    return jurosCompostos;
}

function resultadosTabela(taxaPorAno, periodoEmAnos, valorInvestido) {
    let tabela = document.querySelector("#tabela-resultados");
    let qtdLinhas = tabela.rows.length;

    for (let i = 1; i <= (periodoEmAnos * 12); i++) {
        let linha = tabela.insertRow(qtdLinhas);

        let cellPeriodo = linha.insertCell();
        let cellCapital = linha.insertCell();
        let cellJuros = linha.insertCell();
        let cellMontante = linha.insertCell();

        valorInvestido += valorInvestido * (taxaPorAno / 12);

        cellPeriodo.innerHTML = i;
        cellCapital.innerHTML = parseFloat(valorInvestido.toFixed(2)).toLocaleString('PT');
        cellJuros.innerHTML = parseFloat(((taxaPorAno/12)*valorInvestido).toFixed(2)).toLocaleString('PT');
        cellMontante.innerHTML = parseFloat((valorInvestido+((taxaPorAno/12)*valorInvestido)).toFixed(2)).toLocaleString('PT');
    }
}

