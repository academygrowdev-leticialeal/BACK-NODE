## Case (nível júnior): Matrículas e Boletim Simplificado

Uma escola de cursos livres quer um sistema simples para organizar suas **turmas** e permitir que **alunos** se matriculem. 

✅ O sistema deve registrar **notas** e **frequência** para, ao final, gerar um **boletim** com a situação do aluno em cada turma.

✅ A escola oferece várias **disciplinas** (ex.: “Lógica de Programação”, “HTML e CSS”, “POO”). 

✅ A cada semestre, a escola abre uma ou mais **turmas** para cada disciplina. 

✅ Cada turma possui um **professor responsável**, um número máximo de vagas e um período (ex.: “2026/1”).

Os alunos podem consultar turmas disponíveis e realizar matrícula. 

Durante o semestre, o professor registra as notas e a frequência de cada aluno matriculado. (somente a partir da classe Professor deve ser possível registrar nota e frequencia para uma matricula)

✅ Ao final, o sistema calcula a situação do aluno naquela turma.

---

### Regras de negócio

* ✅ Uma **disciplina** pode ter várias **turmas** (em semestres diferentes).
* ✅ Cada **turma**:

  * pertence a **uma disciplina**
  * tem **um professor**
  * tem **limite de vagas**
  * possui um **status**: `ABERTA` ou `ENCERRADA`
* Um **aluno** pode se matricular em várias turmas.
* ✅ Para cada matrícula, o sistema deve guardar:

  * Nota 1 (0 a 10)
  * Nota 2 (0 a 10)
  * Frequência (0% a 100%)
  * Situação: `CURSANDO`, `APROVADO`, `REPROVADO`, `TRANCADO`

* ✅ A turma **só aceita matrícula** se estiver `ABERTA` e ainda houver vaga.


* Um aluno pode ter **no máximo 3 matrículas ativas** ao mesmo tempo (situação `CURSANDO`).
* ✅ Regras para situação final (ao encerrar a turma):

  * Média = (N1 + N2) / 2
  * `APROVADO` se média ≥ 7 **e** frequência ≥ 75%
  * `REPROVADO` caso contrário
* ✅ O aluno pode **trancar** uma matrícula enquanto a turma estiver `ABERTA`. 

* Ao trancar, a matrícula deixa de contar como ativa e a vaga é liberada.

---

### Funcionalidades esperadas

* Cadastro básico de: **disciplinas, turmas, professores, alunos**.
* Matrícula de aluno em turma (respeitando as regras).
* Registro de notas e frequência de alunos matriculados (feito pelo professor).
* Encerramento de turma (ao encerrar, definir situação final dos alunos ainda “cursando”).
* Consulta de boletim do aluno (lista turmas + notas + frequência + situação).

---

### Critérios do desafio

A solução deve representar o domínio acadêmico e as regras de negócio de forma clara, permitindo:

* evoluir o sistema futuramente (ex.: adicionar prova substitutiva, recuperação, pré-requisito)
* manter as regras centralizadas e coerentes (evitar espalhar validações em vários lugares)

