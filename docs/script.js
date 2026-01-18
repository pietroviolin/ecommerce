// Tabela de preços base
const precos = {
    1: 40,
    2: 76,
    3: 108,
    4: 136,
    5: 160,
    6: 180
};

// Tabela de distâncias e pedágios
const locais = {
    // Distrito (capitais)
    'aveiro': { distancia: 100, pedagio: 10.15 },
    'beja': { distancia: 350, pedagio: 45 },
    'braga': { distancia: 220, pedagio: 25 },
    'bragança': { distancia: 380, pedagio: 50 },
    'castelo branco': { distancia: 100, pedagio: 11.30 },
    'covilhã': { distancia: 80, pedagio: 8.75 },
    'évora': { distancia: 280, pedagio: 35 },
    'faro': { distancia: 500, pedagio: 65 },
    'guarda': { distancia: 80, pedagio: 9.20 },
    'leiria': { distancia: 50, pedagio: 5.85 },
    'lisboa': { distancia: 200, pedagio: 20 },
    'portalegre': { distancia: 180, pedagio: 18 },
    'porto': { distancia: 150, pedagio: 15.20 },
    'santarém': { distancia: 120, pedagio: 12 },
    'setúbal': { distancia: 230, pedagio: 28 },
    'viana do castelo': { distancia: 280, pedagio: 32 },
    'vila real': { distancia: 300, pedagio: 38 },
    'viseu': { distancia: 120, pedagio: 12.50 },
    'coimbra': { distancia: 25, pedagio: 0 },
    // Cidades principais
    'figueira da foz': { distancia: 60, pedagio: 6.50 },
    'mealhada': { distancia: 20, pedagio: 0 },
    'penela': { distancia: 30, pedagio: 2 },
    'miranda do corvo': { distancia: 40, pedagio: 3 },
    'góis': { distancia: 35, pedagio: 2.50 },
    'tábua': { distancia: 45, pedagio: 4 },
    'santa comba dão': { distancia: 70, pedagio: 7 },
    'oliveira do hospital': { distancia: 50, pedagio: 4.50 },
    'mangualde': { distancia: 110, pedagio: 11 },
    'nelas': { distancia: 80, pedagio: 8 },
    'arganil': { distancia: 40, pedagio: 3 },
    'pampilhosa da serra': { distancia: 60, pedagio: 6 },
    'ansião': { distancia: 35, pedagio: 2.50 },
    'pedrógão grande': { distancia: 55, pedagio: 5.50 },
    'piódão': { distancia: 50, pedagio: 4.50 },
    // Distritos alternativas
    'ovar': { distancia: 110, pedagio: 11 },
    'espinho': { distancia: 125, pedagio: 12.50 },
    'santa maria da feira': { distancia: 130, pedagio: 13 },
    'albergaria-a-velha': { distancia: 95, pedagio: 9.50 },
    'águeda': { distancia: 85, pedagio: 8.50 },
    'oliveira de azeméis': { distancia: 120, pedagio: 12 },
    'arouca': { distancia: 110, pedagio: 11 },
    'sátão': { distancia: 100, pedagio: 10 },
    'lamego': { distancia: 150, pedagio: 15 },
    'régua': { distancia: 140, pedagio: 14 },
    'peso da régua': { distancia: 140, pedagio: 14 },
    'torres vedras': { distancia: 170, pedagio: 17 },
    'alenquer': { distancia: 180, pedagio: 18 },
    'óbidos': { distancia: 140, pedagio: 14 },
    'caldas da rainha': { distancia: 120, pedagio: 12 },
    'nazaré': { distancia: 110, pedagio: 11 },
    'alcobaça': { distancia: 130, pedagio: 13 },
    'batalha': { distancia: 95, pedagio: 9.50 },
    'porto de mós': { distancia: 80, pedagio: 8 },
    'tomar': { distancia: 100, pedagio: 10 },
    'ferreira do zêzere': { distancia: 90, pedagio: 9 },
    'abrantes': { distancia: 140, pedagio: 14 },
    'sardoal': { distancia: 100, pedagio: 10 },
    'constância': { distancia: 130, pedagio: 13 },
    'vila de rei': { distancia: 110, pedagio: 11 },
    'montemor-o-novo': { distancia: 250, pedagio: 30 },
    'estremoz': { distancia: 260, pedagio: 32 },
    'borba': { distancia: 280, pedagio: 35 },
    'reguengos de monsaraz': { distancia: 320, pedagio: 40 },
    'moura': { distancia: 360, pedagio: 45 },
    'serpa': { distancia: 380, pedagio: 48 },
    'mértola': { distancia: 420, pedagio: 55 },
    'odemira': { distancia: 380, pedagio: 48 },
    'aljezur': { distancia: 450, pedagio: 60 },
    'silves': { distancia: 480, pedagio: 65 },
    'albufeira': { distancia: 490, pedagio: 66 },
    'loulé': { distancia: 480, pedagio: 65 },
    'olhão': { distancia: 500, pedagio: 68 },
    'tavira': { distancia: 520, pedagio: 70 },
    'cacém': { distancia: 210, pedagio: 21 },
    'queluz': { distancia: 205, pedagio: 20.50 },
    'sintra': { distancia: 215, pedagio: 21.50 },
    'mafra': { distancia: 230, pedagio: 23 },
    'ericeira': { distancia: 240, pedagio: 24 },
    'cascais': { distancia: 220, pedagio: 22 },
    'oeiras': { distancia: 205, pedagio: 20.50 },
    'almada': { distancia: 215, pedagio: 21.50 },
    'caparica': { distancia: 225, pedagio: 22.50 },
    'sesimbra': { distancia: 250, pedagio: 30 },
    'alcácer do sal': { distancia: 280, pedagio: 35 },
    'grândola': { distancia: 300, pedagio: 38 },
    'sines': { distancia: 320, pedagio: 40 },
    'santiago do cacém': { distancia: 330, pedagio: 42 }
};

// Função para obter sugestões de cidades
function obterSugestoes(input) {
    if (!input || input.length === 0) return [];
    
    const valor = input.toLowerCase().trim();
    const matches = [];
    
    for (const cidade in locais) {
        if (cidade.includes(valor)) {
            matches.push(cidade);
        }
    }
    
    return matches.slice(0, 10);
}

// Função para atualizar sugestões
function atualizarSugestoes() {
    const input = document.getElementById('localEvento');
    const dropdown = document.getElementById('sugestoesCidades');
    const valor = input.value;
    
    if (!valor || valor.length === 0) {
        dropdown.innerHTML = '';
        dropdown.style.display = 'none';
        document.getElementById('localInfo').textContent = '';
        return;
    }
    
    const sugestoes = obterSugestoes(valor);
    
    if (sugestoes.length === 0) {
        dropdown.innerHTML = '';
        dropdown.style.display = 'none';
        return;
    }
    
    dropdown.innerHTML = sugestoes.map(cidade => {
        const info = locais[cidade];
        const nomeExibido = cidade.charAt(0).toUpperCase() + cidade.slice(1);
        return `<div class="sugestao-item" onclick="selecionarCidade('${cidade}')"><strong>${nomeExibido}</strong></div>`;
    }).join('');
    
    dropdown.style.display = 'block';
}

// Função para selecionar cidade
function selecionarCidade(cidade) {
    const info = locais[cidade];
    const nomeExibido = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    
    document.getElementById('localEvento').value = nomeExibido;
    document.getElementById('sugestoesCidades').innerHTML = '';
    document.getElementById('sugestoesCidades').style.display = 'none';
    document.getElementById('distanciaCalculada').value = info.distancia;
    document.getElementById('pedagioCalculado').value = info.pedagio;
    document.getElementById('localInfo').textContent = '';
    
    calcularOrcamento();
}

// Função para atualizar sugestões no formulário de contacto
function atualizarSugestoesForm() {
    const input = document.getElementById('local');
    const listaSugestoes = document.getElementById('sugestoesCidadesForm');
    const valor = input.value.toLowerCase();
    
    if (valor.length < 1) {
        listaSugestoes.style.display = 'none';
        return;
    }
    
    const sugestoes = obterSugestoes(valor);
    
    if (sugestoes.length === 0) {
        listaSugestoes.style.display = 'none';
        return;
    }
    
    listaSugestoes.innerHTML = sugestoes.map(cidade => {
        const info = locais[cidade];
        return `<div class="sugestao-item" onclick="selecionarCidadeForm('${cidade}')" style="cursor: pointer; padding: 8px; border-bottom: 1px solid #eee;"><strong>${cidade.charAt(0).toUpperCase() + cidade.slice(1)}</strong> (${info.distancia}km, ${info.pedagio.toFixed(2)}€)</div>`;
    }).join('');
    
    listaSugestoes.style.display = 'block';
}

// Função para selecionar cidade no formulário
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
    
    // Obter valor de pedágio calculado automaticamente
    let pedagio = parseFloat(document.getElementById('pedagioCalculado').value) || 0;

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
// Adicionar evento ao formulário quando o DOM estiver pronto
if (document.getElementById('contactForm')) {
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
        
        // Simplesmente usar preço base (sem descontos ou cálculos adicionais)
        // já que o formulário é apenas para contacto
        const precoTotal = precoBase;

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
            precoTotal,
            dataEnvio: new Date().toLocaleString('pt-PT')
        };

        // Guardar no localStorage (para painel admin oculto)
        let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
        solicitacoes.push(solicitacao);
        localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

        // Criar mensagem de confirmação
        const mensagemConfirmacao = document.getElementById('formNote');
        if (mensagemConfirmacao) {
            mensagemConfirmacao.textContent = '✓ Solicitação enviada com sucesso! Entraremos em contacto em breve.';
            mensagemConfirmacao.style.color = '#27ae60';
        }

        console.log('Solicitação guardada:', solicitacao);

        // Limpar formulário após 3 segundos
        setTimeout(() => {
            const form = document.getElementById('contactForm');
            if (form) {
                form.reset();
            }
            if (mensagemConfirmacao) {
                mensagemConfirmacao.textContent = '';
            }
        }, 3000);
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
                <p class="total"><strong>Preço: ${sol.precoTotal.toFixed(2)} €</strong></p>
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
