import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, TextInput, Button, ToastAndroid, Text } from 'react-native';

import * as inserir from './Banco/CadastroUsuario';

export default function TelaLogin( { navigation }) {

    let camposPreenchidos = 0;

    const [inputs, setInputs] = useState({
      nome: '',
      email: '',
      senha: '',
      repitaSenha: ''
    });
  
    const handleInputChange = (inputName, inputValue) => {
      setInputs({ ...inputs, [inputName]: inputValue });
    };

    useEffect(() => {
      if(inputs.nome.length > 0 && inputs.email.length > 0 && inputs.senha.length > 0 && inputs.repitaSenha.length > 0) {
        camposPreenchidos = 1;
      }
    }, [inputs]);

    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo-sem-fundo.png')}
          style={{width: 150, height: 150}}
        />
        <TextInput
          style={{ 
            marginTop: 40,
            height: 40, 
            width: 300, 
            borderColor: 'darkblue', 
            borderWidth: 0,
            borderBottomWidth: 2
          }}
          value={inputs.nome}
          onChangeText={(text) => handleInputChange("nome", text)}
          placeholder = 'Nome'
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
          value={inputs.email}
          onChangeText={(text) => handleInputChange("email", text)}
          placeholder = 'Informe seu email'
          keyboardType='email-address'
        />
        {inputs.email.length > 0 && !isEmailValid(inputs.email) && (
        <Text style={styles.errorText}>E-mail inválido</Text>
        )}
        <TextInput
          style={{ 
            marginTop: 10,
            height: 40, 
            width: 300, 
            borderColor: 'darkblue', 
            borderWidth: 0,
            borderBottomWidth: 2
          }}
          value={inputs.senha}
          onChangeText={(text) => handleInputChange("senha", text)}
          placeholder = 'Senha'
          secureTextEntry = {true}
          maxLength={8}
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
          value={inputs.repitaSenha}
          onChangeText={(text) => handleInputChange("repitaSenha", text)}
          placeholder = 'Repita Senha'
          secureTextEntry = {true}
          maxLength={8}
        />
        <View style={{marginVertical: 5, width: 150}}>
          <Button
          title='Cadastrar' 
          color ='blue'
          onPress={() => {
            inserir.novoUsuario(inputs.nome, inputs.email, inputs.senha, inputs.repitaSenha)
            .then((resultado)=>{
              if(resultado === 0){
                ToastAndroid.show('Cadastro realizado', ToastAndroid.LONG);
                navigation.navigate('TelaLogin');
              }else if (resultado === 1){
                ToastAndroid.show('Informe uma senha com pelo menos 4 caracteres', ToastAndroid.LONG);
              }else if (resultado === 2){
                ToastAndroid.show('Senhas informadas não conferem', ToastAndroid.LONG);
              }else if(resultado === 3){
                ToastAndroid.show('E-mail de usuário já cadastrado', ToastAndroid.LONG);
              }
            })
            .catch((erro) =>{
              console.log(erro);
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