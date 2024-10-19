// Messages.js

import React, { useState, useEffect, useContext, Fragment } from 'react';
import styles from './Messages.module.css'; // Make sure to have the appropriate CSS file
import useInput from '../../Hooks/use-input';
import Button from '../UI/Button';
import Card from '../UI/Card';
import img from '../../Assets/img.jpg';
import { AuthContext } from '../../context/auth-context'
import axios from 'axios';

const Messages_Comp = ({ producerId, displaySuccess, displayError }) => {
  const [messages, setMessages] = useState(null);
  const { currentUser, isLoading } = useContext(AuthContext);
  const [posting, setPosting] = useState(false);
  const {
    value: enteredMessage,
    valueIsValid: messageIsValid,
    hasError: messageHasError,
    inputChangedHandler: messageInputChangeHandler,
    inputBlurHandler: messageInputBlurHandler,
    reset: resetMessageInput,
  } = useInput((value) => {
    return value.trim() !== "";
  });
  const cannotSubmit = !messageIsValid || posting;

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/messages/${producerId}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err)
      }
    }
    getMessages();
  }, [producerId]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      const res = await axios.post(`http://localhost:8000/messages/AddMessage/${producerId}`, { message: enteredMessage });
      displaySuccess(res.data.message);
      setPosting(false);
    } catch (err) {
      displayError(err.response.data.Error);
      setPosting(false);
    }
  }
  const deleteMessageHandler = async (e) => {
    try {
      const res = await axios.post(`http://localhost:8000/messages/DeleteMessage/${e.target.value}`);
      displaySuccess(res.data.message);
    } catch (err) {
      displayError(err.response.data.Error);
    }
  }

  if (isLoading)
    return (null)

  return (
    <Fragment>
      {currentUser && <div className={styles['send-container']}>
        <div className={styles['control-input']}>
          <textarea id='message' name='message' rows='10' value={enteredMessage} onChange={messageInputChangeHandler} onBlur={messageInputBlurHandler} placeholder='Write Something'>
          </textarea>
          {messageHasError && (
            <p className={styles["error-text"]}>Message Is Not Valid</p>
          )}
        </div>
        <Button onClick={sendMessageHandler} className={`${cannotSubmit ? styles.cannotSubmit : ""}`}>{posting ? "Posting" : "Post"}</Button>
      </div>}
      <div className={styles['messages-container']}>
        {messages && messages.map(message => {
          return (
            <Card className={styles['message-container']}>
              <div className={styles['sender-profile']}>
                <img src={img} alt='user'></img>
                <div className={styles['name-time']}>
                  <div className={styles['sender-name']}>{message.sender_name}</div>
                  <div className={styles['time-stamp']}>{formatTimestamp(message.timestamp)}</div>
                </div>
              </div>
              <div className={styles.content}>
                {message.content}
              </div>
              {currentUser ? (currentUser.user_id === message.sender_id || currentUser.user_id === message.receiver_id) && <Button value={message.message_id} onClick={deleteMessageHandler}>Delete</Button> : null}
            </Card>
          )
        })}
      </div>
    </Fragment>
  );
};

// Helper function to format timestamp (you can use a library for more advanced formatting)
const formatTimestamp = (timestamp) => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);
  const timeDiff = currentDate - messageDate;

  // Convert milliseconds to days
  const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

  if (daysDiff === 0) {
    // Today
    return 'Today';
  } else if (daysDiff === 1) {
    // Yesterday
    return 'Yesterday';
  } else {
    // More than 1 day ago
    return `${daysDiff} days ago`;
  }
};

export default Messages_Comp;