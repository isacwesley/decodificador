const encryptBtn = document.getElementById('encrypt'); // Obtém o botão de criptografia
const decryptBtn = document.getElementById('decrypt'); // Obtém o botão de descriptografia
const copyBtn = document.getElementById('copy'); // Obtém o botão de cópia
const matrixEncrypt = new Map([
   // Cria um mapa para as substituições de letras
   ['a', 'ai'],
   ['e', 'enter'],
   ['i', 'imes'],
   ['o', 'ober'],
   ['u', 'ufat'],
]);
const outputText = document.getElementById('output'); // Obtém o elemento de saída

// Adiciona um evento de clique ao botão de criptografia
encryptBtn.addEventListener('click', () => {
   const inputText = document.getElementById('input').value; // Obtém o texto de entrada
   // Criptografa o texto de entrada, substituindo cada letra pelo seu código no mapa
   const encryptedText = [...inputText].reduce(
      (acc, char) => acc + (matrixEncrypt.get(char) || char),
      ''
   );
   outputText.value = encryptedText; // Atribui o texto criptografado ao elemento de saída
   // Oculta os elementos de saída não usados
   document.querySelector('.text-output__img').style.display = 'none';
   document.querySelector('.text-output__nocoding').style.display = 'none';
   // Exibe o elemento de saída com o texto criptografado
   document.querySelector('.text-output__encoded-text').style.display = 'flex';
});

// Adiciona um evento de clique ao botão de descriptografia
decryptBtn.addEventListener('click', () => {
   const inputText = document.getElementById('input').value; // Obtém o texto de entrada
   let decryptText = inputText; // Inicializa o texto descriptografado como sendo o texto de entrada
   // Descriptografa o texto, substituindo cada código pelo seu caractere original no mapa
   matrixEncrypt.forEach((encoded, char) => {
      if (decryptText.includes(encoded)) {
         do {
            decryptText = decryptText.replace(encoded, char);
         } while (decryptText.includes(encoded));
      }
   });
   outputText.value = decryptText; // Atribui o texto descriptografado ao elemento de saída
});

(async function () {
   // Tempo de reset do botão Copiar
   const COPY_BUTTON_RESET_TIME = 2000;
   // Função que copia o texto fornecido para o clipboard
   async function copyToClipboard(text) {
      try {
         // Utiliza a API do clipboard para escrever o texto no clipboard
         await navigator.clipboard.writeText(text);
         // Retorna verdadeiro se a cópia foi bem-sucedida
         return true;
      } catch (error) {
         // Em caso de erro, exibe uma mensagem de erro no console
         console.error('Error copying text: ', error);
         // Retorna falso se a cópia não foi bem-sucedida
         return false;
      }
   }
   // Função que é chamada ao clicar no botão Copiar
   async function handleCopyClick() {
      // Chama a função copyToClipboard para copiar o texto para o clipboard
      const isCopied = await copyToClipboard(outputText.value);
      const selectedLanguage = document.querySelector(
         'input[name="language"]:checked'
      ).value;
      // Se a cópia foi bem-sucedida
      if (isCopied) {
         // Adiciona a classe 'copied' ao botão
         copy.classList.add('copied');
         // Altera o texto do botão para "Copiado"
         copy.textContent = translate('btnCopySucess', selectedLanguage);
      } else {
         // Adiciona a classe 'error-copied' ao botão
         copy.classList.add('error-copied');
         // Altera o texto do botão para "Erro ao copiar"
         copy.textContent = translate('btnCopyFail', selectedLanguage);
      }
      // Configura um temporizador para remover as classes e resetar o texto do botão após o tempo de reset
      setTimeout(() => {
         copy.classList.remove('copied', 'error-copied');
         copy.textContent = translate('btnCopy', selectedLanguage);
      }, COPY_BUTTON_RESET_TIME);
   }
   // Verifica se a API do clipboard está disponível
   if (navigator.clipboard) {
      // Adiciona um evento de clique para o botão Copiar
      copy.addEventListener('click', handleCopyClick);
   } else {
      // Em caso de erro, exibe uma mensagem de erro no console
      console.error('A API da área de transferência não está disponível.');
   }
})();

// Declaração do objeto de tradução, com as traduções em português e inglês
const translation = {
   portuguese: {
      btnEncrypt: 'Criptografar',
      btnDecrypt: 'Descriptografar',
      btnCopy: 'Copiar!',
      span: 'Apenas letras minúsculas e sem acento',
      pTitle: 'Nenhuma mensagem encontrada',
      pSubtitle:
         'Digite um texto que você deseja criptografar ou descriptografar',
      placeholderInput: 'Digite seu texto',
      btnCopySucess: 'Copiado!',
      btnCopyFail: 'Erro ao copiar!',
   },
   english: {
      btnEncrypt: 'Encrypt',
      btnDecrypt: 'Decrypt',
      btnCopy: 'Copy!',
      span: 'Only lowercase letters and no accent',
      pTitle: 'No message found',
      pSubtitle: 'Enter text that you want to encrypt or decrypt',
      placeholderInput: 'Enter your text',
      btnCopySucess: 'Copied!',
      btnCopyFail: 'Error copying!',
   },
};

// Selecionando todos os inputs de radio com o nome "language"
const languageRadios = document.querySelectorAll('input[name="language"]');

// Adicionando um evento de mudança em cada um desses inputs de radio
languageRadios.forEach((radio) => {
   radio.addEventListener('change', updateTranslation);
});

// Função que será executada quando houver mudança no input de radio
function updateTranslation() {
   // Selecionando elementos HTML que serão atualizados com as traduções
   const span = document.querySelector('#span');
   const textOutputTitle = document.querySelector('#text-output__1');
   const textOutputSubtitle = document.querySelector('#text-output__2');
   const input = document.querySelector('#input[placeholder]');

   // Verificando qual é o valor selecionado no input de radio
   const selectedLanguage = document.querySelector(
      'input[name="language"]:checked'
   ).value;

   // Atualizando o conteúdo dos elementos HTML com as traduções correspondentes
   encryptBtn.textContent = translate('btnEncrypt', selectedLanguage);
   decryptBtn.textContent = translate('btnDecrypt', selectedLanguage);
   copyBtn.textContent = translate('btnCopy', selectedLanguage);
   span.textContent = translate('span', selectedLanguage);
   textOutputTitle.textContent = translate('pTitle', selectedLanguage);
   textOutputSubtitle.textContent = translate('pSubtitle', selectedLanguage);
   input.placeholder = translate('placeholderInput', selectedLanguage);
}

// Função que retorna a tradução correspondente para o texto e o idioma informados
function translate(text, lang) {
   return translation[lang][text];
}
