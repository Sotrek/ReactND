import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default class QuizPage extends Component {

  state = {
    questions: [],
    current: 0,
    answer: false,
    correct: 0,
    count: 0,
    complete: false
  }

  componentWillMount() {


    const {deck} = this.props.navigation.state.params
    const questions = deck.questions
    const count = questions.length
    console.log('questions QUIZPAGE', questions)
    console.log('COUNT', count)
    this.setState({ questions, count })
  }

  toggleAnswer() {
    this.setState((state) => ({answer: !state.answer}))
  }

  hideAnswer() {
    this.setState({answer: false})
  }

  correctAnswer() {
    this.setState((state) => {
      correct: state.correct++
    })
    this.nextQuestion()
  }

  nextQuestion() {
    const current = this.state.current + 1
    if (current < this.state.count) {
      this.setState({current, answer: false})
    } else {
      this.setState({complete: true})
    }
  }

  getScore() {
    return ((this.state.correct / this.state.count) * 100).toFixed(1)
  }

  resetQuiz() {
    this.setState({current: 0, correct: 0, complete: false, answer: false})
  }


  render() {
    const card = this.state.questions[this.state.current]
    console.log('CARDDDd', card)
    console.log('the state', this.state)
    return (
      <View style={{ flex: 1}}>
        { !this.state.complete ? (
          <View style={{ flex: 1, justifyContent: 'flex-start'}}>
            <View>
              <Text>Question {this.state.current+1} of {this.state.count} </Text>
            </View>

            <View>
              <Text>{card.question}</Text>
              { this.state.answer && (
                <Text>{card.answer}</Text>
              )}
            </View>


            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.nextQuestion()}>
                  <Feather name='x' size={30}/>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.toggleAnswer()}>
                  { this.state.answer ? (
                    <Text>Hide Answer</Text>
                  ) : (
                    <Text>Show Answer</Text>
                  )}
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.correctAnswer()}>
                  <Feather name='check' size={30}/>
                </TouchableHighlight>
            </View>

          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1, paddingTop: 15}}>
              <Text>Your Score</Text>
              <Text>{ this.getScore() }%</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.props.navigation.goBack()}>
                  <Feather name='chevron-left' size={30} />
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.resetQuiz()}>
                  <Feather name='rotate-cw' size={30} />
                </TouchableHighlight>
            </View>
          </View>
        )}
      </View>
    )
  }
}

