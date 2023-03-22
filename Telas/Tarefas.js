import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function Tarefas() {
    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/Senac_logo.svg.png')}
            style={{width: 150, height: 150}}
            />
            <Text>Linko</Text>
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
});