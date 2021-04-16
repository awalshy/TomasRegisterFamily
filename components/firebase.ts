import firebase from 'firebase'
import config from '../config/google.services.json'

export function initFirebase() {
  firebase.initializeApp(config)
}