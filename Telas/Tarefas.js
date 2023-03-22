import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function Tarefas() {
    return (
        <View style={styles.container}>
            <Text style={styles.textoLinko}>Apoio:</Text>
            <Image
            source={require('../assets/Senac_logo.svg.png')}
            style={styles.imagem}
            />
            <Text style={styles.textoLinko}>Linko</Text>
            <Text>Versão 1.0</Text>
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
    imagem: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginTop: 50,
    },
    textoLinko: {
        marginTop: 170,
        fontSize: 20,
    }
});