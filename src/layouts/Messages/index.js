import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Welcome } from '@components/index';
import { ConversationDetail, SendMessage, ListMessages, MessagesHeader } from '@layouts/index';
import './Messages.scss';
import { Box, Grid, Hidden, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SocketContext from '@socket/SocketReactContext';
import { Loading } from '@components/index';
import SocketEventEnum from '@socket/events';
import useMessages from '@hooks/useMessages';
import { ArrowDownward } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

export const Messages = React.memo(function (props) {
  const { socketService, socket } = useContext(SocketContext);
  /** @type {{ converastion: Conversation, stranger: User}} */
  const { conversation, stranger, handleReceiveConversation, handleBackMessage } = props;
  const user = useSelector((state) => state.auth.data.user);
  const [hideDetail, setHideDetail] = useState(true);

  const { messages, loading, pagination, insertMessage, setConditions, lastMessageElementRef } =
    useMessages();

  const scrollRef = useRef();

  //-handle
  const handleSendMessage = useCallback(
    (data) => {
      const conversationId = conversation?._id;
      const userId = stranger?._id;
      const text = data.text;
      const subId = uuidv4();
      if (socket) socketService.clientSendMessage({ conversationId, userId, text, subId });
      insertMessage({
        conversationId,
        userId,
        text,
        subId,
        conversation,
        type: 'user',
        sender: user,
      });
    },
    [stranger?._id, socket, socketService, insertMessage, user, conversation],
  );

  const handleReceiveMessage = useCallback(
    (message) => {
      if (message.conversation === conversation?._id) {
        insertMessage(message);
      }
    },
    [conversation?._id, insertMessage],
  );

  const handleScrollIntoView = useCallback(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  }, []);

  const toggleHideDetail = useCallback(() => {
    setHideDetail((preHideDetail) => !preHideDetail);
  }, []);

  // use effect
  useEffect(() => {
    if (socket) {
      socketService.onReceiveMessage(handleReceiveMessage);
    }

    return () => {
      socketService.destroyListeners([SocketEventEnum.SV_SEND_MESSAGE]);
    };
  }, [handleReceiveMessage, socket, socketService]);

  useEffect(() => {
    setConditions((preConditions) => ({
      ...preConditions,
      startIndex: 0,
      conversation: conversation?._id,
    }));
  }, [conversation?._id, setConditions]);

  useEffect(() => {
    setHideDetail(true);
  }, [conversation?._id]);

  //-_render
  const _renderBodyMessages = () => {
    if (conversation || stranger) {
      let linkHeader, name, type;
      if (conversation?.type === 'group') {
        linkHeader = conversation.photoLink;
        name = conversation.title;
        type = conversation.type;
      } else if (conversation?.type === 'private') {
        const receiver = conversation.members.find((member) => member._id !== user._id);
        linkHeader = receiver.avatarLink;
        name = receiver.displayname;
        type = conversation.type;
      } else {
        linkHeader = stranger.avatarLink;
        name = stranger.displayname;
        type = 'private';
      }

      return (
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='flex-end'
          className='messages__frame-chat'>
          <div className='messages__frame-chat__header'>
            <MessagesHeader
              toggleHideDetail={toggleHideDetail}
              link={linkHeader}
              name={name}
              type={type}
              onClickBack={handleBackMessage}
            />
          </div>
          <div className='messages__frame-chat__list-messages'>
            <div className='messages__frame-chat__list-messages__button-scroll'>
              <IconButton onClick={handleScrollIntoView}>
                <ArrowDownward color='primary' />
              </IconButton>
            </div>
            {loading && !messages.length ? (
              <Loading size={30} />
            ) : (
              <ListMessages
                messages={messages}
                pagination={pagination}
                lastMessageElementRef={lastMessageElementRef}
                scrollRef={scrollRef}
              />
            )}
          </div>
          <SendMessage handleSendMessage={handleSendMessage} />
        </Box>
      );
    }

    return <Welcome />;
  };

  return (
    <Grid container wrap='nowrap'>
      {
        <Hidden smDown={!hideDetail}>
          <Grid item xs>
            <div className='messages'>{_renderBodyMessages()}</div>
          </Grid>
        </Hidden>
      }
      {hideDetail ? null : !conversation?._id ? null : (
        <Grid item xs={12} md={6} lg={4}>
          <ConversationDetail
            conversation={conversation}
            handleReceiveConversation={handleReceiveConversation}
            setHideDetail={setHideDetail}
          />
        </Grid>
      )}
    </Grid>
  );
});

Messages.propTypes = {
  conversation: PropTypes.object,
  stranger: PropTypes.object,
  handleReceiveConversation: PropTypes.func,
};

Messages.defaultProps = {
  conversation: null,
  stranger: null,
  handleReceiveConversation: () => null,
};
