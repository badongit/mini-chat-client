const SocketEventEnum = {
  ERROR: 'error',
  CONNECTION: 'connection',
  CONNECT_ERROR: 'connect_error',
  DISCONNECT: 'disconnect',
  SV_SEND_CUR_USER: 'server-send-current-user',
  SV_SEND_USER_CHANGE_STATUS: 'server-send-user-change-status',
  SV_SEND_CONVERSATIONS: 'server-send-conversations',
  SV_SEND_CONVERSATION: 'server-send-conversation',
  SV_SEND_INVITATIONS_JOIN_CONVERSATION: 'server-send-inviations-join-room',
  SV_SEND_USER_LEAVE_CONVERSATION: 'server-send-user-leave-conversation',
  SV_SEND_MESSAGE: 'server-send-message',
  CLIENT_GET_CONVERSATIONS: 'client-get-conversations',
  CLIENT_CREATE_CONVERSATION: 'client-create-convesation',
  CLIENT_JOIN_ROOM: 'client-join-room',
  CLIENT_UPDATE_CONVERSATION: 'client-update-conversation',
  CLIENT_LEAVE_CONVERSATION: 'client-leave-conversation',
  CLIENT_SEND_MESSAGE: 'client-send-message',
};

export default SocketEventEnum;
