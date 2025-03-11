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

// Analisa a pontuação e retorna o tipo de líder e a análise
function analyzeScore(count1to2, count3to4, count5, count1) {
    const conclusao = `
        <h3>Conclusão:</h3>
        <p>Este teste permite que os líderes reflitam sobre seus comportamentos e ajustem suas práticas de liderança conforme necessário. Independentemente do estilo predominante, é sempre valioso combinar aspectos de outros estilos para criar uma abordagem mais flexível e eficaz.</p>
    `;

    // Verifica se a maioria das respostas é 1 (Laissez-Faire)
    if (count1 > count1to2 && count1 > count3to4 && count1 > count5) {
        return {
            analysis: `
                <h3>Interpretação dos Resultados:</h3>
                <p><strong>Maioria das respostas 1 (Laissez-Faire):</strong> Seu estilo de liderança é Laissez-Faire. Você oferece grande autonomia à sua equipe, permitindo que eles se gerenciem sozinhos. Esse estilo funciona bem com equipes altamente experientes e motivadas, mas pode ser um desafio em situações que exigem mais orientação e controle.</p>
                ${conclusao}
            `,
            leaderType: 'Laissez-Faire',
            imageUrl: '/teste-de-lideranca-html/output/images/laissez-faire.png'
        };
    }
    // Verifica se a maioria das respostas é 5 (Servidora)
    else if (count5 > count3to4 && count5 > count1to2 && count5 > count1) {
        return {
            analysis: `
                <h3>Interpretação dos Resultados:</h3>
                <p><strong>Maioria das respostas 5 (Servidora):</strong> Seu estilo de liderança é Servidor. Você está focado no bem-estar e desenvolvimento da sua equipe, garantindo que eles tenham o suporte necessário. Líderes servidores criam ambientes de trabalho positivos e motivadores, o que fortalece a confiança e o compromisso da equipe.</p>
                ${conclusao}
            `,
            leaderType: 'Servidora',
            imageUrl: '/teste-de-lideranca-html/output/images/servidor.png'
        };
    }
    // Verifica se a maioria das respostas é 3-4 (Democrática)
    else if (count3to4 > count1to2 && count3to4 > count1) {
        return {
            analysis: `
                <h3>Interpretação dos Resultados:</h3>
                <p><strong>Maioria das respostas 3-4 (Democrática):</strong> Seu estilo de liderança é Democrático. Você valoriza a colaboração e busca a participação ativa de sua equipe nas decisões. Esse estilo promove um ambiente de trabalho mais participativo e engajado, ideal para o desenvolvimento contínuo de todos.</p>
                ${conclusao}
            `,
            leaderType: 'Democrática',
            imageUrl: '/teste-de-lideranca-html/output/images/democratico.png'
        };
    }
    // Caso contrário, retorna Autoritária (respostas 1-2, excluindo respostas 1 já contadas para Laissez-Faire)
    else {
        return {
            analysis: `
                <h3>Interpretação dos Resultados:</h3>
                <p><strong>Maioria das respostas 1-2 (Autoritária):</strong> Seu estilo de liderança é mais Autoritário. Você tende a tomar decisões de forma independente e espera que sua equipe siga suas instruções. Isso pode ser útil em situações de crise, mas é importante equilibrar com outras abordagens quando possível, para incentivar a colaboração e a autonomia da equipe.</p>
                ${conclusao}
            `,
            leaderType: 'Autoritária',
            imageUrl: '/teste-de-lideranca-html/output/images/autoritario.png'
        };
    }
}

// Exibe o resultado na página
function displayResult(result) {
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div class="dashboard">
                <h2>Resultado do Teste de Liderança</h2>
                <div class="dashboard-content">
                    <div class="dashboard-item">
                        <h3>Tipo de Líder</h3>
                        <p>${result.leaderType}</p>
                    </div>
                </div>
                ${result.imageUrl ? `<img src="${result.imageUrl}" alt="${result.leaderType}" class="leader-image">` : ''}
                ${result.analysis}
            </div>
        `;
    } else {
        console.error("Elemento 'result' não encontrado.");
    }
}

// Calcula a pontuação total e exibe o resultado
function calculateScore() {
    if (!validateInputs()) return;

    const inputs = document.querySelectorAll('input[type="number"]');
    let count1to2 = 0; // Contador para respostas 2 (Autoritária)
    let count3to4 = 0; // Contador para respostas 3-4 (Democrática)
    let count5 = 0;    // Contador para respostas 5 (Servidora)
    let count1 = 0;    // Contador para respostas 1 (Laissez-Faire)

    inputs.forEach(input => {
        const value = parseInt(input.value);
        if (value === 1) count1++; // Conta apenas respostas 1 para Laissez-Faire
        if (value === 2) count1to2++; // Conta apenas respostas 2 para Autoritária
        if (value >= 3 && value <= 4) count3to4++; // Conta respostas 3 e 4 para Democrática
        if (value === 5) count5++; // Conta respostas 5 para Servidora
    });

    // Determina o estilo de liderança com base na maioria das respostas
    const result = analyzeScore(count1to2, count3to4, count5, count1);
    displayResult(result);
}

// Evento para calcular o resultado ao clicar no botão
if (showResultButton) {
    showResultButton.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        calculateScore();
    });
} else {
    console.error("Botão 'showResult' não encontrado.");
}

// Renderiza as perguntas ao carregar a página
renderQuestions();