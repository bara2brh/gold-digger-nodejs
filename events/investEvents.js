import { EventEmitter } from 'node:events'
import { logInvest } from '../utils/logInvest.js'

export const investEvent = new EventEmitter()

investEvent.on('invest',logInvest)