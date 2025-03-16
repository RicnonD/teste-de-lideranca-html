const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6ubrBj9EkkJOkWldGvM_8htmJH8cNKp-FngWrRglnqY2r0eoaSJSeWofiumPHtbMv/exec";

// Elementos do DOM
const form = document.getElementById('leadershipTest');
const showResultButton = document.getElementById('showResult');
const resultDiv = document.getElementById('result');

// Perguntas do teste
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

// Renderiza as perguntas no formulário
function renderQuestions() {
  if (!form) {
    console.error("Formulário não encontrado!");
    return;
  }

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

// Valida as respostas
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

// Analisa a pontuação e retorna o tipo de líder
function analyzeScore(count1to2, count3to4, count5, count1) {
  const conclusao = `
    <h3>Conclusão:</h3>
    <p>Este teste permite que os líderes reflitam sobre seus comportamentos e ajustem suas práticas de liderança conforme necessário. 
    Independentemente do estilo predominante, é sempre valioso combinar aspectos de outros estilos para criar uma abordagem mais flexível e eficaz.</p>
  `;

  if (count1 > count1to2 && count1 > count3to4 && count1 > count5) {
    return {
      analysis: `
        <h3>Interpretação dos Resultados:</h3>
        <p><strong>Maioria das respostas 1 (Laissez-Faire):</strong> Seu estilo de liderança é Laissez-Faire. Você oferece grande autonomia à sua equipe.</p>
        ${conclusao}
      `,
      leaderType: 'Laissez-Faire',
      imageUrl: 'teste-de-lideranca-html/output/images/laissez-faire.png'
    };
  } else if (count5 > count3to4 && count5 > count1to2 && count5 > count1) {
    return {
      analysis: `
        <h3>Interpretação dos Resultados:</h3>
        <p><strong>Maioria das respostas 5 (Servidora):</strong> Seu estilo de liderança é Servidor.</p>
        ${conclusao}
      `,
      leaderType: 'Servidora',
      imageUrl: 'teste-de-lideranca-html/output/images/servidor.png'
    };
  } else if (count3to4 > count1to2 && count3to4 > count1) {
    return {
      analysis: `
        <h3>Interpretação dos Resultados:</h3>
        <p><strong>Maioria das respostas 3-4 (Democrática):</strong> Seu estilo de liderança é Democrático.</p>
        ${conclusao}
      `,
      leaderType: 'Democrática',
      imageUrl: 'teste-de-lideranca-html/output/images/democratico.png'
    };
  } else {
    return {
      analysis: `
        <h3>Interpretação dos Resultados:</h3>
        <p><strong>Maioria das respostas 1-2 (Autoritária):</strong> Seu estilo de liderança é mais Autoritário.</p>
        ${conclusao}
      `,
      leaderType: 'Autoritária',
      imageUrl: 'teste-de-lideranca-html/output/images/autoritario.png'
    };
  }
}

// Função para obter todas as respostas
function getRespostas() {
  const inputs = document.querySelectorAll('input[type="number"]');
  const respostas = [];
  inputs.forEach((input, index) => {
    respostas.push({
      pergunta: index + 1,
      resposta: parseInt(input.value) || 0
    });
  });
  return respostas;
}

// Exibe o resultado e salva no Google Sheets
async function displayResult(result) {
  if (!resultDiv) {
    console.error("Elemento de resultado não encontrado!");
    return;
  }

  // Exibe o resultado
  resultDiv.innerHTML = `
    <div class="result-card">
      <h2>Resultado</h2>
      <img src="${result.imageUrl}" alt="${result.leaderType}">
      ${result.analysis}
    </div>
  `;

  // Prepara os dados para enviar ao Google Sheets
  const dataToSave = {
    estilo: result.leaderType,
    respostas: getRespostas(),
    totalPontos: getRespostas().reduce((acc, curr) => acc + curr.resposta, 0)
  };

  // Envia para o Google Sheets
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
    });

    if (response.ok) {
      console.log("Dados salvos no Google Sheets!");
    } else {
      console.error("Erro ao salvar:", await response.text());
    }
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

// Calcula a pontuação
function calculateScore() {
  if (!validateInputs()) return;

  const inputs = document.querySelectorAll('input[type="number"]');
  let count1to2 = 0, count3to4 = 0, count5 = 0, count1 = 0;

  inputs.forEach(input => {
    const value = parseInt(input.value);
    if (value === 1) count1++;
    if (value === 2) count1to2++;
    if (value >= 3 && value <= 4) count3to4++;
    if (value === 5) count5++;
  });

  const result = analyzeScore(count1to2, count3to4, count5, count1);
  displayResult(result);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM carregado!");
  renderQuestions();
});

if (showResultButton) {
  showResultButton.addEventListener('click', (e) => {
    e.preventDefault();
    calculateScore();
  });
} else {
  console.error("Botão 'Mostrar Resultado' não encontrado!");
}