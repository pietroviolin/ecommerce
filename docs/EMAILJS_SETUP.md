# Configurar Email com EmailJS

Para que as solicitações sejam automaticamente enviadas para `pietro.dacruz2012@gmail.com`, siga estes passos:

## 1️⃣ Criar Conta EmailJS

1. Vá a [EmailJS.com](https://www.emailjs.com/)
2. Clique em **Sign Up** e crie uma conta gratuita
3. Verifique o email

## 2️⃣ Conectar o Gmail

1. No painel do EmailJS, vá a **Email Services**
2. Clique em **Add New Service** → **Gmail**
3. Selecione **Connect With Gmail**
4. Autorize o acesso
5. Copie o **Service ID** (ex: `service_abc123`)

## 3️⃣ Criar Template de Email

1. Vá a **Email Templates**
2. Clique em **Create New Template**
3. Configure assim:

**Template Name**: `solicitacao_violino`

**Template ID**: `solicitacao_violino` (pode ser qualquer nome)

**Email Subject**:
```
Nova Solicitação de Violino - {{cliente_nome}}
```

**Email Content** (HTML):
```html
<h2>Nova Solicitação de Serviço</h2>

<h3>Dados do Cliente</h3>
<p><strong>Nome:</strong> {{cliente_nome}}</p>
<p><strong>Email:</strong> {{cliente_email}}</p>
<p><strong>Telefone:</strong> {{cliente_telefone}}</p>

<h3>Detalhes do Evento</h3>
<p><strong>Data:</strong> {{evento_data}}</p>
<p><strong>Local:</strong> {{evento_local}}</p>
<p><strong>Número de Músicas:</strong> {{num_musicas}}</p>

<h3>Orçamento</h3>
<table style="border-collapse: collapse; width: 100%; margin: 1rem 0;">
    <tr style="background-color: #f5f5f5;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Preço Base</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;text-align: right;">{{preco_base}} €</td>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Acréscimo Antecedência</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;text-align: right;">{{acrescimo_antecedencia}} €</td>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Deslocação</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;text-align: right;">{{custo_deslocacao}} €</td>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Pedágio</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;text-align: right;">{{pedagio}} €</td>
    </tr>
    <tr style="background-color: #8B4789; color: white;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>TOTAL</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;text-align: right;"><strong>{{preco_total}} €</strong></td>
    </tr>
</table>

<h3>Observações</h3>
<p>{{mensagem_cliente}}</p>

<hr>
<p style="color: #666; font-size: 12px;">
Solicitação enviada em: {{data_envio}}
</p>
```

4. Clique em **Save**
5. Copie o **Template ID** (vai aparecer na página)

## 4️⃣ Obter Public Key

1. Vá a **Account** → **API Keys**
2. Copie a **Public Key**

## 5️⃣ Atualizar o Código

Abra o ficheiro `script.js` e encontre estas duas linhas:

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); 
```

e

```javascript
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
```

Substitua:
- `YOUR_PUBLIC_KEY` → Sua Public Key do EmailJS
- `YOUR_SERVICE_ID` → Seu Service ID do Gmail
- `YOUR_TEMPLATE_ID` → `solicitacao_violino`

Exemplo:
```javascript
emailjs.init("abc123def456xyz");
emailjs.send("service_xyz789", "solicitacao_violino", templateParams)
```

## ✅ Pronto!

Agora quando alguém enviar uma solicitação:
- ✅ Receberá no email `pietro.dacruz2012@gmail.com`
- ✅ Será guardada também no localStorage (painel admin oculto com Ctrl+Shift+A)
- ✅ Inclui o orçamento completo calculado

## 🔐 Segurança

- A Public Key é segura para ser exposta no código
- O Service ID também é público
- Nenhuma informação sensível é comprometida
