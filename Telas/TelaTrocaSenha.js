import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import * as usuarioCadastro from './Banco/CadastroUsuario';
import * as usuario from './../Metodos/Usuario';

export default function TelaTrocaSenha( { navigation }) {

    const [inputs, setInputs] = useState({
      email: '',
      senha: '',
      repitaSenha: ''
    });

    const handleInputChange = (inputName, inputValue) => {
      setInputs({ ...inputs, [inputName]: inputValue });
    };

    return (
      <View style={styles.container}>
        <Text style={{color: 'rgba(10, 0, 0, 0.25)', fontSize: 20, marginTop: -50, marginBottom: 125}}>
          Troque sua senha</Text>
        <TextInput
          style={{ 
            marginTop: 10,
            height: 40, 
            width: 300, 
            borderColor: 'darkblue', 
            borderWidth: 0,
            borderBottomWidth: 2
          }}
          value={inputs.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder = 'Informe seu e-mail'
        />
        <TextInput
          style={{ 
            marginTop: 10,
            height: 40, 
            width: 300, 
            borderColor: 'darkblue', 
            borderWidth: 0,
            borderBottomWidth: 2
          }}
          onChangeText={(text) => handleInputChange('senha', text)}
          value={inputs.senha}
          placeholder = 'Nova senha'
          secureTextEntry = {true}
        />
        <TextInput
          style={{ 
            marginTop: 10,
            marginBottom: 50,
            height: 40, 
            width: 300, 
            borderColor: 'darkblue', 
            borderWidth: 0,
            borderBottomWidth: 2
          }}
          onChangeText={(text) => handleInputChange('repitaSenha', text)}
          value={inputs.repitaSenha}
          placeholder = 'Repita a senha'
          secureTextEntry = {true}
        />
        <View style={{marginVertical: 5, width: 150}}>
          <Button
          title='Trocar a senha' 
          color ='blue'
          onPress={() => {
            usuario.verificarTrocaDeSenha(inputs.email, inputs.senha)
            .then((resultado) =>{
              if(resultado === true){
                if(inputs.senha === inputs.repitaSenha){
                  usuarioCadastro.atualizarUsuarioSenha(inputs.email, inputs.senha)
                  .then(()=>{
                    Alert.alert("Sucesso!","Você trocou a sua senha!");
                    setInputs({email: '', senha: '', repitaSenha: ''});
                    navigation.navigate('TelaLogin');
                  });
                }
              }
            });
          }}
          />
        </View>
        <StatusBar style='light' backgroundColor='#0D41E1'/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});