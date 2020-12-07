import React from 'react';
import { useSelector } from 'react-redux'
import './Flash.css'

const Flash = ({ message, className }) => {

  return message === null ?
    null :
    <div className={`flash ${className}`}>
      {message}
    </div>
}

export const WarnFlash = ({ message }) => <Flash message={message} className='warning' />
export const TellFlash = () => {
  const message = useSelector(state => state.tell)
  return <Flash message={message} className='telling' />
}

