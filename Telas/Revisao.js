import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { pontuarCard } from '../Metodos/pontuacaoRevisao';
//banco

import { revisar } from './Banco/ConsultarRevisao';

export default function Revisao ({ navigation }) {

    const {inputs, title} = useRoute().params;

    const [CARD_DATA, setCardData] = useState([]);

    useEffect(() => {
      revisar(title, inputs.email)
        .then(cards => {
          try {
            setCardData(cards);
          } catch (error) {
            console.error(error);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
  
    const handleNextCard = () => {
      if (currentCardIndex < CARD_DATA.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setShowAnswer(false);
      } else {
        navigation.goBack();
      }
    };
  
    const handleShowAnswer = () => {
      setShowAnswer(true);
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.cardText}>{showAnswer ? item.resposta : item.pergunta}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        {CARD_DATA.length > 0 && (
          <FlatList
          data={[CARD_DATA[currentCardIndex]]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
        />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleShowAnswer}>
            <Text style={styles.buttonText2}>Mostrar Resposta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={
            handleNextCard
            }>
            <Text style={styles.buttonText1}>Errei</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={
            handleNextCard
          }>
            <Text style={styles.buttonText3}>Acertei</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      card: {
        marginTop: 100,
        height: 350,
        width: 350,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
      },
      cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 25,
        width: '100%',
      },
      buttonText1: {
        color: 'white',
        backgroundColor: 'red',
        padding: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
      },
      buttonText2: {
        color: 'white',
        backgroundColor: 'blue',
        padding: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5
      },
      buttonText3: {
        color: 'white',
        backgroundColor: 'green',
        padding: 10,
        paddingHorizontal: 45,
        borderRadius: 5,
      },
});


