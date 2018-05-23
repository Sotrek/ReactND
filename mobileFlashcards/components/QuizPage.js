import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { black, green, gray, pink, white, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export default class QuizPage extends Component {

  state = {
    questions: [],
    answer: false,
    current: 0,
    correct: 0,
    count: 0,
    complete: false
  }

  componentWillMount(){
    const {deck} = this.props.navigation.state.params
    const questions = deck.questions
    const count = questions.length
    this.setState({ questions, count })
  }

  toggleAnswer(){
    this.setState((state) => ({answer: !state.answer}))
  }

  hideAnswer(){
    this.setState({answer: false})
  }

  correctAnswer(){
    this.setState((state) => {
      correct: state.correct ++
    })
    this.nextQuestion()
  }

  nextQuestion(){
    const current = this.state.current + 1
    if (current < this.state.count) {
      this.setState({current, answer: false})
    } else {
      this.setState({complete: true})
      clearLocalNotification()
      .then(setLocalNotification)
    }
  }

  getScore(){

    return ((this.state.correct / this.state.count) * 100).toFixed(1)
  }

  resetQuiz(){
    this.setState({current: 0, correct: 0, complete: false, answer: false})
  }

  static navigationOptions = {
      title: 'Quiz',
  };

  render() {
    const card = this.state.questions[this.state.current]
    return (
      <View style={styles.container}>
        { !this.state.complete ? (
          <View style={styles.quizContainer}>
            <View style={{alignSelf: 'flex-start', marginBottom:20}}>
              <Text>{this.state.current+1} / {this.state.count} </Text>
            </View>

            <View style={{flex:1}}>
              <Text style={styles.question}>Q: {card.question}</Text>
              { this.state.answer && (
                <Text style={styles.answer}>A: {card.answer}</Text>
              )}
            </View>
            <View style={{flex: 1}}>
              <TouchableHighlight underlayColor='transparent' onPress={() => this.toggleAnswer()}>
                    { this.state.answer ? (
                      <Text style={{color: red}} >Hide Answer</Text>
                    ) : (
                      <Text style={{color: red}}>Show Answer</Text>
                    )}
              </TouchableHighlight>
            </View>
            <View style={styles.choice}>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.nextQuestion()}>
                  <Text style={styles.incorrect}>INCORRECT</Text>
                </TouchableHighlight>

                <TouchableHighlight underlayColor='transparent' onPress={() => this.correctAnswer()}>
                  <Text style={styles.correct}>CORRECT</Text>
                </TouchableHighlight>
            </View>

          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1, paddingTop: 15}}>
              <Text style={{fontSize:23, textAlign: 'center'}}>Your Score</Text>
              <Text style={{fontSize:20, textAlign: 'center'}}>{ this.getScore() }%</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:30,
    alignItems: 'center',
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  choice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  incorrect: {
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: white,
    backgroundColor: pink,
    textAlign: 'center'
  },
  correct: {
    paddingTop:10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: white,
    backgroundColor: green,
    marginTop: 20,
    textAlign: 'center'
  },
  question: {
    fontSize: 30,
    color:black
  },
  answer: {
    fontSize: 30,
    color:black,
    marginTop:20
  }


})
