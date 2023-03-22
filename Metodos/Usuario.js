import { Alert, ToastAndroid } from 'react-native';
import { consultarUsuario } from '../Telas/Banco/CadastroUsuario';

function verificarCredenciais(emailUsuario, senhaUsuario){
  try{
    return new Promise((resolve, reject) =>{
      consultarUsuario(emailUsuario)
      .then((usuario) => {
        if(usuario.senha === senhaUsuario){
          resolve(true);
        }else{
          const mensagem = "Senha incorreta do usuário "  + emailUsuario;
          ToastAndroid.show('Email ou senha incorretos', ToastAndroid.LONG);
          reject(mensagem);
        }
      })
      .catch((erro) =>{
        console.log(erro);
      })
    });
  }catch(erro){
    console.log("Erro de código na verificação das credenciais:", erro);
  }
}

function verificarTrocaDeSenha(emailUsuario, novaSenha){
  try{
    return new Promise((resolve, reject) =>{
      consultarUsuario(emailUsuario)
      .then((usuario) => {
        console.log(usuario);
        if(emailUsuario === usuario.email && novaSenha != usuario.senha && novaSenha.length <= 8){
          resolve(true);
        }else if (novaSenha === usuario.senha){
          console.log("Senha atual do usuário: " + usuario.senha + " | Senha nova: " + novaSenha);
          Alert.alert("Ops!", "Senha nova é igual a sua senha atual.");
          resolve(false);
        }else if (novaSenha.length < 4){
          console.log("Tamanho da senha: " + novaSenha.length)
          Alert.alert('Senha fraca', 'Informe uma senha com pelo menos 8 caracteres.');
          resolve(false);
        }else{
          Alert.alert('As senhas não batem', 'Informe senhas iguais.');
          resolve(false);
        }
      })
      .catch((erro) =>{
        console.log(erro);
      })
    });
  }catch(erro){
    console.log("Erro de código na verificação das credenciais:", erro);
  }
}







export {verificarCredenciais, verificarTrocaDeSenha};