// 1. Variáveis estáticas de temperatura (°C) e velocidade do vento (km/h)
const temp = 8; // Valor <= 10 °C para teste
const windSpeed = 10; // Valor > 4.8 km/h para teste

// 2. Função de linha única para cálculo da sensação térmica (Fórmula Métrica)
const calcularSensacaoTermica = (t, v) => 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);

// 3. Execução ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o parágrafo referente ao "Wind Chill" na seção de clima
    const weatherSection = document.querySelectorAll(".dados")[1];
    const windChillParagraph = weatherSection ? weatherSection.querySelectorAll("p")[3] : null;

    // Verificação dos limites viáveis para o cálculo no sistema métrico
    if (temp <= 10 && windSpeed > 4.8) {
        const sensacao = calcularSensacaoTermica(temp, windSpeed);
        if (windChillParagraph) windChillParagraph.textContent = `${sensacao.toFixed(1)}` ;
    } else {
        if (windChillParagraph) windChillParagraph.textContent = "N/A";
    } 

    // Atualização dinâmica dos dados do rodapé
    const anoAtual = document.getElementById("anoAtual");
    const dataModificacao = document.getElementById("dataModificacao");
    const data = new Date(document.lastModified);
    const dataFormatada = data.toLocaleString("pt-BR")
    

    if (anoAtual) anoAtual.textContent = new Date().getFullYear();
    if (dataModificacao) dataModificacao.textContent = document.lastModified;
    dataModificacao.textContent = `${dataFormatada}`;

}); 
