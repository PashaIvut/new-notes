import type { MutationResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';

export const updateFolder: NonNullable<MutationResolvers['updateFolder']> = async (_parent, { id, name, parentId }, _ctx) => {
  const folder = await Folder.findById(id);
  if (!folder) {
    return { __typename: 'FolderError', error: 'NOT_FOUND' };
  }

  if (parentId !== undefined) {
    if (parentId === null) {
      folder.parent = null;
    } else {
        if (parentId === id) {
          throw new GraphQLError('Folder cannot be its own parent');
        }
        const newParent = await Folder.findById(parentId);
        if (!newParent) {
          return { __typename: 'FolderError', error: 'NOT_FOUND' };
        }
        folder.parent = new mongoose.Types.ObjectId(parentId);
      }
  }

  let nameForDuplicateCheck = folder.name;
  if (name !== undefined) {
    const trimmedName = name?.trim() ?? '';
    if (!trimmedName) {
      throw new GraphQLError('Name is required');
    }
    folder.name = trimmedName;
    nameForDuplicateCheck = trimmedName;
  }

  if (name === undefined && parentId === undefined) {
    await folder.save();
    return {
      __typename: 'FolderSuccess',
      folder
    };
  }

  const duplicateOnTargetLevel = await Folder.findOne({
    _id: { $ne: folder._id },
    name: nameForDuplicateCheck,
    parent: folder.parent !== null ? folder.parent : null,
  });
  if (duplicateOnTargetLevel) {
    return { __typename: 'FolderError', error: 'DUPLICATE_NAME' };
  }

  await folder.save();

  return {
    __typename: 'FolderSuccess',
    folder
  };
};