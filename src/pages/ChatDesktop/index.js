import React, { useCallback, useEffect, useState } from 'react';
import { Messages, Home, CreateGroup } from '@layouts/index';
import { Grid, Hidden } from '@material-ui/core';
import { useAuthenticatedSocket } from '@socket/hook';
import { useSelector } from 'react-redux';
import SocketEventEnum from '@socket/events';
import useUsers from '@hooks/useUsers';

export function ChatDesktop(props) {
  const { socket, socketService } = useAuthenticatedSocket();
  const auth = useSelector((state) => state.auth);
  /** @type {[ Conversation[], (conversations: Conversation[]) => any ]}  */
  const [conversations, setConversations] = useState([]);

  const {
    listUsers,
    pagination,
    lastUserElementRef,
    changeKeyword,
    changeUserInList,
    loading: loadingUsers,
  } = useUsers();

  const [loading, setLoading] = useState(true);
  const [hideCreateGroup, setHideCreateGroup] = useState(true);

  /** @type {[ Conversation, (conversation: Conversation) => any]} */
  const [curConversation, setCurConversation] = useState(null);

  /** @type {[ User, (user: User) => any]} */
  const [stranger, setStranger] = useState(null);

  // -handler
  const handleReceiveConversation = useCallback(
    /**
     *
     * @param {Conversation} conversation
     */
    (conversation) => {
      const newConversations = conversations.filter((con) => con._id !== conversation._id);
      newConversations.push(conversation);
      setConversations(newConversations);
      if (curConversation?._id === conversation._id) {
        setCurConversation(conversation);
      }
    },
    [conversations, curConversation],
  );

  const handleLeaveRoom = useCallback(
    ({ conversationId, userId }) => {
      if (userId === auth.data.user._id) {
        const newConversations = conversations.filter((con) => con._id !== conversationId);
        setConversations(newConversations);

        if (curConversation._id === conversationId) {
          setCurConversation(null);
        }
      }
    },
    [conversations, auth.data.user._id, curConversation],
  );

  const handleReceiveConversations = useCallback(
    (cons) => {
      setLoading(true);
      if (JSON.stringify(cons) !== JSON.stringify(conversations)) {
        setConversations(cons);
      }
      setLoading(false);
    },
    [conversations],
  );

  const handleUserChangeStatus = useCallback(
    (user) => {
      let match = false;
      if (conversations?.length) {
        const newConversations = conversations.map((conversation) => {
          if (conversation.type === 'private' && !match) {
            conversation.members = conversation.members.map((member) => {
              if (member._id === user._id) {
                match = true;
                return user;
              }
              return member;
            });
          }
          return conversation;
        });

        if (match) {
          setConversations(newConversations);
          match = false;
        }
      }

      changeUserInList(user);
    },
    [conversations, changeUserInList],
  );

  /**
   *
   * @param {User} user
   */
  const handleChangeStranger = useCallback((user) => {
    setCurConversation(null);
    setStranger(user);
  }, []);

  /**
   *
   * @param {Conversation} conversation
   */
  const handleChangeCurConversation = useCallback((conversation) => {
    setStranger(null);
    setCurConversation(conversation);
  }, []);

  const handleSubmit = useCallback(
    /**
     *
     * @param {string} groupName
     * @param {string[]} members
     */
    (groupName, members) => {
      socketService.clientCreateConversation({
        title: groupName,
        type: 'group',
        members,
      });
    },
    [socketService],
  );

  const handleBackMessage = useCallback(() => {
    setCurConversation(null);
    setStranger(null);
  }, []);

  //-useEffect;
  useEffect(() => {
    if (socket) {
      socketService.clientFetchUser(socketService.setUser);
      socketService.onReceiveInvitation();
    }

    return () => {
      socketService.destroyListeners([
        SocketEventEnum.SV_SEND_CUR_USER,
        SocketEventEnum.SV_SEND_INVITATIONS_JOIN_CONVERSATION,
      ]);
    };
  }, [socket, socketService]);

  useEffect(() => {
    if (socket) {
      socketService.onReceiveUserChangeStatus(handleUserChangeStatus);
    }

    return () => {
      socketService.destroyListeners([SocketEventEnum.SV_SEND_USER_CHANGE_STATUS]);
    };
  }, [socket, socketService, handleUserChangeStatus]);

  useEffect(() => {
    if (socket) {
      socketService.onLeaveRoom(handleLeaveRoom);
      socketService.onReceiveConversations(handleReceiveConversations);
      socketService.onReceiveConversation(handleReceiveConversation);
    }

    return () => {
      socketService.destroyListeners([
        SocketEventEnum.SV_SEND_USER_LEAVE_CONVERSATION,
        SocketEventEnum.SV_SEND_CONVERSATION,
        SocketEventEnum.SV_SEND_CONVERSATIONS,
      ]);
    };
  }, [
    socket,
    socketService,
    handleLeaveRoom,
    handleReceiveConversation,
    handleReceiveConversations,
  ]);

  useEffect(() => {
    let timerId;

    if (socket) {
      timerId = setTimeout(() => {
        socketService.clientGetConversations();
      }, 2000);
    }

    return () => clearTimeout(timerId);
  }, [socket, socketService]);

  useEffect(() => {
    if (stranger && conversations?.length) {
      const conversation = conversations.find((con) => {
        if (
          con.type === 'private' &&
          con.members.findIndex((member) => member._id === stranger._id) + 1
        ) {
          return true;
        }
        return false;
      });

      if (conversation) {
        setCurConversation(conversation);
        setStranger(null);
      }
    }
  }, [stranger, conversations]);

  return (
    <div className='chat-desktop'>
      {hideCreateGroup || (
        <CreateGroup
          setHide={setHideCreateGroup}
          textSubmit={'Create'}
          handleSubmit={handleSubmit}
        />
      )}
      <Grid container>
        <Hidden xsDown={!!curConversation || !!stranger}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Home
              conversations={conversations}
              listUsers={listUsers}
              changeKeyword={changeKeyword}
              handleChangeStranger={handleChangeStranger}
              handleChangeCurConversation={handleChangeCurConversation}
              loading={loading}
              loadingUsers={loadingUsers}
              setHideCreateGroup={setHideCreateGroup}
              pagination={pagination}
              lastUserElementRef={lastUserElementRef}
            />
          </Grid>
        </Hidden>
        <Hidden xsDown={!curConversation && !stranger}>
          <Grid item xs>
            <Messages
              conversation={curConversation}
              stranger={stranger}
              handleReceiveConversation={handleReceiveConversation}
              handleBackMessage={handleBackMessage}
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}
