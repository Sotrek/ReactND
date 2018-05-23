import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDeck } from '../utils/helpers'
import { white, black, gray } from '../utils/colors'

export default class DeckListDetail extends Component {

  goToDetail(){
    const { deck } = this.props
    this.props.navigation.navigate('DeckDetail', {deckDetail: deck})
  }

	render(){
		const { deck } = this.props

		return (
              <TouchableOpacity onPress={() => {this.goToDetail()} }>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:black}}>
                      { deck.title === '' ? 'Undefined' : deck.title }
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:gray}}>
                      { deck.questions ? deck.questions.length : '' }
                    </Text>

                  </View>
              </TouchableOpacity>
      )
	}
}

const styles = StyleSheet.create({

})