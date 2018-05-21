import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { getDecks } from '../utils/helpers'
import DeckListDetail from './DeckListDetail'
import { white, black } from '../utils/colors'

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
			<View style={styles.container}>
				{ this.state.decks && Object.keys(this.state.decks).length ? (
		          <ScrollView contentContainerStyle={styles.subcontainer}>
		              { Object.keys(this.state.decks).map((key) => {
		                return (
			                <View style={styles.deckListDetail} key={key}>
			                  <DeckListDetail
			                  		key={key}
			                  		deck={this.state.decks[key]}
			                  		navigation={this.props.navigation}
			                  />
			                </View>
		                )
		              })}
		          </ScrollView>
		        ) : (
		          <View style={styles.noDecksContainer}>
		            <Text style={styles.noDecks}>There are no decks available</Text>
		          </View>
		        )}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:30
  },
  subcontainer: {
    alignItems: 'stretch',
  },
  deckListDetail: {
  	padding: 10,
    backgroundColor: white,
    borderBottomWidth :2,
    borderBottomColor: black
  },
  noDecksContainer: {
  	flex:1,
  	justifyContent: 'flex-start',
  	backgroundColor: white,
  	alignItems:'stretch',
  },
  noDecks: {
  	color:black,
  	textAlign: 'center',
  	paddingTop: 50
  }
})