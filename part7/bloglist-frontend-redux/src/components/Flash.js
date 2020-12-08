import React from 'react';
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import './Flash.css'

const Flash = ({ message, variant }) => {

  return message === null ?
    null :
    <Alert variant={variant}>
      {message}
    </Alert>
}

export const WarnFlash = () => {
  const message = useSelector(state => state.warn)
  return (<Flash message={message} variant="danger" />)
}
export const TellFlash = () => {
  const message = useSelector(state => state.tell)
  return <Flash message={message} variant="success" />
}

