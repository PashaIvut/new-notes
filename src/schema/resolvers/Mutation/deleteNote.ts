import type { MutationResolvers } from './../../types.generated';
import { Note } from '../../../db';
import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';

export const deleteNote: NonNullable<MutationResolvers['deleteNote']> = async (_parent, { id }, _ctx) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new GraphQLError('Invalid note ID');
  }

  const note = await Note.findById(id);
  if (!note) {
    return { __typename: 'DeleteError', error: 'NOT_FOUND' };
  }

  await Note.deleteOne({ id: id });

  return {
    __typename: 'DeleteSuccess',
    success: true
  };
};