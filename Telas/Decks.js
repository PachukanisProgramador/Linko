import React, { useState, useEffect } from 'react';
import { Alert, View, Button, StyleSheet, Modal, TextInput, TouchableOpacity, Text, ScrollView, ToastAndroid} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';

//banco

import { obterDecks, inserirDeck, atualizarDeck, deletarDeck } from './Banco/CadastroDecks';

export default function Decks ({ navigation }) {

    //rota para acessar o email do user depois de logar
    const route = useRoute();
    const { inputs } = route.params;

    //variavel deck para receber os dados do banco e popular a tela
    const [decks, setDecks] = useState([]);
    useEffect(() => {
        obterDecks(inputs.email)
          .then((decksEncontrados) => {
            setDecks(decksEncontrados);
          })
          .catch((error) => {
            console.log('Erro ao obter decks:', error);
          });
    }, [decks]);

    //constante de estado para observar o input do usuario
    const [text, setText] = useState('');
    const handleTextChange = (text) => {
        setText(text);
    };
    const [novoNome, setTextNome] = useState('');
    const handleNovoNome = (novoNome) => {
        setTextNome(novoNome);
    }
      
    //modal que abre para INSERIR novos decks
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModalOpen = () => {
        setIsModalVisible(true);
    }; 
    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    const handleSave = () => {
        if(text.length > 0){
            inserirDeck(inputs.email, text);
            setText('');
            handleModalClose();
        }else{
            ToastAndroid.show('Insira um nome no deck', ToastAndroid.LONG);
        }
    };

    //modal que abre para ATUALIZAR E DELETAR decks
    const [selectedDeck, setSelectedDeck] = useState(null);
    const [modalVisible1, setModalVisible1] = useState(false);
    const mostrarOpcoes = (deck) => {
        setSelectedDeck(deck);
        setModalVisible1(true);
    }
    const handleDelete = () => {
        Alert.alert('Tem certeza?', ' você realmente quer excluir esse deck? Todos os cards serão excluídos junto.');
        deletarDeck(selectedDeck, inputs.email);
        setModalVisible1(false);
    };
    const handleUpdate = () => {
        atualizarDeck(novoNome, selectedDeck, inputs.email);
        setModalVisible1(false);
    };
    
    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor='#0D41E1'/>
            <ScrollView fadingEdgeLength={10}>
                <View style={styles.buttonDecks} >
                    {decks.map((deck, index) => (
                    <View key={index}>    
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                navigation.navigate('Cards', {inputs, title: deck});
                            }}
                            onLongPress={() => mostrarOpcoes(deck)}
                            style={styles.touchableOpacityStyle}>
                            <Text style={styles.buttonText}>{deck}</Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </View>
            </ScrollView>

            <Modal visible={modalVisible1} onRequestClose={() => setModalVisible1(false)} animationType='slide'>
                <View style={styles.modalContainer}>
                    <Text style={{marginVertical: 30, fontSize: 25}}>{selectedDeck}</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Novo nome para o deck"
                        onChangeText={handleNovoNome}
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
                    placeholder="Nome do Deck"
                    onChangeText={handleTextChange}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Cancelar" onPress={handleModalClose} />
                    <Button title="Salvar" onPress={
                        handleSave
                        } />
                </View>
                </View>
            </Modal>

            <View style={styles.buttonAdd}>
            <Button
                color={'#0C63E7'}
                title="Adicionar"
                onPress={handleModalOpen}
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
    buttonAdd: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        position: 'absolute',
        bottom: 1,
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