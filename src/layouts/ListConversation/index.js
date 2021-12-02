import React, { memo } from 'react';
import { ChatCard } from '@components/index';
import { useSelector } from 'react-redux';
import dateDiffString from '@utils/dateDiffString';
import PropTypes from 'prop-types';
import './ListConversation.scss';
import { Typography } from '@material-ui/core';

export const ListConversation = memo((props) => {
  /** @type {{conversations: Conversation[], handleChangeCurConversation: (conversation: Conversation) => any}} */
  const { conversations, handleChangeCurConversation } = props;
  const user = useSelector((state) => state.auth.data.user);

  const _renderConversation = (conversation) => {
    const { type, members, lastMessage } = conversation;
    const time = dateDiffString(lastMessage?.createdAt);

    let photoLink, title, isOnline, text;
    if (type === 'group') {
      photoLink = conversation.photoLink;
      title = conversation.title;
      isOnline = false;
    } else {
      const member = members.filter((member) => member._id !== user._id)[0];
      photoLink = member.avatarLink;
      title = member.displayname;
      isOnline = member.isOnline;
    }

    if (lastMessage?.type === 'system') {
      text = lastMessage?.text;
    } else {
      if (lastMessage?.sender === user._id) {
        text = `You: ${lastMessage?.text}`;
      } else {
        const sender = members.find((member) => member._id === lastMessage?.sender);
        text = `${sender?.displayname}: ${lastMessage?.text}`;
      }
    }

    return (
      <ChatCard
        size='normal'
        key={conversation._id}
        photoLink={photoLink}
        title={title}
        isOnline={isOnline}
        text={text}
        time={time}
        onClick={() => handleChangeCurConversation(conversation)}
      />
    );
  };

  return (
    <div className='list-conversation'>
      {conversations.map(_renderConversation)}
      {conversations.length ? (
        ''
      ) : (
        <Typography align='center'>Let's go to the community and start a conversation</Typography>
      )}
    </div>
  );
});

ListConversation.propTypes = {
  conversations: PropTypes.array,
  handleChangeCurConversation: PropTypes.func,
};

ListConversation.defaultProp = {
  conversations: [],
  handleChangeCurConversation: () => null,
};
