
# User Front-end

Front-end da User API, permitindo cadastro, login e visualização de perfil com sistema de link de indicação.

## Funcionalidades

- Formulário de cadastro com validação de nome, e-mail e senha
- Login com autenticação JWT
- Página de perfil do usuário mostrando:
  - Nome do usuário
  - Pontuação atual
  - Link de indicação único
- Botão "Copiar Link"
- Botão de “Sair” para encerrar sessão
- Responsivo e minimalista

## Ferramentas

- HTML: estrutura das páginas
- CSS: estilo e layout
- JavaScript: funcionalidades e interatividade
- Railway: hospedagem da API, Front e do banco de dados em nuvem

Essas escolhas foram feitas para manter o projeto leve, moderno, funcional e fácil de manter, sem dependências externas complexas.

## Acesso ao projeto

O Front está hospedada no Railway e disponível publicamente:

https://user-front-production-5bb6.up.railway.app/
    

## Colaboração com IA

Durante o desenvolvimento desta API, contei com o auxílio de ferramentas de IA para otimizar diferentes aspectos do projeto, principalmente para ajudar na implementação do script.js. Eu utilizei apenas o ChatGPT e os principais pontos são:

- Conectar corretamente os formulários de cadastro e login à API
- Tratar respostas da API, armazenar token e redirecionar para a página de perfil
- Implementar a lógica de toasts, copiar link de indicação e alternância de abas

#### Aprendizado e boas práticas
- A IA me ajudou a organizar a integração com a API de forma segura e eficiente, garantindo que os fluxos de autenticação e perfil funcionassem corretamente.
