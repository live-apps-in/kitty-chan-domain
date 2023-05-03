import 'reflect-metadata';
import { IGuild } from '../interface/shared.interface';

export const find_valo_unranked_template = (guild: IGuild) => {
  return `Hello, <@${guild.userId}> wants to play VALORANT now!`;
};
