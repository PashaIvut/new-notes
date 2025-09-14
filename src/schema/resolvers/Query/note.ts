// src/schema/resolvers/Query/note.ts
import type { QueryResolvers } from './../../types.generated';
import { Note } from '../../../db';
import { mapNoteToGraphQL } from '../../../utils/mappers';
import mongoose from 'mongoose';

export const note: NonNullable<QueryResolvers['note']> = async (_parent, { id }, _ctx) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      __typename: 'NoteError',
      error: 'INVALID_ID'
    };
  }
  
  const note = await Note.findById(id);
  
  if (!note) {
    return {
      __typename: 'NoteError',
      error: 'NOT_FOUND'
    };
  }
  
  return {
    __typename: 'NoteSuccess',
    note: mapNoteToGraphQL(note)
  };
};