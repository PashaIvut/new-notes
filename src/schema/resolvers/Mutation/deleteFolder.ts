import type { MutationResolvers } from './../../types.generated';
import { Folder, Note } from '../../../db';
import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';

export const deleteFolder: NonNullable<MutationResolvers['deleteFolder']> = async (_parent, { id }, _ctx) => {
  const root = await Folder.findById(id);
  if (!root) {
    return { __typename: 'DeleteError', error: 'NOT_FOUND' };
  }

  const idsToDelete: string[] = [root.id];
  const queue: string[] = [root.id];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = await Folder.find({ parent: currentId });
    for (const child of children) {
      idsToDelete.push(child.id);
      queue.push(child.id);
    }
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await Note.deleteMany({ folder: { $in: idsToDelete } }, { session });
      await Folder.deleteMany({ _id: { $in: idsToDelete } }, { session });
    });
  } finally {
    await session.endSession();
  }

  return {
    __typename: 'DeleteSuccess',
    success: true
  };
};