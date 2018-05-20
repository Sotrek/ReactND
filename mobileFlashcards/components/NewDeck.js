import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { storeDeckTitle, getDeck } from '../utils/helpers'
import { NavigationActions } from 'react-navigation';


export default class NewDeck extends Component {
	state = {
	  title: "",
	  questions: []
	}

	toDetail = () => {
		console.log(this.state)
		const currentState = this.state
	    this.props.navigation.navigate('DeckDetail',{ deckDetail: currentState })
	    this.setState({title:"", questions:[]})
	}

	addDeck = () => {
		storeDeckTitle(this.state.title);

		this.toDetail();
	}

	render() {
		return (
		  <KeyboardAvoidingView behavior="padding" style={styles.container}>
		    <Text>Deck Title</Text>
		    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
		    <TouchableOpacity onPress={this.addDeck} style={styles.button}>
		    	<Text style={{color: 'black'}}>ADD NEW DECK</Text>
		    </TouchableOpacity>
		  </KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:40,
    padding: 10
  }
})