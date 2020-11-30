/* eslint-disable no-unused-vars */
const error = (...params) => {
  console.log(...params)
}

const info = (...params) => {
  // avoid info printing during test
  if (process.env.NODE_ENV !== 'test'){
    console.log(...params)
  }
}

module.exports = {
  info, error
}