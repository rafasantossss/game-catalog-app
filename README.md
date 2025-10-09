App de Cadastro e Consulta de Carros

App simples em React Native para cadastrar carros e visualizar a lista cadastrada.

Como funciona

Cadastro de Carros:
Preencha Placa, Marca, Modelo, Valor e Ano e clique em Salvar.
A marca agora pode ser escolhida através de um Picker.

Consulta de Carros:
Mostra todos os carros cadastrados.
Se não houver carros, aparece a mensagem: Nenhum carro cadastrado.

Os carros ficam na memória enquanto o app está aberto.

Estrutura do projeto
app/
├─ cadastro.js        # Tela de cadastro com Picker
├─ consulta.js        # Tela de consulta de carros
├─ data.js            # Armazena os carros em memória
└─ index.js           # Tela inicial (opcional)
