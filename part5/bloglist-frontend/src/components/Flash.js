import React from 'react';
import './Flash.css'

const Flash = ({message, className}) => message === null ? 
 null :
 <div className={`flash ${className}`}>
  {message}
</div>

export const WarnFlash = ({message}) => <Flash message={message} className='warning' />;
export const TellFlash = ({message}) => <Flash message={message} className='telling' />;
