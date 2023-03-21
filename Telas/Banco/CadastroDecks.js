import { db } from "./Connect";

function inserirDeck(id, nome) {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO decks (idUsuario, nomeDeck) VALUES (?, ?)',
                [id, nome]
            );
        });
        console.log('Deck registrado');
    } catch (error) {
        console.log('Não foi registrar', error);
    }
}

function atualizarDeck(novoNome, id, email) {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE decks set nomeDeck = ? where nomeDeck = ? and idUsuario = ?',
                [novoNome, id, email]
            );
        });
        console.log('Alteração concluída');
    } catch (error) {
        console.log('Não foi possível registrar', error);
    }
}

function deletarDeck(nomeDeck, email) {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM decks where nomeDeck = ? and idUsuario = ?',
                [nomeDeck, email]
            );
        });
        console.log("Excluído com sucesos!");
    } catch (error) {
        console.log("Não foi possível deletar");
    }
}

function obterDecks(id) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT nomeDeck FROM decks where idUsuario = ?', 
            [id],
            (tx, results) => {
              const len = results.rows.length;
              const decks = [];
              for (let i = 0; i < len; i++) {
                const row = results.rows.item(i);
                decks.push(row.nomeDeck);
              }
              resolve(decks);
            },
            (error) => {
              console.log("Erro:", error);
              reject(error);
            }
          );
        });
      });
}

export { obterDecks, inserirDeck, atualizarDeck, deletarDeck };