import { db } from "./Connect";

function inserirCartao(pergunta, resposta, nomeDeck, id) {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO cards (pergunta, resposta, nomeDeck, idUsuario) VALUES (?, ?, ?, ?)',
                [pergunta, resposta, nomeDeck, id]
            );
        });
        console.log('Card Salvo');
    } catch (error) {
        console.log('Não Salvo', error);
    }
}

function atualizarCard(novaPergunta, novaResposta, perguntaAntiga, respostaAntiga, nomeDeck, id) {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE cards SET pergunta = ?, resposta = ? where pergunta = ? and resposta = ? and nomeDeck = ? and idUsuario = ?',
                [novaPergunta, novaResposta, perguntaAntiga, respostaAntiga, nomeDeck, id]
            );
        });
        console.log('Alteração concluída');
    } catch (error) {
        console.log('Não foi possível registrar', error);
    }
}

function deletarCard(pergunta, resposta, nomeDeck, id) {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM cards where pergunta = ? and resposta = ? and nomeDeck = ? and idUsuario = ?',
          [pergunta, resposta, nomeDeck, id]
        );
      });
      console.log('Deletado');
    } catch (error) {
      console.log('Não foi possível deletar', error);
    }
}

function obterPerguntas(nomeDeck, id) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT pergunta FROM cards where nomeDeck = ? and idUsuario = ?', 
            [nomeDeck, id],
            (tx, results) => {
              const len = results.rows.length;
              const perguntas = [];
              for (let i = 0; i < len; i++) {
                const row = results.rows.item(i);
                perguntas.push(row.pergunta);
              }
              resolve(perguntas);
            },
            (error) => {
              console.log("Erro:", error);
              reject(error);
            }
          );
        });
      });
}

function obterRespostas(nomeDeck, id) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT resposta FROM cards where nomeDeck = ? and idUsuario = ?', 
            [nomeDeck, id],
            (tx, results) => {
              const len = results.rows.length;
              const respostas = [];
              for (let i = 0; i < len; i++) {
                const row = results.rows.item(i);
                respostas.push(row.resposta);
              }
              resolve(respostas);
            },
            (error) => {
              console.log("Erro:", error);
              reject(error);
            }
          );
        });
      });
}

export { obterPerguntas, obterRespostas, inserirCartao, atualizarCard, deletarCard };