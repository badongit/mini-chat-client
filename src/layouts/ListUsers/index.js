import React, { useEffect, useRef, useState } from 'react';
import { ChatCard, Loading } from '@components/index';
import './ListUsers.scss';
import PropTypes from 'prop-types';

ListUsers.propTypes = {
  listUsers: PropTypes.array,
  handleClickCard: PropTypes.func,
  pagination: PropTypes.object,
  lastUserElementRef: PropTypes.func,
  icon: PropTypes.object,
  modals: PropTypes.array,
  selectedUser: PropTypes.string,
};

ListUsers.defaultProps = {
  listUsers: [],
  handleClickCard: () => null,
  pagination: {},
  lastUserElementRef: () => null,
  icon: null,
  modals: [],
  selectedUser: '',
  handleClickIcon: () => null,
};

export function ListUsers(props) {
  /** @type {{ listUsers: User[] }} */
  const {
    listUsers,
    handleClickCard,
    pagination,
    lastUserElementRef,
    icon,
    modals,
    selectedUser,
    handleClickIcon,
  } = props;
  const listRef = useRef();
  const scrollTimeout = useRef();
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    let handleScroll;
    let offsetParent;

    if (modals?.length && listRef.current) {
      offsetParent = listRef.current.offsetParent;
      handleScroll = () => {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
          setScrollTop(listRef.current.offsetParent.scrollTop);
        }, 100);
      };

      listRef.current.offsetParent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (handleScroll && offsetParent) {
        offsetParent.removeEventListener('scroll', handleScroll);
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [modals]);

  const _renderCard = (user) => {
    const { avatarLink: photoLink, isOnline, displayname: title, _id: userId } = user;

    return (
      <ChatCard
        key={user._id}
        photoLink={photoLink}
        isOnline={isOnline}
        title={title}
        size='small'
        icon={icon}
        modals={modals}
        userId={userId}
        onClick={() => handleClickCard(user)}
        displayModals={selectedUser === user._id}
        onClickIcon={() => handleClickIcon(user._id)}
        scrollTop={scrollTop}
      />
    );
  };

  return (
    <div className='list-users' ref={listRef}>
      {listUsers.map(_renderCard)}
      {pagination.next ? (
        <div>
          <Loading size={30} />
        </div>
      ) : null}
      {pagination.next ? (
        <div ref={lastUserElementRef} className='list-users__loadmore'>
          Loading...
        </div>
      ) : null}
    </div>
  );
}
