import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { Close, Search, Refresh } from '@material-ui/icons';
import React, { memo, useCallback, useState } from 'react';
import './CreateGroup.scss';
import PropTypes from 'prop-types';
import useUsers from '@hooks/useUsers';
import { InputDebounce, UserCard } from '@components/index';
import { ListUsers } from '@layouts/index';

export const CreateGroup = memo((props) => {
  const { setHide, groupNameCur, membersCur, textSubmit, handleSubmit } = props;
  const [groupName, setGroupName] = useState(groupNameCur);
  const [members, setMembers] = useState([]);

  const {
    listUsers,
    setConditions,
    pagination,
    resetConditions,
    addExceptUsers,
    removeExceptUser,
    lastUserElementRef,
  } = useUsers(membersCur);

  const handleChangeKeyword = useCallback(
    /**
     *
     * @param {string} keyword
     */
    (keyword) => {
      setConditions((preConditions) => ({
        ...preConditions,
        keyword,
        startIndex: 0,
      }));
    },
    [setConditions],
  );

  const handleAddMembers = useCallback(
    /**
     *
     * @param {User} user
     */
    (user) => {
      if (user) {
        setMembers((preMembers) => preMembers.concat(user));
        addExceptUsers(user._id);
      }
    },
    [addExceptUsers],
  );

  const handleRemoveMembers = useCallback(
    (user) => {
      if (user) {
        setMembers((preMembers) => preMembers.filter((member) => member._id !== user._id));
        removeExceptUser(user._id);
      }
    },
    [removeExceptUser],
  );

  const handleResetForm = useCallback(() => {
    setGroupName(groupNameCur);
    setMembers([]);
    resetConditions();
  }, [resetConditions, groupNameCur]);

  const onSubmit = useCallback(() => {
    handleSubmit(groupName, members);
    handleResetForm();
    setHide(true);
  }, [groupName, members, setHide, handleResetForm, handleSubmit]);

  return (
    <div className='create-group'>
      <div className='create-group__overlay' onClick={() => setHide(true)}></div>
      <div className='create-group__modal'>
        <div className='create-group__modal__header'>
          <Typography variant='h6' align='center'>
            {groupNameCur ? 'UPDATE GROUP' : 'CREATE GROUP'}
          </Typography>
          <div className='create-group__modal__header__close'>
            <IconButton onClick={() => setHide(true)}>
              <Close />
            </IconButton>
          </div>
          <div className='create-group__modal__header__reset'>
            <IconButton onClick={handleResetForm}>
              <Refresh />
            </IconButton>
          </div>
        </div>
        <TextField
          autoComplete='off'
          required
          label='Group name'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
        />
        <Typography>New members</Typography>
        <div className='create-group__modal__members'>
          {members.map((member) => (
            <UserCard
              key={member._id}
              link={member.avatarLink}
              name={member.displayname}
              onClose={() => handleRemoveMembers(member)}
            />
          ))}
        </div>
        <InputDebounce
          icon={Search}
          value=''
          wait={300}
          name='create-group'
          placeholder='Search user'
          onSubmit={handleChangeKeyword}
        />
        <div className='create-group__modal__list-users'>
          <ListUsers
            listUsers={listUsers}
            handleClickCard={handleAddMembers}
            pagination={pagination}
            lastUserElementRef={lastUserElementRef}
          />
        </div>
        <div className='create-group__modal__submit'>
          <Button
            variant='contained'
            color='primary'
            disabled={!groupName || !(members.length + membersCur.length >= 2)}
            onClick={onSubmit}>
            {textSubmit}
          </Button>
        </div>
      </div>
    </div>
  );
});

CreateGroup.propTypes = {
  setHide: PropTypes.func,
  groupNameCur: PropTypes.string,
  membersCur: PropTypes.array,
  textSubmit: PropTypes.string,
  handleSubmit: PropTypes.func,
};

CreateGroup.defaultProps = {
  setHide: () => null,
  groupNameCur: '',
  membersCur: [],
  textSubmit: 'Submit',
  handleSubmit: () => null,
};
