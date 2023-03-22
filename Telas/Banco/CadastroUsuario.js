import { db } from "./Connect";
import { ToastAndroid } from 'react-native';

function novoUsuario(nome, email, senha, repitaSenha) {
  try {
    return new Promise((resolve, reject) => {
      console.log("Inserindo novo usuário.");
    if (senha.length < 4){
      mensagemSenhaFraca = new Error("Senha fraca. Tamanho da senha: " + senha.length);
      resolve(1);
    }else if(senha != repitaSenha){
      mensagemErroSenhaDiferente = new Error("As senhas inseridas não são iguais. Senha: " + senha + " | Confirmação: " + repitaSenha);
      console.log(mensagemErroSenhaDiferente);
      resolve(2);
    }else{
      db.transaction((query) => {
        query.executeSql(
          'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
          [`${nome}`, `${email}`, `${senha}`]
      );
      }, (erro) =>{
        if (erro.message.includes("SQLITE_CONSTRAINT_UNIQUE[2067]")){
          mensagemErroEmailInvalido = new Error("Email inválido. Não contém @ ou .com. Email: " + email);
          console.log(mensagemErroEmailInvalido);
          resolve(3);
        }else{
          console.log("Erro geral na inserção de usuário: " + erro);
        }
      }, () =>{
        console.log('Novo usuário inserido com sucesso!');
        resolve(0);
      });
    }
  });
  } catch (error) {
    throw console.log('Erro ao inserir novo usuário em tabela usuarios:', error);
  }
}

function consultarUsuario(emailUsuario) {
  try {
    return new Promise((resolve, reject) => {
        db.transaction((query) => {
          query.executeSql("SELECT * FROM usuarios WHERE email = ?", [`${emailUsuario}`], (_, { rows }) => {
            if (rows.length > 0) {
              const resultado = rows._array[0];
              console.log("Usuário", emailUsuario, "encontrado.");
              resolve(resultado);
            } else {
              const mensagem = "Usuário " + emailUsuario + " não encontrado no banco de dados";
              ToastAndroid.show('Usuário não encontrado', ToastAndroid.LONG);
              reject(mensagem);
            }
          });
        },(erro) =>{
          console.log("Erro na consulta de usuário: ", erro);
        });
      })
  } catch (error) {
    console.log("Não foi possível ler do banco de dados Linko. Erro do código: ", error);
  }
}

function atualizarUsuarioSenha(emailUsuario, novaSenha) {
  return new Promise((resolve, reject) => {
    console.log("Inicializando a atualização.");
    db.transaction((query) => {
      query.executeSql('UPDATE usuarios SET senha = ? WHERE email = ?', [`${novaSenha}`,`${emailUsuario}`]);
      resolve(console.log("Senha trocada com sucesso! Nova senha: " + novaSenha + "."));
    });
    }, (error) => {
      resolve(console.log("Não foi possível atualizar o usuário " + emailUsuario + ":", error));
    }, () =>{
      resolve(console.log("Sucesso na atualização do usuário", emailUsuario));
    });
}

export { novoUsuario, consultarUsuario, atualizarUsuarioSenha };