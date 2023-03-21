import { db } from './Connect';

function revisar(nomeDeck, id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id, pergunta, resposta FROM cards where nomeDeck = ? and idUsuario = ?',
          [nomeDeck, id],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => reject(error)
        );
      });
    });
}

export { revisar };

