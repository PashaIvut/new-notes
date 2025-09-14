
import type { QueryResolvers } from './../../types.generated';
import { Note } from '../../../db';
import { mapNoteToGraphQL } from '../../../utils/mappers';

export const notes: NonNullable<QueryResolvers['notes']> = async (_parent, _arg, _ctx) => {
  const notes = await Note.find();
  return notes.map(mapNoteToGraphQL);
};