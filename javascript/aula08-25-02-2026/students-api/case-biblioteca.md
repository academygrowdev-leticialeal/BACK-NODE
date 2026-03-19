## Case: Sistema de Biblioteca

Uma pequena biblioteca deseja um sistema simples para controlar **livros, usuários e empréstimos**.

A biblioteca possui vários livros cadastrados. Usuários podem se registrar na biblioteca e realizar empréstimos de livros. Cada empréstimo possui uma data de retirada e uma data prevista de devolução.

### Regras do sistema

1. Um **usuário** pode pegar vários livros emprestados.
2. Um **livro** pode estar:

   * disponível
   * emprestado
3. Um **empréstimo** registra:

   * qual usuário pegou o livro
   * qual livro foi emprestado
   * data do empréstimo
   * data prevista de devolução
   * data real de devolução
4. Um livro **não pode ser emprestado se já estiver emprestado**.
5. Um usuário pode ter **no máximo 3 livros emprestados ao mesmo tempo, caso seja um usuário cliente**. Caso seja usuário premium, o número máximo não existe.
6. Quando o livro é devolvido, ele volta a ficar **disponível**.

