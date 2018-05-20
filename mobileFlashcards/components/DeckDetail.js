import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { getDeck } from '../utils/helpers'


export default class DeckDetail extends Component {
	componentDidMount(){
		console.log('PROPS IN DECK DETAIL', this.props)
	}
	componentWillUpdate(){
		const deckTitle = this.props.navigation.state.params.deckDetail.title;
		getDeck(deckTitle)
			.then((deck)=> (console.log(JSON.stringify(deck))))
	}

	addCard = () => {
		const deckTitle = this.props.navigation.state.params.deckDetail.title;
		const deckQuestions = this.props.navigation.state.params.deckDetail.questions;
		this.props.navigation.navigate('AddCard',{title: deckTitle, questions: deckQuestions});
	}

	playQuiz = () => {
		this.props.navigation.navigate('AddCard',{title: deckTitle, questions: deckQuestions});
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
					<TouchableOpacity onPress={() => {this.playQuiz()}}>
						<Text>Play Quiz</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}