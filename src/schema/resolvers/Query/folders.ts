import type { QueryResolvers } from './../../types.generated';
import { Folder } from '../../../db';

export const folders: NonNullable<QueryResolvers['folders']> = async (_parent, _arg, _ctx) => {
  const folders = await Folder.find();
  return folders;
};