import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { getDeck, getDecks } from '../utils/helpers'


export default class DeckDetail extends Component {
	componentDidMount(){
		console.log('state received',this.props.navigation.state)
		// getDecks()
		// 	// .then((deck)=> ('DID MOUNT', console.log(JSON.stringify(deck))))
		// 	.catch((error)=>{
		// 	     console.log("Api call error DeckDetail");
		// 	     alert(error.message);
		// 	  });
	}
	componentWillUpdate(){
		console.log('state received - update',this.props.navigation.state)
		// getDecks()
		// 	// .then((deck)=> ('WILL UPDATE', console.log(JSON.stringify(deck))))
		// 	.catch((error)=>{
		// 	     console.log("Api call error DeckDetail");
		// 	     alert(error.message);
		// 	  });
	}

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
		const deckTitle = this.props.navigation.state.params.deckDetail.title;
		const cardsCount  = this.props.navigation.state.params.deckDetail.questions ? this.props.navigation.state.params.deckDetail.questions.length : 0;

		return (
			<View style={{flex:1}}>
				<Text>{deckTitle}</Text>
				<Text>{cardsCount}</Text>
				<View style={{flex:1}}>
					<TouchableOpacity onPress={() => {this.addCard()}}>
						<Text>Add Card</Text>
					</TouchableOpacity>
				</View>
				<View style={{flex:1}}>
				{ cardsCount > 0 && (
					<TouchableOpacity onPress={() => {this.playQuiz()}}>
						<Text>Play Quiz</Text>
					</TouchableOpacity>
				)}
				</View>
			</View>
		)
	}
}