import React, { useState } from 'react';
import{View, Text, StyleSheet, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cards from '../components/Cards';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';


const StartGameScreen = props =>{
const [enteredValue, setEnteredValue] = useState('');
const [confirmed, setConfirmed] = useState(false);
const [selectedNumber, setSelectedNumber] = useState();

const numberInputHandler = inputText => {
setEnteredValue(inputText.replace(/[^0-9]/g, ''));
}; 
const resetInputHandler = () =>{
    setEnteredValue('');
    setConfirmed(false);
};
const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99)  {
       Alert.alert(
           'invalid Number!',
           'Number has to be a number between 1 to 99',
           [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
       );
        return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
};

let confirmedOutput;

if(confirmed) {
    confirmedOutput =
    <Cards style={styles.summaryContainer} >
    <BodyText>You select</BodyText>
    <NumberContainer>{selectedNumber}</NumberContainer>
    <MainButton 
    onPress={ () => props.onStartGame(selectedNumber)} >
    START GAME
    </MainButton>
    </Cards>
}



return(
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
    }}>
    <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game</TitleText>
        <Cards style={styles.InputContainer}>
            <BodyText>Select A Number</BodyText>
            <Input style={styles.input} 
            blurOnSubmit 
            autoCapitalize='none' 
            autoCorrect={false} 
            keyboardType='number-pad' 
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue} />
            <View style={styles.buttonContainer}>
                <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
            </View>
        </Cards>
        {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>

);
};

const styles = StyleSheet.create({

screen: {
    flex: 1,
    alignItems:'center',
    padding:10 
    
},
title:{
fontSize:20,
marginVertical:10,
fontFamily:'open-sans-bold'
},
InputContainer:{ 
width: 300,
maxWidth: '80%',
alignItems:'center'
  
},
buttonContainer:{
flexDirection:'row',
width: '100%',
justifyContent: 'space-between',
paddingHorizontal: 15

},
button:{
    width: 80
},
input:{
    width: 50,
    textAlign: 'center'

},
summaryContainer:{
    marginTop: 20
},

});

export default StartGameScreen;