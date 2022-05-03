import SocketEventEnum from './events';

export default class SocketService {
  /**
   *
   * @param {import('socket.io-client').Socket} socket
   */
  constructor(socket) {
    this.socket = socket;

    /**
     * @type User
     */
    this.user = {};
  }

  /**
   *
   * @param {import('socket.io-client').Socket} socket
   */
  setSocket = (socket) => {
    this.socket = socket;
  };

  getSocket = () => this.socket;

  /**
   *
   * @param {User} user
   */
  setUser = (user) => {
    this.user = user;
  };

  getUser = () => this.user;

  /**
   *
   * @param {(conversations: Conversation[]) => any} callback
   */
  onReceiveConversations = (callback) => {
    this.socket.on(SocketEventEnum.SV_SEND_CONVERSATIONS, (data) => {
      callback(data);
    });
  };

  clientGetConversations = () => {
    this.socket.emit(SocketEventEnum.CLIENT_GET_CONVERSATIONS);
  };

  /**
   *
   * @param {(user: User) => any} callback
   */
  clientFetchUser = (callback = () => null) => {
    this.socket.on(SocketEventEnum.SV_SEND_CUR_USER, (data) => {
      this.setUser(data);
      callback(data);
    });
  };

  /**
   *
   * @param {(user: User) => any} callback
   */
  onReceiveUserChangeStatus = (callback = () => null) => {
    this.socket.on(SocketEventEnum.SV_SEND_USER_CHANGE_STATUS, (data) => {
      callback(data);
    });
  };

  /**
   *
   * @param {{title: string, type: 'private' | 'group', members: Array<String>}} param0
   */
  clientCreateConversation = ({ title, type, members }) => {
    this.socket.emit(SocketEventEnum.CLIENT_CREATE_CONVERSATION, {
      type,
      title,
      newMembers: members.concat(this.user._id),
    });
  };

  /**
   *
   * @param {{conversationId: string, title: string, members: Array<String>}} param0
   */
  clientUpdateConversation = ({ conversationId, title, members }) => {
    this.socket.emit(SocketEventEnum.CLIENT_UPDATE_CONVERSATION, {
      conversationId,
      title,
      newMembers: members,
    });
  };

  onReceiveInvitation = () => {
    this.socket.on(SocketEventEnum.SV_SEND_INVITATIONS_JOIN_CONVERSATION, (data) => {
      if (data.newMembers.includes(this.user._id)) {
        this.socket.emit(SocketEventEnum.CLIENT_JOIN_ROOM, {
          conversationId: data.conversationId,
        });
      }
    });
  };

  /**
   *
   * @param {(conversation: Conversation) => any} callback
   */
  onReceiveConversation = (callback) => {
    this.socket.on(SocketEventEnum.SV_SEND_CONVERSATION, (data) => {
      callback(data);
    });
  };

  /**
   *
   * @param {{userId: string, conversationId: string}} param0
   */
  clientLeaveConversation = ({ userId, conversationId }) => {
    this.socket.emit(SocketEventEnum.CLIENT_LEAVE_CONVERSATION, { userId, conversationId });
  };

  /**
   *
   * @param {({conversationId: string, userId: string}) => any} callback
   */
  onLeaveRoom = (callback) => {
    this.socket.on(SocketEventEnum.SV_SEND_USER_LEAVE_CONVERSATION, (data) => {
      callback(data);
    });
  };

  /**
   *
   * @param {{text: string, userId?: string, conversationId?: string}} param0
   */
  clientSendMessage = ({ text, userId, conversationId, subId }) => {
    this.socket.emit(SocketEventEnum.CLIENT_SEND_MESSAGE, {
      text,
      userId,
      conversationId,
      subId,
    });
  };

  /**
   *
   * @param {(message: Message) => any} callback
   */
  onReceiveMessage = (callback) => {
    this.socket.on(SocketEventEnum.SV_SEND_MESSAGE, (data) => {
      callback(data);
    });
  };

  destroyAllListeners = () => {
    this.socket.removeAllListeners();
  };

  /**
   *
   * @param {(...args?: any[]) => any} handler
   */
  destroyListeners = (eventNames) => {
    eventNames.forEach((eventName) => {
      this.socket.removeAllListeners(eventName);
    });
  };

  disconnect = () => {
    this.socket.close();
  };
}
