import React from 'react';
import { useSelector } from 'react-redux'
import './Flash.css'

const Flash = ({ className }) => {
  const message = useSelector(state => state)
  return message === null ?
    null :
    <div className={`flash ${className}`}>
      {message}
    </div>
}

export const WarnFlash = ({ message }) => <Flash className='warning' />;
export const TellFlash = ({ message }) => <Flash className='telling' />;
