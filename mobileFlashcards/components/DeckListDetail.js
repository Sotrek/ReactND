import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/helpers'

export default class DeckListDetail extends Component {
  componentDidMount(){
    // console.log('THIS DOT PROPS - DECKLISTDETAIL',this.props)
  }

  goToDetail = () => {
    const { deck } = this.props
    this.props.navigation.navigate('DeckDetail', {deckDetail: deck})
    // console.log('DAK',{deck})
  }

	render(){
		const { deck } = this.props

		return (
              <TouchableOpacity style={{flex:1}} onPress={() => {this.goToDetail()} }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>
                      { deck.title === '' ? 'Undefined' : deck.title }
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>
                      { deck.questions ? deck.questions.length : '' }
                    </Text>

                  </View>
              </TouchableOpacity>

      )
	}
}