import React from 'react';
import{View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props =>{
    return (
        <View style={styles.screen} >
            <TitleText>Game Is Over</TitleText>
            <View style={styles.imageContainer} >
            <Image 
            source={require('../assets/success.png')}
            // source={{uri: 'https://i.ytimg.com/vi/z0pPhTLvzu4/hqdefault.jpg'}}
            style={styles.image}
            resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText} >Your Phone Needed <Text style={styles.highLight} >{props.roundsNumber}</Text> 
             rounds to guess the number <Text style={styles.highLight} >{props.userNumber}</Text></BodyText>
             </View>
            <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer:{
     width: 300,
     height: 300,
     borderRadius: 150,
     borderWidth: 3,
     borderColor: 'black',
     overflow:'hidden'

    },
    image:{
        width: '100%',
        height:'100%'

    },
    resultContainer:{
        marginTop:20,
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText:{
        textAlign:'center',
        fontSize: 20
    },
    highLight:{
        color: colors.primary,
        fontFamily: 'open-sans-bold'

    }
    
});

export default GameOverScreen;