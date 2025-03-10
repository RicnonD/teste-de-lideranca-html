const questions = [
    "Quando há uma decisão importante a ser tomada, eu prefiro tomar a decisão sozinho, sem envolver minha equipe.",
    "Eu gosto de consultar minha equipe e buscar consenso antes de tomar decisões importantes.",
    "Meu foco principal como líder é garantir que minha equipe tenha os recursos e apoio necessários para se desenvolver pessoal e profissionalmente.",
    "Eu prefiro dar total autonomia à minha equipe, permitindo que eles decidam e conduzam suas tarefas sem muita supervisão.",
    "Quando surgem conflitos na equipe, eu tomo a iniciativa de resolvê-los de forma rápida e com autoridade.",
    "Eu encorajo minha equipe a pensar de maneira criativa e a sugerir novas ideias, mesmo que isso signifique mudanças nos processos tradicionais.",
    "Eu me esforço para ser um mentor para minha equipe, sempre pronto para oferecer apoio emocional e profissional quando necessário.",
    "Quando as coisas ficam fora de controle, eu sinto a necessidade de assumir o comando e garantir que todos sigam as direções estabelecidas.",
    "Eu acredito que a melhor forma de liderança é dar à minha equipe a liberdade para tomar decisões e gerenciar seu próprio trabalho, sem interferências frequentes.",
    "Eu me esforço para ser um exemplo inspirador para minha equipe, mostrando dedicação e entusiasmo para alcançar os objetivos coletivos."
];

const form = document.getElementById('leadershipTest');
const showResultButton = document.getElementById('showResult');
const resultDiv = document.getElementById('result');

// Adiciona as perguntas ao formulário
function renderQuestions() {
    questions.forEach((question, index) => {
        const div = document.createElement('div');
        div.className = 'question';

        const label = document.createElement('label');
        label.textContent = `${index + 1}. ${question}`;

        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 5;
        input.required = true;

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });
}

// Valida se todas as respostas estão preenchidas corretamente
function validateInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value === "" || input.value < 1 || input.value > 5) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        alert("Por favor, preencha todas as perguntas com valores entre 1 e 5.");
    }

    return isValid;
}

// Calcula a pontuação total e exibe o resultado
function calculateScore() {
    if (!validateInputs()) return;

    const inputs = document.querySelectorAll('input[type="number"]');
    let totalScore = 0;

    inputs.forEach(input => {
        totalScore += parseInt(input.value);
    });

    const result = analyzeScore(totalScore);
    displayResult(totalScore, result);
}

// Analisa a pontuação e retorna o tipo de líder e a análise
function analyzeScore(totalScore) {
    if (totalScore >= 10 && totalScore <= 20) {
        return {
            analysis: "Liderança mais autocrática. Você tende a tomar decisões sozinho e manter o controle centralizado.",
            leaderType: 'Autocrático',
            imageUrl: '../images/autocratico.png'
        };
    } else if (totalScore >= 21 && totalScore <= 30) {
        return {
            analysis: "Liderança equilibrada. Você busca um meio-termo entre autonomia e controle.",
            leaderType: 'Equilibrado',
            imageUrl: '../images/equilibrado.png'
        };
    } else if (totalScore >= 31 && totalScore <= 40) {
        return {
            analysis: "Liderança participativa. Você valoriza a opinião da equipe e promove um ambiente colaborativo.",
            leaderType: 'Participativo',
            imageUrl: '../images/participativo.png'
        };
    } else if (totalScore >= 41 && totalScore <= 50) {
        return {
            analysis: "Liderança inspiradora. Você motiva, apoia e desenvolve sua equipe, promovendo um ambiente de confiança e inovação.",
            leaderType: 'Inspirador',
            imageUrl: '../images/inspirador.png'
        };
    } else {
        return {
            analysis: "Por favor, responda todas as perguntas para obter uma análise.",
            leaderType: 'Indefinido',
            imageUrl: ''
        };
    }
}

// Exibe o resultado na página
function displayResult(totalScore, result) {
    resultDiv.innerHTML = `
        <div class="dashboard">
            <h2>Resultado do Teste de Liderança</h2>
            <div class="dashboard-content">
                <div class="dashboard-item">
                    <h3>Pontuação Total</h3>
                    <p>${totalScore}</p>
                </div>
                <div class="dashboard-item">
                    <h3>Tipo de Líder</h3>
                    <p>${result.leaderType}</p>
                </div>
            </div>
            <div class="chart-container">
                <canvas id="leaderChart"></canvas>
            </div>
            ${result.imageUrl ? `<img src="${result.imageUrl}" alt="${result.leaderType}" class="leader-image">` : ''}
            <p>${result.analysis}</p>
        </div>
    `;

    console.log("Canvas criado:", document.getElementById('leaderChart')); // Verifique no console
    createChart(totalScore);
}

// Cria o gráfico de barras
function createChart(totalScore) {
    const canvas = document.getElementById('leaderChart');

    // Remove o gráfico anterior, se existir
    if (canvas.chartInstance) {
        canvas.chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    const chartData = {
        labels: ['Autocrático (10-20)', 'Equilibrado (21-30)', 'Participativo (31-40)', 'Inspirador (41-50)'],
        datasets: [{
            label: 'Sua Pontuação',
            data: [
                totalScore >= 10 && totalScore <= 20 ? totalScore : 0,
                totalScore >= 21 && totalScore <= 30 ? totalScore : 0,
                totalScore >= 31 && totalScore <= 40 ? totalScore : 0,
                totalScore >= 41 && totalScore <= 50 ? totalScore : 0
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Configurações do gráfico
    canvas.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    title: {
                        display: true,
                        text: 'Pontuação'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Evento para calcular o resultado ao clicar no botão
showResultButton.addEventListener('click', (e) => {
    e.preventDefault();
    calculateScore();
});

// Renderiza as perguntas ao carregar a página
renderQuestions();