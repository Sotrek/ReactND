import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { addCardToDeck, getDeck } from '../utils/helpers'

export default class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}

	addCard = () => {
		let card = {
			question: this.state.question,
			answer: this.state.answer
		}
		const title = this.props.navigation.state.params.title

		addCardToDeck(title, card, ()=> {
			getDeck(title)
				.then((deckDetail) => (this.props.navigation.navigate('DeckDetail', {deckDetail})))
		})
	}

	render(){
		return (
			<View style={styles.container}>
				<Text style={{marginBottom:10}}>Add a new Card to this deck</Text>
				<Text>Question</Text>
				<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onChangeText={(question) => this.setState({ question })} value={this.state.question} />
				<Text>Answer</Text>
				<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onChangeText={(answer) => this.setState({ answer })} value={this.state.answer} />
			    <TouchableOpacity onPress={() => {this.addCard()}} style={styles.button}>
			    	<Text style={{color: 'black'}}>ADD NEW CARD</Text>
			    </TouchableOpacity>
			</View>
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
    padding: 10,
    marginTop: 20
  }
})