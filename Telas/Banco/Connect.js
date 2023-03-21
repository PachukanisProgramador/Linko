import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("linkoDb.db");

function criarTabelas() {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, senha TEXT NOT NULL)'
      );      
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS decks (id INTEGER PRIMARY KEY AUTOINCREMENT, idUsuario TEXT NOT NULL, nomeDeck TEXT NOT NULL)'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT NOT NULL, resposta TEXT NOT NULL, nomeDeck TEXT NOT NULL, idUsuario TEXT NOT NULL)'
      );
    });
    console.log('Tabelas criadas/existem');
  } catch (error) {
    console.log('Erro ao criar a tabelas:', error);
  }
}

function verificarDados() {
  try {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM usuarios", [], (_, { rows }) => {
        const rowsArray = rows._array.map((row) => {
          return `${row.id} - ${row.nome} - ${row.email} - ${row.senha}`;
        });
        console.log(rowsArray.join("\n"));
      });
    });
  } catch (error) {
    console.log("Não foi possível", error);
  }
}

export { db, verificarDados, criarTabelas };
