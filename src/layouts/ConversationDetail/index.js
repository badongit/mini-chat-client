import {
  HeaderDetail,
  NavigateBar,
  Notification,
  UploadAvatar,
  ModalConfirm,
} from '@components/index';
import { ListUsers, CreateGroup } from '@layouts/index';
import { Group, HowToReg, MoreHoriz, Settings, Close, ExitToApp } from '@material-ui/icons';
import conversationServices from '@services/conversation.services';
import SocketContext from '@socket/SocketReactContext';
import _ from 'lodash';
import React, { memo, useCallback, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import infoConfirmModal from '@utils/infoConfirmModal';
import convertKeyOfArray from '@utils/convertKeyOfArray';
import './ConversationDetail.scss';
import { IconButton } from '@material-ui/core';

export const ConversationDetail = memo((props) => {
  const { conversation, handleReceiveConversation, setHideDetail } = props;
  const { socketService } = useContext(SocketContext);

  /** @type {User[]} */
  const members = _.differenceWith(conversation.members, conversation.admin, _.isEqual);

  /** @type { ['members' | 'admin', ('members' | 'layout') => any]} */
  const [layout, setLayout] = useState('members');
  const user = useSelector((state) => state.auth.data.user);
  const [isAdmin, setIsAdmin] = useState(false);

  // for upload avatar modal
  const [hideModal, setHideModal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // for notification
  const initialMessage = { type: '', text: '' };
  const [message, setMessage] = useState(initialMessage);

  // for chat card modal and confirm modal
  const [selectedUser, setSelectedUser] = useState('');

  // for confirm modal
  const [hideModalConfirm, setHideModalConfirm] = useState(true);
  const [propsConfirmModal, setPropsConfirmModal] = useState({});

  // for create group form
  const [hideCreateGroup, setHideCreateGroup] = useState(true);

  // use Effect
  useEffect(() => {
    if (~conversation.admin.findIndex((ad) => ad._id === user._id)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [conversation.admin, user._id]);

  // -handlers
  const handleLeaveConversation = useCallback(
    (userId) => {
      if (!userId) {
        return;
      }

      socketService.clientLeaveConversation({ userId, conversationId: conversation._id });
      setSelectedUser('');
      setHideModalConfirm(true);
      setPropsConfirmModal({});
    },
    [conversation._id, socketService],
  );

  const handleChangeRole = useCallback(
    /**
     *
     * @param {string} userId
     * @param {'admin' | 'member'} role
     */
    async (userId, role) => {
      try {
        if (!userId || !role) return;

        const response = await conversationServices.changeRole({
          userId,
          role,
          conversationId: conversation._id,
        });

        setMessage({ type: 'success', text: response.message });
        handleReceiveConversation(response.data.conversation);
        setSelectedUser('');
      } catch (error) {
        setMessage({ type: 'error', text: error.message });
        console.log(error);
      }
    },
    [handleReceiveConversation, conversation._id],
  );

  const handleUploadPhoto = async (formUpload) => {
    try {
      setIsSubmitting(true);
      const response = await conversationServices.uploadPhoto(conversation._id, formUpload);
      setMessage({ type: 'success', text: response.message });
      handleReceiveConversation(response.data.conversation);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleCardModal = useCallback((userId) => {
    setSelectedUser((preSelectedUser) => {
      if (preSelectedUser === userId) return '';

      return userId;
    });
  }, []);

  const handleClickRemoveUser = useCallback(() => {
    setHideModalConfirm(false);
    setPropsConfirmModal(infoConfirmModal('remove', () => handleLeaveConversation(selectedUser)));
  }, [selectedUser, handleLeaveConversation]);

  const handleCloseConfirmModal = useCallback(() => {
    setHideModalConfirm(true);
    setPropsConfirmModal({});
  }, []);

  const handleClickLeave = () => {
    setHideModalConfirm(false);
    setPropsConfirmModal(infoConfirmModal('leave', () => handleLeaveConversation(user._id)));
  };

  const handleUpdateConversation = useCallback(
    (groupName, members) => {
      if (!conversation._id || !groupName) {
        return;
      }
      socketService.clientUpdateConversation({
        conversationId: conversation._id,
        title: groupName,
        members,
      });
    },
    [conversation, socketService],
  );

  const buttons = [
    {
      icon: Group,
      key: 'members',
      text: 'Members',
      handleClick: () => setLayout('members'),
    },
    {
      icon: HowToReg,
      key: 'admin',
      text: 'admin',
      handleClick: () => setLayout('admin'),
    },
  ];

  const modalsUser = [
    {
      text: 'Remove from group',
      handleClick: handleClickRemoveUser,
    },
    {
      text: 'Add admin',
      handleClick: (userId) => handleChangeRole(userId, 'admin'),
    },
  ];

  const modalsAdmin = [
    {
      text: 'Remove from group',
      handleClick: handleClickRemoveUser,
    },
    {
      text: 'Remove admin',
      handleClick: (userId) => handleChangeRole(userId, 'member'),
    },
  ];

  const _renderAvatar = () => {
    const { photoLink: src, title } = conversation;

    return <HeaderDetail src={src} title={title} onClickIcon={() => setHideModal(false)} />;
  };

  return (
    <div className='conversation-detail'>
      <div className='conversation-detail__button-control'>
        {isAdmin ? (
          <IconButton onClick={() => setHideCreateGroup(false)}>
            <Settings />
          </IconButton>
        ) : (
          <IconButton onClick={handleClickLeave}>
            <ExitToApp />
          </IconButton>
        )}
        <IconButton onClick={() => setHideDetail(true)}>
          <Close />
        </IconButton>
      </div>
      <Notification
        type={message.type}
        text={message.text}
        handleResetMessage={() => setMessage(initialMessage)}
      />
      <ModalConfirm
        hide={hideModalConfirm}
        handleClose={handleCloseConfirmModal}
        {...propsConfirmModal}
      />
      {hideCreateGroup || (
        <CreateGroup
          setHide={setHideCreateGroup}
          textSubmit='save'
          membersCur={convertKeyOfArray(conversation.members, '_id')}
          groupNameCur={conversation.title}
          handleSubmit={handleUpdateConversation}
        />
      )}
      <UploadAvatar
        hide={hideModal}
        setHideModal={setHideModal}
        type='photo'
        isSubmitting={isSubmitting}
        onSubmit={handleUploadPhoto}
      />
      {_renderAvatar()}
      <NavigateBar buttons={buttons} fontSize='16px' layout={layout} />
      <div className='conversation-detail__list'>
        <div
          className={`conversation-detail__list__members ${
            layout === 'members' ? 'conversation-detail__list__display' : ''
          }`}>
          <ListUsers
            listUsers={members}
            icon={MoreHoriz}
            modals={isAdmin ? modalsUser : []}
            selectedUser={selectedUser}
            handleClickIcon={handleToggleCardModal}
          />
        </div>
        <div
          className={`conversation-detail__list__admin ${
            layout !== 'members' ? 'conversation-detail__list__display' : ''
          }`}>
          <ListUsers
            listUsers={conversation.admin}
            icon={MoreHoriz}
            selectedUser={selectedUser}
            modals={isAdmin ? modalsAdmin : []}
            handleClickIcon={handleToggleCardModal}
          />
        </div>
      </div>
    </div>
  );
});
