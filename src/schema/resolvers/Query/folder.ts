import type { QueryResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import mongoose from 'mongoose';

export const folder: NonNullable<QueryResolvers['folder']> = async (_parent, { id }, _ctx) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      __typename: 'FolderError',
      error: 'INVALID_ID'
    };
  }
  
  const folderFound = await Folder.findById(id);
  
  if (!folderFound) {
    return {
      __typename: 'FolderError',
      error: 'NOT_FOUND'
    };
  }
  
  return {
    __typename: 'FolderSuccess',
    folder: folderFound
  };
};