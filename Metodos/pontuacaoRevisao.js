import { Alert, Text } from 'react-native';
import { consultarUsuario } from '../Banco/ConsultarUsuario';

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

function chanceAparecerCard(){
  try{
    
  }catch{

  }
}
export {pontuarCard, chanceAparecerCard};