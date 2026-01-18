// Tabela de preços base
const precos = {
    1: 40,
    2: 76,
    3: 108,
    4: 136,
    5: 160,
    6: 180
};

const precosPorMusica = {
    1: 40,
    2: 38,
    3: 36,
    4: 34,
    5: 32,
    6: 30
};

// Função para atualizar disponibilidade de músicas conforme antecedência
function atualizarMusicasDisponiveis() {
    const antecedencia = parseInt(document.getElementById('antecedencia').value);
    const numMusicasSelect = document.getElementById('numMusicas');
    const opcoes = numMusicasSelect.querySelectorAll('option');

    opcoes.forEach(opcao => {
        const valor = parseInt(opcao.value);
        // Se antecedência é 2-3 meses, desabilitar 5 e 6 músicas
        if (antecedencia === 10 && (valor === 5 || valor === 6)) {
            opcao.disabled = true;
            opcao.textContent = opcao.textContent + ' (não disponível para 2-3 meses)';
        } else {
            opcao.disabled = false;
        }
    });

    // Se tem 5 ou 6 selecionadas e muda para 2-3 meses, volta para 4
    const numMusicasAtual = parseInt(numMusicasSelect.value);
    if ((numMusicasAtual === 5 || numMusicasAtual === 6) && antecedencia === 10) {
        numMusicasSelect.value = '4';
    }

    calcularOrcamento();
}

// Função para calcular o orçamento
function calcularOrcamento() {
    const numMusicas = parseInt(document.getElementById('numMusicas').value);
    const antecedencia = parseInt(document.getElementById('antecedencia').value);
    const distancia = parseInt(document.getElementById('distancia').value) || 0;
    
    // Obter valor de pedágio (select ou custom)
    let pedagio = 0;
    const pedagogioSelect = document.getElementById('pedagio').value;
    
    if (pedagogioSelect === 'custom') {
        pedagio = parseFloat(document.getElementById('pedagogioCustom').value) || 0;
        // Mostrar campo customizado
        document.getElementById('pedagogioCustomDiv').style.display = 'block';
    } else {
        pedagio = parseFloat(pedagogioSelect) || 0;
        // Esconder campo customizado
        document.getElementById('pedagogioCustomDiv').style.display = 'none';
    }

    // Preço base
    let precoBase = precos[numMusicas];
    
    // Acréscimo de antecedência (apenas para até 4 músicas)
    let acrescimoAnted = 0;
    if (antecedencia === 10 && numMusicas <= 4) {
        acrescimoAnted = precoBase * 0.10;
    }

    // Custo de deslocação
    let custoDeslocacao = 0;
    if (distancia > 10) {
        custoDeslocacao = (distancia - 10) * 0.30;
    }

    // Total
    const total = precoBase + acrescimoAnted + custoDeslocacao + pedagio;

    // Atualizar display
    document.getElementById('precoBase').textContent = precoBase.toFixed(2) + ' €';
    document.getElementById('acrescimoAnted').textContent = acrescimoAnted.toFixed(2) + ' €';
    document.getElementById('deslocacao').textContent = custoDeslocacao.toFixed(2) + ' €';
    document.getElementById('pedagioTotal').textContent = pedagio.toFixed(2) + ' €';
    document.getElementById('total').textContent = total.toFixed(2) + ' €';
}

// Função para submeter o formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const musicas = document.getElementById('musicas').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validar campos obrigatórios
    if (!nome || !email || !data || !local || !musicas) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Criar mensagem de confirmação
    const mensagemConfirmacao = document.getElementById('formNote');
    mensagemConfirmacao.textContent = '✓ Solicitação enviada com sucesso! Entraremos em contacto em breve.';
    mensagemConfirmacao.style.color = '#27ae60';

    // Log dos dados (em produção, seria enviado para um servidor)
    console.log({
        nome,
        email,
        telefone,
        data,
        local,
        musicas,
        mensagem,
        dataEnvio: new Date().toLocaleString('pt-PT')
    });

    // Limpar formulário após 2 segundos
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        mensagemConfirmacao.textContent = '';
    }, 3000);
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicializar calculadora ao carregar a página
window.addEventListener('load', function() {
    calcularOrcamento();
});

// Validação em tempo real para o campo de distância
document.getElementById('distancia').addEventListener('keypress', function(e) {
    // Apenas permitir números
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

// Destacar células da tabela de preços ao passar o rato
const tableRows = document.querySelectorAll('.pricing-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
