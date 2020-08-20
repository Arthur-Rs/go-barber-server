# Macro

## Recuperação de senha

  **RF**
  - O usuário deve poder recuperar sua senha, informando seu email
  - O usuário deve receber um email com as instruções para recuperar a senha
  - O usuário deve poder resetar sua senha

  **RNF**

  - Utilizar mailtrap para em modo de desenvolvimento
  - Utilizar Amazon SES para em modo de produção
  - O envio de email deve ser feito em 2 plano (Background Job)

  **RN**

  - O link de recuperação de email deve durar 2 horas para clicar com o link
  - O usuário precisa confirmar a nova senha

## Atualização do perfil

   **RF**
  - O usuário deve poder atualizar seu perfil (name, avatar, email e senha)

  **RN**

  - O usuário não poder alterar seu email para um email existente na aplicação
  - Para atualizar a senha o usuário deve informa a senha antiga
  - Para atualizar a senha o usuário deve confirmar a nova senha

## Pinel do administrador

  **RF**

  - O usuário deve poder listar os agendamentos de um dia especifico
  - O prestador deve receber uma notificação sempre que hover um agendamento
  - O Prestador deve poder visualizar as notificações não lidas.

  **RNF**

  - Os agendamentos do prestador de serviço devem ser armazenado em cache
  - As notificações do prestador devem ser armazenada no mongoDB
  - As notificações  do prestador devem ser enviado por Socket.io

  **RD**

  - A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar
  

## Agendamento de serviço

   **RF**
  - O usuário não poder listar todos os prestadores cadastrados
  - O usuário deve poder os dias listas de um mês com palomenos um horário disponível de um determinado prestador de serviço
  - O usuário deve poder listar horários disponíveis em um dia 
  - O usuário deve poder realizar um novo agendamento com o prestador

  **RNF**

  - A listagem de prestadores devem ser armazenadas em cache

  **RN**

  - Cada agendamento deve durar 1 hora
  - Os agendamentos deve estar disponível entre 8hrs até as 18hrs (Primeiro horário ás 8hrs e o ultimo as 17hrs)
  - O usuário não pode agendar em um usuário já ocupado.
  - O usuário não pode agendar um horário que já passou.
  - O usuário não pode agendar com sigo mesmo.

