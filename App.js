import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Constants, Accelerometer, Gyroscope, Magnetometer} from 'expo';

const {deviceName} = Constants

let ws
let btn = false
let vibro = false
let accel = [0, 0, 0]
let gyro = [0, 0, 0]
let magnet = [0, 0, 0]

Accelerometer.addListener(({x, y, z}) => {
  accel = [x, y, z]
})
Gyroscope.addListener(({x, y, z}) => {
  gyro = [x, y, z]
})
Magnetometer.addListener(({x, y, z}) => {
  magnet = [x, y, z]
})

setInterval(() => {
  if (!ws || ws.readyState !== 1) return
  ws.send(JSON.stringify([deviceName, btn, vibro, -1, -1, ...accel, ...gyro, ...magnet]))
}, 10)

function connect() {
  ws = new WebSocket('ws://192.168.20.3:7500', ['movuino'])
  ws.addEventListener('close', () => {
    console.log('close')
    setTimeout(connect, 1000)
  })
  ws.addEventListener('open', () => {
    console.log('open')
  })
}

connect()

// Expo.Accelerometer.addListener(console.log)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
