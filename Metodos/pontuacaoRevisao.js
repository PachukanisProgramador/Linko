import { Alert, Text } from 'react-native';
import { consultarUsuario } from './../Telas/Banco/CadastroUsuario';

function pontuarCard(card, resultado){
  try{
    if(!resultado){
      card.validador_card += 0.05;
    }else{
      card.validador_card -= 0.05;
    }
    resolve(card.validador_card);
  }catch(erro){
    console.log("Erro na função de pontuarCard: " + erro);
  }
}
export {pontuarCard};