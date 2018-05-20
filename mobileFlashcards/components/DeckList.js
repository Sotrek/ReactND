import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { getDecks } from '../utils/helpers'
import DeckListDetail from './DeckListDetail'

export default class DeckList extends Component {
	state = {
		decks: {}
	}
	componentDidMount(){
		getDecks()
			.then((decks) => this.setState({decks}))
			.catch((error)=>{
			     console.log("Api call error DeckList");
			     alert(error.message);
			  });


	}
	componentWillUpdate(){
		getDecks()
			.then((decks) => this.setState({decks}))
			.catch((error)=>{
			     console.log("Api call error DeckList");
			     alert(error.message);
			  });
	}

	render(){
		return (
			<View style={{flex:1}}>
				{ this.state.decks && Object.keys(this.state.decks).length ? (
		          <ScrollView style={{flex:1}}>
		              { Object.keys(this.state.decks).map((key) => {
		                return (
		                  <DeckListDetail key={key} deck={this.state.decks[key]} navigation={this.props.navigation} />
		                )
		              })}
		          </ScrollView>
		        ) : (
		          <View>
		        ]    <Text>There are no decks available</Text>
		          </View>
		        )}
			</View>
		)
	}
}