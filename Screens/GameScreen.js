import React, {useState, useRef, useEffect } from 'react';
import{View, Text, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Cards from '../components/Cards';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';


const generateRandomBetween = (min, max, exclude) => {
 min = Math.ceil(min);
 max = Math.floor(max);
 const rndNum = Math.floor(Math.random()*(max - min)) + min;
 if(rndNum === exclude){
     return generateRandomBetween(min, max, exclude);

 }  else {
     return rndNum;
 }
};




const GameScreen = props =>{
 const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
 );
 const [rounds, setRounds] = useState(0);
 const currentLow = useRef(1);
 const currentHigh = useRef(100);

 const {userChoice, onGameOver } = props;

 useEffect( () => {
    if (currentGuess === userChoice ){
        onGameOver(rounds);
    }
 }, [currentGuess, userChoice, onGameOver] );

  const nextGuessHandler = direction => {
    if((direction === 'lower' && currentGuess < props.userChoice) || 
       (direction === 'greater' && currentGuess > props.userChoice)) {
        Alert.alert('don\t Lie!', 'you know that it is wrong...', [
            { text: 'sorry', style: 'Cancel' }
    ]);
    return;
    }
    if (direction === 'lower'){
        currentHigh.current = currentGuess;
    } else{
        currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
};
 return (
    <View style={styles.screen} >
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Cards style={styles.buttonContainer} >
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >LOWER</MainButton>>
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}  >GREATER</MainButton>
        </Cards>
    </View>
 );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center",
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop:20,
        width: 400,
        maxWidth:'90%'
    }
});

export default GameScreen;