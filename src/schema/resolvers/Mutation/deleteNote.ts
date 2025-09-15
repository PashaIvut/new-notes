import type { MutationResolvers } from './../../types.generated';
import { Note } from '../../../db';
import mongoose from 'mongoose';

export const deleteNote: NonNullable<MutationResolvers['deleteNote']> = async (_parent, { id }, _ctx) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { __typename: 'DeleteError', error: 'INVALID_ID' };
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
  } catch (error) {
    return { __typename: 'DeleteError', error: 'NOT_FOUND' };
  }
};