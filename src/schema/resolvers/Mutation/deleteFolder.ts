import type { MutationResolvers } from './../../types.generated';
import { Folder, Note } from '../../../db';
import mongoose from 'mongoose';

export const deleteFolder: NonNullable<MutationResolvers['deleteFolder']> = async (_parent, { id }, _ctx) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { __typename: 'DeleteError', error: 'INVALID_ID' };
  }

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
  await Note.deleteMany({ folder: { $in: idsToDelete } });
  await Folder.deleteMany({ _id: { $in: idsToDelete } });

  return {
    __typename: 'DeleteSuccess',
    success: true
  };
};