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

// Ponto de partida (Condeixa-a-Nova)
const ORIGEM = 'Condeixa-a-Nova, Portugal';

// Tabela de distâncias de Condeixa-a-Nova para cada distrito/cidade (km)
const distancias = {
    // Distrito (capitais)
    'aveiro': 100,
    'beja': 350,
    'braga': 220,
    'bragança': 380,
    'castelo branco': 100,
    'covilhã': 80,
    'évora': 280,
    'faro': 500,
    'guarda': 80,
    'leiria': 50,
    'lisboa': 200,
    'portalegre': 180,
    'porto': 150,
    'santarém': 120,
    'setúbal': 230,
    'viana do castelo': 280,
    'vila real': 300,
    'viseu': 120,
    'coimbra': 25,
    // Cidades principais
    'figueira da foz': 60,
    'mealhada': 20,
    'penela': 30,
    'miranda do corvo': 40,
    'góis': 35,
    'tábua': 45,
    'santa comba dão': 70,
    'oliveira do hospital': 50,
    'mangualde': 110,
    'nelas': 80,
    'arganil': 40,
    'pampilhosa da serra': 60,
    'ansião': 35,
    'pedrógão grande': 55,
    'piódão': 50,
    // Distritos alternativas (maiores cidades)
    'ovar': 110,
    'espinho': 125,
    'santa maria da feira': 130,
    'albergaria-a-velha': 95,
    'águeda': 85,
    'oliveira de azeméis': 120,
    'arouca': 110,
    'feira': 130,
    'sátão': 100,
    'lamego': 150,
    'régua': 140,
    'peso da régua': 140,
    'torres vedras': 170,
    'alenquer': 180,
    'óbidos': 140,
    'caldas da rainha': 120,
    'nazaré': 110,
    'alcobaça': 130,
    'batalha': 95,
    'porto de mós': 80,
    'tomar': 100,
    'ferreira do zêzere': 90,
    'abrantes': 140,
    'sardoal': 100,
    'constância': 130,
    'vila de rei': 110,
    'montemor-o-novo': 250,
    'estremoz': 260,
    'borba': 280,
    'reguengos de monsaraz': 320,
    'moura': 360,
    'serpa': 380,
    'mértola': 420,
    'odemira': 380,
    'aljezur': 450,
    'silves': 480,
    'albufeira': 490,
    'loulé': 480,
    'olhão': 500,
    'tavira': 520,
    'cacém': 210,
    'queluz': 205,
    'sintra': 215,
    'mafra': 230,
    'ericeira': 240,
    'cascais': 220,
    'oeiras': 205,
    'almada': 215,
    'caparica': 225,
    'sesimbra': 250,
    'alcácer do sal': 280,
    'grândola': 300,
    'sines': 320,
    'santiago do cacém': 330
};

// Função para obter sugestões de cidades
function obterSugestoes(input) {
    const valor = input.toLowerCase().trim();
    if (valor.length < 2) return [];
    
    return Object.keys(distancias).filter(cidade => 
        cidade.includes(valor)
    ).slice(0, 8);
}

// Função para atualizar sugestões
function atualizarSugestoes() {
    const input = document.getElementById('localEvento');
    const listaSugestoes = document.getElementById('sugestoesCidades');
    const valor = input.value;
    
    if (valor.length < 2) {
        listaSugestoes.style.display = 'none';
        return;
    }
    
    const sugestoes = obterSugestoes(valor);
    
    if (sugestoes.length === 0) {
        listaSugestoes.style.display = 'none';
        return;
    }
    
    listaSugestoes.innerHTML = sugestoes.map(cidade => 
        `<div class="sugestao-item" onclick="selecionarCidade('${cidade}')">${cidade.charAt(0).toUpperCase() + cidade.slice(1)} (${distancias[cidade]} km)</div>`
    ).join('');
    
    listaSugestoes.style.display = 'block';
}

// Função para atualizar sugestões no formulário
function atualizarSugestoesForm() {
    const input = document.getElementById('local');
    const listaSugestoes = document.getElementById('sugestoesCidadesForm');
    const valor = input.value;
    
    if (valor.length < 2) {
        listaSugestoes.style.display = 'none';
        return;
    }
    
    const sugestoes = obterSugestoes(valor);
    
    if (sugestoes.length === 0) {
        listaSugestoes.style.display = 'none';
        return;
    }
    
    listaSugestoes.innerHTML = sugestoes.map(cidade => 
        `<div class="sugestao-item" onclick="selecionarCidadeForm('${cidade}')">${cidade.charAt(0).toUpperCase() + cidade.slice(1)} (${distancias[cidade]} km)</div>`
    ).join('');
    
    listaSugestoes.style.display = 'block';
}

// Função para selecionar uma cidade
function selecionarCidade(cidade) {
    document.getElementById('localEvento').value = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    document.getElementById('distanciaCalculada').value = distancias[cidade.toLowerCase()];
    document.getElementById('sugestoesCidades').style.display = 'none';
    calcularOrcamento();
}

// Função para selecionar uma cidade no formulário
function selecionarCidadeForm(cidade) {
    document.getElementById('local').value = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    document.getElementById('sugestoesCidadesForm').style.display = 'none';
}

// Função para atualizar disponibilidade de músicas conforme antecedência
function atualizarMusicasDisponiveis() {
    const antecedencia = parseInt(document.getElementById('antecedencia').value);
    const numMusicasSelect = document.getElementById('numMusicas');
    
    // Limpar todas as opções primeiro
    numMusicasSelect.innerHTML = '';
    
    // Adicionar opções conforme antecedência
    if (antecedencia === 10) {
        // 2-3 meses: apenas até 4 músicas
        numMusicasSelect.innerHTML = `
            <option value="1">1 música - 40 €</option>
            <option value="2">2 músicas - 76 € (38 € cada)</option>
            <option value="3">3 músicas - 108 € (36 € cada)</option>
            <option value="4">4 músicas - 136 € (34 € cada)</option>
        `;
    } else {
        // 3+ meses: todas as opções
        numMusicasSelect.innerHTML = `
            <option value="1">1 música - 40 €</option>
            <option value="2">2 músicas - 76 € (38 € cada)</option>
            <option value="3">3 músicas - 108 € (36 € cada)</option>
            <option value="4">4 músicas - 136 € (34 € cada)</option>
            <option value="5">5 músicas - 160 € (32 € cada) ⭐</option>
            <option value="6">6 músicas - 180 € (30 € cada) ⭐</option>
        `;
    }
    
    calcularOrcamento();
}

// Função para calcular o orçamento
function calcularOrcamento() {
    const numMusicas = parseInt(document.getElementById('numMusicas').value);
    const antecedencia = parseInt(document.getElementById('antecedencia').value);
    const distancia = parseInt(document.getElementById('distanciaCalculada').value) || 0;
    
    // Obter valor de pedágio
    let pedagio = parseFloat(document.getElementById('pedagio').value) || 0;

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

    // Calcular o preço total
    const numMusicas = parseInt(musicas);
    const precoBase = precos[numMusicas];
    
    // Obter dados da calculadora
    const antecedencia = parseInt(document.getElementById('antecedencia').value);
    const distancia = parseInt(document.getElementById('distanciaCalculada').value) || 0;
    const pedagogioSelect = document.getElementById('pedagio').value;
    
    let pedagio = 0;
    if (pedagogioSelect === 'custom') {
        pedagio = parseFloat(document.getElementById('pedagogioCustom').value) || 0;
    } else {
        pedagio = parseFloat(pedagogioSelect) || 0;
    }
    
    let acrescimoAnted = 0;
    if (antecedencia === 10 && numMusicas <= 4) {
        acrescimoAnted = precoBase * 0.10;
    }
    
    let custoDeslocacao = 0;
    if (distancia > 10) {
        custoDeslocacao = (distancia - 10) * 0.30;
    }
    
    const precoTotal = precoBase + acrescimoAnted + custoDeslocacao + pedagio;

    // Criar objeto de solicitação
    const solicitacao = {
        id: Date.now(),
        nome,
        email,
        telefone,
        data,
        local,
        musicas: numMusicas,
        mensagem,
        precoBase,
        acrescimoAnted,
        custoDeslocacao,
        pedagio,
        precoTotal,
        dataEnvio: new Date().toLocaleString('pt-PT')
    };

    // Guardar no localStorage (para painel admin oculto)
    let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
    solicitacoes.push(solicitacao);
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    // Enviar email
    enviarEmail(solicitacao);

    // Criar mensagem de confirmação
    const mensagemConfirmacao = document.getElementById('formNote');
    mensagemConfirmacao.textContent = '✓ Solicitação enviada com sucesso! Entraremos em contacto em breve.';
    mensagemConfirmacao.style.color = '#27ae60';

    console.log('Solicitação guardada:', solicitacao);

    // Limpar formulário após 2 segundos
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        mensagemConfirmacao.textContent = '';
    }, 3000);
});

// Função para enviar email
function enviarEmail(solicitacao) {
    // Inicializar EmailJS (se não foi já inicializado)
    if (!window.emailJSInitialized) {
        emailjs.init(A2J-Q1oKeyuddbelR); // Será configurado
        window.emailJSInitialized = true;
    }

    const templateParams = {
        to_email: 'pietro.dacruz2012@gmail.com',
        cliente_nome: solicitacao.nome,
        cliente_email: solicitacao.email,
        cliente_telefone: solicitacao.telefone || 'Não fornecido',
        evento_data: solicitacao.data,
        evento_local: solicitacao.local,
        num_musicas: solicitacao.musicas,
        preco_base: solicitacao.precoBase.toFixed(2),
        acrescimo_antecedencia: solicitacao.acrescimoAnted.toFixed(2),
        custo_deslocacao: solicitacao.custoDeslocacao.toFixed(2),
        pedagio: solicitacao.pedagio.toFixed(2),
        preco_total: solicitacao.precoTotal.toFixed(2),
        mensagem_cliente: solicitacao.mensagem || 'Sem mensagem',
        data_envio: solicitacao.dataEnvio
    };

    emailjs.send(service_sn8vyvc, template_cautrsu, templateParams)
        .then(function(response) {
            console.log('Email enviado com sucesso:', response);
        })
        .catch(function(error) {
            console.error('Erro ao enviar email:', error);
            // Não mostrar erro ao utilizador, já que a solicitação foi guardada
        });
}

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
document.getElementById('distanciaCalculada').addEventListener('keypress', function(e) {
    // Apenas permitir números
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

// Fechar sugestões quando clica fora
document.addEventListener('click', function(e) {
    if (e.target.id !== 'localEvento' && e.target.id !== 'local' && e.target.className !== 'sugestao-item') {
        document.getElementById('sugestoesCidades').style.display = 'none';
        document.getElementById('sugestoesCidadesForm').style.display = 'none';
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

// ===== FUNÇÕES DE ADMIN =====

// Senha do admin (pode ser alterada)
const ADMIN_PASSWORD = 'pietro2025';

// Abrir painel de login
function abrirAdmin() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Fechar login
function fecharLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('senha').value = '';
}

// Verificar senha
function verificarSenha() {
    const senha = document.getElementById('senha').value;
    if (senha === ADMIN_PASSWORD) {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('admin').style.display = 'block';
        document.getElementById('contact').style.display = 'none';
        mostrarSolicitacoes();
        document.getElementById('senha').value = '';
    } else {
        alert('Senha incorreta!');
    }
}

// Mostrar solicitações
function mostrarSolicitacoes() {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
    const lista = document.getElementById('solicitacoesList');
    
    if (solicitacoes.length === 0) {
        lista.innerHTML = '<p>Nenhuma solicitação ainda.</p>';
        return;
    }
    
    lista.innerHTML = solicitacoes.map(sol => `
        <div class="solicitacao-card">
            <div class="solicitacao-header">
                <h4>${sol.nome}</h4>
                <span class="data">${sol.dataEnvio}</span>
            </div>
            <div class="solicitacao-body">
                <p><strong>Email:</strong> ${sol.email}</p>
                <p><strong>Telefone:</strong> ${sol.telefone || 'Não fornecido'}</p>
                <p><strong>Data do Evento:</strong> ${sol.data}</p>
                <p><strong>Local:</strong> ${sol.local}</p>
                <p><strong>Número de Músicas:</strong> ${sol.musicas}</p>
                ${sol.mensagem ? `<p><strong>Mensagem:</strong> ${sol.mensagem}</p>` : ''}
            </div>
            <div class="solicitacao-preco">
                <p>Preço Base: <strong>${sol.precoBase.toFixed(2)} €</strong></p>
                ${sol.acrescimoAnted > 0 ? `<p>Acréscimo Antecedência: <strong>${sol.acrescimoAnted.toFixed(2)} €</strong></p>` : ''}
                ${sol.custoDeslocacao > 0 ? `<p>Deslocação: <strong>${sol.custoDeslocacao.toFixed(2)} €</strong></p>` : ''}
                ${sol.pedagio > 0 ? `<p>Pedágio: <strong>${sol.pedagio.toFixed(2)} €</strong></p>` : ''}
                <p class="total"><strong>Total: ${sol.precoTotal.toFixed(2)} €</strong></p>
            </div>
            <button onclick="deletarSolicitacao(${sol.id})" class="btn-delete">🗑️ Deletar</button>
        </div>
    `).join('');
}

// Deletar solicitação
function deletarSolicitacao(id) {
    if (confirm('Tem a certeza que quer deletar esta solicitação?')) {
        let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
        solicitacoes = solicitacoes.filter(s => s.id !== id);
        localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
        mostrarSolicitacoes();
    }
}

// Logout
function logout() {
    document.getElementById('admin').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
    window.location.hash = '#home';
}
