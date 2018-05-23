import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDeck, getDecks } from '../utils/helpers'
import { black, gray } from '../utils/colors'

export default class DeckDetail extends Component {

	// state = {
	// 	deck:{}
	// }
	// componentDidMount(){
	// 	const deckTitle = this.props.navigation.state.params.deckDetail.title;
	// 	getDeck(deckTitle)
	// 		.then((deck)=> this.setState({deck}))
	// }
	// componentWillReceiveProps(){
	// 	const deckTitle = this.props.navigation.state.params.deckDetail.title;
	// 	getDeck(deckTitle)
	// 		.then((deck)=> this.setState({deck}))
	// 	// console.log('this.state.deck', this.state.deck)
	// 	// console.log(this.props.navigation.state.params.deckDetail.questions)


	// }

	addCard = () => {
		const deckTitle = this.props.navigation.state.params.deckDetail.title;
		const deckQuestions = this.props.navigation.state.params.deckDetail.questions;
		this.props.navigation.navigate('AddCard',{title: deckTitle, questions: deckQuestions});
	}

	playQuiz = () => {
		const deckTitle = this.props.navigation.state.params.deckDetail.title;
		getDeck(deckTitle)
			.then((deck) => {this.props.navigation.navigate('QuizPage', {deck})})
	}

	render(){
		console.log('render- props.nav.state.params', this.props.navigation.state.params )
		const deckTitle = this.props.navigation.state.params.deckDetail.title;
		const cardsCount  = this.props.navigation.state.params.deckDetail.questions.length;

		return (
			<View style={styles.container}>
				<Text style={styles.deckTitle}>{deckTitle}</Text>
				<Text>Cards Count ({cardsCount})</Text>
				<View style={styles.container}>
					<TouchableOpacity onPress={() => {this.addCard()}} style={styles.cardButton}>
						<Text>Add Card</Text>
					</TouchableOpacity>

				{ cardsCount > 0 && (
					<TouchableOpacity onPress={() => {this.playQuiz()}} style={styles.cardButton}>
						<Text>Play Quiz</Text>
					</TouchableOpacity>
				)}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:30,
    alignItems: 'center',
  },
  deckTitle: {
  	color: black,
  	marginBottom: 10
  },
  cardsCount: {
  	color: gray,
  },
  cardButton: {
  	paddingVertical: 10,
  	paddingHorizontal: 30,
  	borderWidth :2,
    borderColor: black,
    marginBottom: 10
  }

})