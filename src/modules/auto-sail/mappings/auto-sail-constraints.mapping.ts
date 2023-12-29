export const AutoSailDynamicFieldsMapping = {
  messageCreate: {
    message: 'plainMessage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    channelId: 'channelId',
  },
};

export const AutoSailConstraintsMapping = {
  message: 'text',
  userId: 'text',
  roleId: 'text',
  channelId: 'text',
  createdAt: 'date',
};
