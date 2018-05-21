import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'


const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then( (result) => {
      return JSON.parse(result)})
}

export function getDeck(title) {
  return getDecks().then((decks) => decks[title])
  			// .then((res) => console.log('helpers', JSON.stringify(res)))
}

export function storeDeckTitle(title) {
  const deck = {
    title: title,
    questions: []
  }

  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[title]:deck}))
}

export function addCardToDeck(title, card) {
  // console.log("add card", title, card.question, card.answer);
	AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(result => {
	  const data = JSON.parse(result);
	  // console.log('DATA TITLE', data[title].title)
	  const newTitle = data[title].title
	  let questions = data[title].questions;
	  questions.push(card);
	  // console.log('QUESTIONS', questions)
	  const newEntry = {
	  	questions: questions
	  }
	  // console.log('newEntry', newEntry)

	  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
	   [title]: newEntry
	  }));
	});
}