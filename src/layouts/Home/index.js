import React, { useState, memo } from 'react';
import { NavigateBar, InputDebounce, Loading } from '@components/index';
import './Home.scss';
import PropTypes from 'prop-types';
import { Forum, Public, Search } from '@material-ui/icons';
import { ListConversation, ListUsers, HomeHeader } from '@layouts/index';

export const Home = memo(function (props) {
  /** @type {['conversation' | 'community', (layout: 'conversation' | 'community') => any]} */
  const [layout, setLayout] = useState('conversation');
  const {
    listUsers,
    changeKeyword,
    handleChangeStranger,
    conversations,
    loading,
    loadingUsers,
    handleChangeCurConversation,
    setHideCreateGroup,
    lastUserElementRef,
    pagination,
  } = props;

  const buttons = [
    {
      icon: Forum,
      key: 'conversation',
      text: 'Conversation',
      handleClick: () => setLayout('conversation'),
    },
    {
      icon: Public,
      key: 'community',
      text: 'Community',
      handleClick: () => setLayout('community'),
    },
  ];

  return (
    <div className='home'>
      <HomeHeader setHideCreateGroup={setHideCreateGroup} />
      <NavigateBar
        buttons={buttons}
        fontSize='18px'
        layout={layout}
        hiddenText={{ lgDown: true }}
      />
      <div className='home__list'>
        <div className={`home__list__conversations ${layout === 'conversation' ? 'display' : ''}`}>
          {!conversations.length && loading ? (
            <Loading />
          ) : (
            <ListConversation
              conversations={conversations}
              handleChangeCurConversation={handleChangeCurConversation}
            />
          )}
        </div>
        <div className={`home__list__users ${layout === 'community' ? 'display' : ''}`}>
          <div className='home__list__input-search'>
            <InputDebounce
              wait={300}
              icon={Search}
              placeholder='Search user'
              onSubmit={changeKeyword}
            />
          </div>
          {!listUsers.length && loadingUsers ? (
            <Loading size={30} />
          ) : (
            <ListUsers
              listUsers={listUsers}
              handleClickCard={handleChangeStranger}
              pagination={pagination}
              lastUserElementRef={lastUserElementRef}
            />
          )}
        </div>
      </div>
    </div>
  );
});

Home.propTypes = {
  listUsers: PropTypes.array,
  conversations: PropTypes.array,
  changeKeyword: PropTypes.func,
  handleChangeStranger: PropTypes.func,
  handleChangeCurConversation: PropTypes.func,
  loading: PropTypes.bool,
  loadingUsers: PropTypes.bool,
  setHideCreateGroup: PropTypes.func,
  pagination: PropTypes.object,
  lastUserElementRef: PropTypes.func,
};

Home.defaultProps = {
  listUsers: [],
  conversations: [],
  changeKeyword: () => null,
  handleChangeStranger: () => null,
  handleChangeCurConversation: () => null,
  loading: false,
  loadingUsers: false,
  setHideCreateGroup: () => null,
  pagination: {},
  lastUserElementRef: () => null,
};
