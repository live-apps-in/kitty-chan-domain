export enum DiscordTemplateType {
  plain = 'plain',
  embed = 'embed',
}

export enum DiscordTemplateTarget {
  /**Welcome/Leave */
  WELCOME_MESSAGE = 'welcomeMessage',

  /**Logs */
  messageUpdate = 'messageUpdate',
  messageDelete = 'messageDelete',

  /**Member */
  memberNicknameUpdate = 'memberNicknameUpdate',
  memberUsernameUpdate = 'memberUsernameUpdate',
  memberAvatarUpdate = 'memberAvatarUpdate',
  memberAddRole = 'memberAddRole',
  memberRemoveRole = 'memberRemoveRole',
}
