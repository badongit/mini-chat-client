const conversationsMock = [
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
  {
    _id: 'con1',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'group',
    title: 'Group 1',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u3',
        displayname: 'Dong3',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    admin: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con1',
      type: 'system',
      text: 'Dong1 has created this conversation',
      createdAt: 1633274168580,
    },
  },
  {
    _id: 'con2',
    photoLink: 'https://drive.google.com/uc?id=1mYv3V2__mOIbEvg8C2B4_HvS-yl0z0mh',
    type: 'private',
    title: '',
    members: [
      {
        _id: 'u1',
        displayname: 'Dong1',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
      {
        _id: 'u2',
        displayname: 'Dong2',
        avatarLink: 'https://drive.google.com/uc?id=1ZIMBibM4hIkyso_U6G_kn7LBUvXmOkCe',
        isOnline: false,
      },
    ],
    lastMessage: {
      conversation: 'con2',
      type: 'user',
      sender: 'u1',
      text: 'Dit me m',
    },
  },
];

export default conversationsMock;
