import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Flashcards:notifications'

const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'

export function getDecks () {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then( (result) => {
      return JSON.parse(result)})
}

export function getDeck(title) {
  return getDecks().then((decks) => decks[title])
}

export function storeDeckTitle(title) {
  const deck = {
    title: title,
    questions: []
  }

  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[title]:deck}))
}

export function addCardToDeck(title, card, callback) {
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(result => {
	  const data = JSON.parse(result);
	  const newTitle = data[title].title
	  let questions = data[title].questions;
	  questions.push(card);
	  const newEntry = {
	  	questions: questions
	  }

	  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
	   [title]: newEntry
	  }));

	  callback();
	});
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to play a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(19)
              tomorrow.setMinutes(18)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}