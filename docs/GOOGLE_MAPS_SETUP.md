# Configurar Google Maps API

Para ativar o cálculo automático de distâncias com Google Maps, siga estes passos:

## 1️⃣ Criar Chave de API do Google

1. Vá a [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá a **APIs & Services** → **Credentials**
4. Clique em **Create Credentials** → **API Key**
5. Copie a chave gerada

## 2️⃣ Ativar as APIs Necessárias

No mesmo console, ative:
- **Maps JavaScript API**
- **Places API**
- **Distance Matrix API**

## 3️⃣ Atualizar o Código

Abra o ficheiro `index.html` e encontre esta linha:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places" async defer></script>
```

Substitua `YOUR_GOOGLE_API_KEY` pela sua chave real. Exemplo:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxYxcvXxXxXxXxXxXxXxXxXxXxXxXxXxX&libraries=places" async defer></script>
```

## 4️⃣ Pronto!

Agora quando o utilizador escrever um local, o Google Maps vai:
- ✅ Autocompletar endereços
- ✅ Calcular a distância real até Condeixa-a-Nova
- ✅ Atualizar o orçamento automaticamente

## 📝 Notas Importantes

- **Segurança**: Se possível, restrinja a chave apenas a domínios específicos (nas opções de restrição da chave)
- **Quota**: O Google oferece crédito gratuito. Verifique o uso em [Google Cloud Console](https://console.cloud.google.com/billing)
- **Fallback**: Se a API falhar, o sistema usa as distâncias pré-definidas
