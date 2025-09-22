import type { QueryResolvers } from './../../types.generated';
import { Note } from '../../../db';
import mongoose from 'mongoose';

export const note: NonNullable<QueryResolvers['note']> = async (_parent, { id }, _ctx) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      __typename: 'NoteError',
      error: 'INVALID_ID'
    };
  }
  
  const noteFound = await Note.findById(id);
  
  if (!noteFound) {
    return {
      __typename: 'NoteError',
      error: 'NOT_FOUND'
    };
  }
  
  return {
    __typename: 'NoteSuccess',
    note: noteFound
  };
};