import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, TextInput, Button, Text, ToastAndroid } from 'react-native';
import { consultarUsuario } from './Banco/CadastroUsuario';
import { verificarCredenciais } from '../Metodos/Usuario';

//banco

const TelaLogin = ( { navigation } ) => {

      let camposPreenchidos = 1;

      const [inputs, setInputs] = useState({
        email: '',
        senha: '',
      });
      
      useEffect(() => {
        if(inputs.email.length > 0 && inputs.senha.length > 0) {
          camposPreenchidos = 1;
        }
      }, [inputs]);

      const handleInputChange = (inputName, inputValue) => {
        setInputs({ ...inputs, [inputName]: inputValue });
      };

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
          borderBottomWidth: 2,
        }}
        value={inputs.email}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholder = 'Email'
        keyboardType='email-address'
      />
      {inputs.email.length > 0 && !isEmailValid(inputs.email) && (
        <Text style={styles.errorText}>E-mail inválido</Text>
      )}
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
        value={inputs.senha}
        onChangeText={(text) => handleInputChange('senha', text)}
        placeholder = 'Senha'
        secureTextEntry = {true}
        maxLength={8}
      />
      <View style={{marginVertical: 5, width: 250}}>
        <Button
            title='Entrar'
            color ='blue'
            onPress={() => {
              verificarCredenciais(inputs.email, inputs.senha)
              .then((resultadoCredenciais) =>{
                if(resultadoCredenciais === true){
                  console.log("Login realizado com sucesso. Bem-vindo(a) " + inputs.email + "!");
                  consultarUsuario(inputs.email)
                  .then((usuario) => {
                    navigation.navigate('BottomNav', {screen: 'Decks', params: { inputs }});
                  });
                }else {
                  ToastAndroid.show('Email ou senha incorretos', ToastAndroid.LONG);
                }
              })
              .catch((erro) =>{
                console.log("Erro ao verificar usuário:",erro);
              });
            }}
        />
      </View>
      <Text style={{marginTop: 10, marginBottom: 5, color: 'blue'}}
        onPress={() => navigation.navigate('TelaTrocaSenha')}>
          Esqueceu sua senha?</Text>
      <View style={{marginVertical: 5, width: 250, alignItems: 'center'}}>
      <Text style={{marginTop: 150, marginBottom: 5}}>Ainda não tem uma conta?</Text>
        <Button
        title='Cadastrar' 
        color ='blue'
        onPress={() => {
          navigation.navigate('TelaCadastrar')
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
    errorText: {
      color: 'red',
      marginBottom: 10,
      fontWeight: 'bold'
    },
});

export default TelaLogin;