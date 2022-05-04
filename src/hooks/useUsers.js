import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import userServices from '@services/user.services';
import { config } from '@constants/index';

const useUsers = (exceptUsers) => {
  const user = useSelector((state) => state.auth.data.user);
  /** @type {[User[], (users: User[]) => any]} */
  const [listUsers, setListUsers] = useState([]);

  const initConditions = useCallback(() => {
    const conditions = {
      keyword: '',
      startIndex: 0,
      limit: config.LIMIT,
      '_id[nin]': [user._id],
    };
    if (exceptUsers) {
      conditions['_id[nin]'] = conditions['_id[nin]'].concat(exceptUsers);
    }

    return conditions;
  }, [user._id, exceptUsers]);

  const [conditions, setConditions] = useState(initConditions);
  const [pagination, setPagination] = useState({ total: 0 });
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination.next) {
          setConditions((preConditions) => ({ ...preConditions, ...pagination.next }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, pagination?.next],
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await userServices.getUsers(conditions);

      if (conditions.startIndex) {
        setListUsers((preListUsers) => preListUsers.concat(response.data));
      } else {
        setListUsers(response.data);
      }

      setPagination(response?.pagination);
      setLoading(false);
    })();
  }, [conditions]);

  const addExceptUsers = useCallback(
    /**
     *
     * @param {string | string[]} userId
     */
    (userId) => {
      if (userId) {
        setConditions((preConditions) => ({
          ...preConditions,
          '_id[nin]': preConditions['_id[nin]'].concat(userId),
        }));
      }
    },
    [],
  );

  const removeExceptUser = useCallback(
    /**
     *
     * @param {string} userId
     */
    (userId) => {
      if (userId) {
        setConditions((preConditions) => ({
          ...preConditions,
          '_id[nin]': preConditions['_id[nin]'].filter((id) => id !== userId),
        }));
      }
    },
    [],
  );

  const changeKeyword = useCallback((keyword) => {
    setConditions((preConditions) => ({ ...preConditions, keyword, startIndex: 0 }));
  }, []);

  const resetConditions = useCallback(() => {
    setConditions(initConditions);
  }, [initConditions]);

  const changeUserInList = useCallback(
    (user) => {
      if (listUsers.length) {
        let match;
        const newListUsers = listUsers.map((u) => {
          if (u._id === user._id && !match) {
            match = true;
            return user;
          }

          return u;
        });

        if (match) {
          setListUsers(newListUsers);
        }
      }
    },
    [listUsers],
  );

  return {
    listUsers,
    loading,
    setConditions,
    pagination,
    resetConditions,
    addExceptUsers,
    removeExceptUser,
    lastUserElementRef,
    changeKeyword,
    changeUserInList,
  };
};

export default useUsers;
