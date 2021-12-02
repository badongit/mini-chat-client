import { useCallback, useEffect, useRef, useState } from 'react';
import { config } from '@constants/index';
import messageServices from '@services/message.services';

const useMessages = () => {
  /** @type {[Message[], (messages: Message[]) => any]} */
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({ total: 0 });
  const [loading, setLoading] = useState(false);

  const [conditions, setConditions] = useState({ startIndex: 0, limit: config.LIMIT });

  const observer = useRef();
  const lastMessageElementRef = useCallback(
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
    [loading, pagination.next],
  );

  useEffect(() => {
    setMessages([]);
    setPagination({ total: 0 });
  }, [conditions.conversation]);

  useEffect(() => {
    (async () => {
      if (conditions.conversation) {
        setLoading(true);
        const response = await messageServices.getMessages(conditions);

        if (conditions.startIndex) {
          setMessages((preMessages) => preMessages.concat(response.data));
        } else {
          setMessages(response.data);
        }

        setPagination(response.pagination);
        setLoading(false);
      }
    })();
  }, [conditions]);

  const increasePagination = useCallback(() => {
    if (pagination.next) {
      setPagination((prePagination) => ({
        ...prePagination,
        next: {
          ...prePagination.next,
          startIndex: prePagination.next.startIndex + 1,
        },
        total: prePagination.total + 1,
      }));
    }
  }, [pagination]);

  const insertMessage = useCallback(
    /**
     *
     * @param {Message} message
     */
    (message) => {
      if (message) {
        setMessages((preMessages) => [message].concat(preMessages));
      }
    },
    [],
  );

  return {
    messages,
    setPagination,
    loading,
    pagination,
    increasePagination,
    insertMessage,
    setConditions,
    lastMessageElementRef,
  };
};

export default useMessages;
