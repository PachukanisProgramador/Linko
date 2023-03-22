import React, { useState, useEffect } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';

//banco

import { obterPerguntas, obterRespostas, inserirCartao, atualizarCard, deletarCard } from './Banco/CadastroCards';

export default function Cards ({ navigation }) {

    //variáveis exportadas da telaDecks para serem usadas no registro do banco
    const {inputs, title} = useRoute().params;

    const [perguntas, setPerguntas] = useState([]);
    const [respostas, setRespostas] = useState([]);

    useEffect(() => {
        Promise.all([
          obterPerguntas(title, inputs.email),
          obterRespostas(title, inputs.email)
        ])
          .then(([cardEncontrado, respostaEncontrada]) => {
            setPerguntas(cardEncontrado);
            setRespostas(respostaEncontrada);
          })
          .catch((error) => {
            console.log('Erro ao obter perguntas e respostas:', error);
          });
      }, [perguntas]);

    //Variaveis para o modal INSERIR cards
    const [pergunta, setTextPergunta] = useState('');
    const handlePergunta = (pergunta) => {
        setTextPergunta(pergunta);
    };
    const [resposta, setTextResposta] = useState('');
    const handleResposta= (resposta) => {
        setTextResposta(resposta);
    };

    //Modal para INSERIR de cards
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModalOpen = () => {
        setIsModalVisible(true);
    };
    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    const handleSave = () => {
        if (pergunta.length > 0 && resposta.length > 0){
            inserirCartao(pergunta, resposta, title, inputs.email);
            setTextPergunta('');
            setTextResposta('');
            handleModalClose();
        }else{
            ToastAndroid.show('Insira uma pergunta e uma resposta para o card', ToastAndroid.LONG);
        }
    };

    //Modal que abre para ATUALIZAR cards
    const [modalVisible1, setModalVisible1] = useState(false);
    const [oldQuestion, setOldQuestion] = useState(null);
    const [oldAnswer, setOldAnswer] = useState(null);
    const [updateQuestion, setUpdateQuestion] = useState(updateQuestion);
    const handleSetUpdateQuestion = (updateQuestion) => {
        setUpdateQuestion(updateQuestion);
    }
    const [updateAnswer, setUpdateAnswer] = useState(updateAnswer);
    const handleSetUpdateAnswer= (updateAnswer) => {
        setUpdateAnswer(updateAnswer);
    }
    const mostrarOpcoes = (i) => {
        setOldQuestion(perguntas[i]);
        setOldAnswer(respostas[i]);
        setUpdateQuestion(perguntas[i]);
        setUpdateAnswer(respostas[i]);
        setModalVisible1(true);
    }
    const handleDelete = () => {
        deletarCard(oldQuestion, oldAnswer, title, inputs.email);
        setModalVisible1(false);
    };
    const handleUpdate = () => {
        atualizarCard(updateQuestion, updateAnswer, oldQuestion, oldAnswer, title, inputs.email);
        setModalVisible1(false);
    };

    return(
        <View style={styles.container}>
            <ScrollView fadingEdgeLength={10}>
                <View style={styles.buttonDecks}>
                    {perguntas.map((pergunt, index) => (
                        <View key={index}>    
                            <TouchableOpacity
                                key={index}
                                onPress={() => mostrarOpcoes(index)}
                                style={styles.touchableOpacityStyle}>
                                <Text style={styles.buttonText}>{pergunt}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Modal visible={modalVisible1} onRequestClose={() => setModalVisible1(false)} animationType='slide'>
                <View style={styles.modalContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Pergunta Atualizada"
                        value = {updateQuestion}
                        onChangeText={handleSetUpdateQuestion}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Resposta Atualizada"
                        value = {updateAnswer}
                        onChangeText={handleSetUpdateAnswer}
                    />
                    <View>
                        <View style={{marginBottom: 50}}>
                            <Button title="Atualizar" onPress={handleUpdate} />
                        </View>
                        <View>
                            <Button title="Deletar" color={'red'} onPress={handleDelete} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pergunta"
                    onChangeText={handlePergunta}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Resposta"
                    onChangeText={handleResposta}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Cancelar" onPress={handleModalClose} />
                    <Button title="Salvar" onPress={handleSave} />
                </View>
                </View>
            </Modal>

            <View style={styles.buttonRevisar}>
            <Button
                color={'#0C63E7'}
                title="Adicionar card"
                onPress={handleModalOpen}
            />
            <Button
                color={'#0C63E7'}
                title="Revisão"
                onPress={() => navigation.navigate('Revisão', {inputs, title})}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 70,
        position: 'relative'
    },
    buttonRevisar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    },
    buttonDecks: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableOpacityStyle: {
        backgroundColor: '#FF9100',
        width: 300,
        height: 100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollView: {
        maxHeight: '80%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
})