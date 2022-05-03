import { MessageCard, Loading } from '@components/index';
import dayToString from '@utils/dayToString';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import './ListMessages.scss';

ListMessages.propTypes = {
  messages: PropTypes.array,
};

ListMessages.defaultProps = {
  messages: [],
};

export function ListMessages(props) {
  const user = useSelector((state) => state.auth.data.user);

  /** @type {{ messages: Message[]}} */
  const { messages, lastMessageElementRef, pagination, scrollRef } = props;

  const _renderMessage = (message, index, messages) => {
    let type, link, time, name, position;
    const text = message.text;

    if (message.type === 'system') {
      type = message.type;
    } else {
      if (message.sender._id === user._id) {
        type = 'me';
      } else {
        type = message.type;
      }

      link = message.sender.avatarLink;
      name = message.sender.displayname;
      time = dayToString(message.createdAt);

      if (messages[index - 1]?.sender?._id === message.sender._id) {
        if (messages[index + 1]?.sender?._id === message.sender._id) {
          position = 'middle';
        } else {
          position = 'top';
        }
      } else {
        if (messages[index + 1]?.sender?._id === message.sender._id) {
          position = 'bottom';
        } else {
          position = 'only';
        }
      }
    }

    return (
      <MessageCard
        key={message._id || message.subId}
        id={message._id}
        type={type}
        link={link}
        text={text}
        time={time}
        name={name}
        position={position}
      />
    );
  };
  return (
    <div className='list-messages'>
      <div ref={scrollRef}></div>
      {messages.map(_renderMessage)}
      {pagination.next ? (
        <div>
          <Loading size={30} />
        </div>
      ) : null}
      {pagination.next ? (
        <div className='list-messages__loadmore' ref={lastMessageElementRef}>
          Loading...
        </div>
      ) : null}
    </div>
  );
}
