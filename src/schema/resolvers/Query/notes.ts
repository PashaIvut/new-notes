import type { QueryResolvers } from './../../types.generated';
import { Note } from '../../../db';

export const notes: NonNullable<QueryResolvers['notes']> = async (_parent, _arg, _ctx) => {
  const notes = await Note.find();
  return notes;
};