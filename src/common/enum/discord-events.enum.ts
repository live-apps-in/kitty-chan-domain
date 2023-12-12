export enum DiscordEventsType {
  /**Message */
  messageCreate = 'messageCreate',
  messageUpdate = 'messageUpdate',
  messageDelete = 'messageDelete',

  /**Member */
  memberCreate = 'memberCreate',
  memberUpdate = 'memberUpdate',
  memberDelete = 'memberDelete',
  memberNicknameUpdate = 'memberNicknameUpdate',
  memberUsernameUpdate = 'memberUsernameUpdate',
  memberAvatarUpdate = 'memberAvatarUpdate',
  memberAddRole = 'memberAddRole',
  memberRemoveRole = 'memberRemoveRole',
}
