import type { MutationResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import { mapFolderToGraphQL } from '../../../utils/mappers';
import mongoose from 'mongoose';

export const updateFolder: NonNullable<MutationResolvers['updateFolder']> = async (_parent, { id, name, parentId }, _ctx) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { __typename: 'FolderError', error: 'INVALID_ID' };
    }

    const folder = await Folder.findById(id);
    if (!folder) {
      return { __typename: 'FolderError', error: 'NOT_FOUND' };
    }

    if (typeof parentId !== 'undefined') {
      if (parentId === null) {
        folder.parent = null;
      } else {
        if (!mongoose.Types.ObjectId.isValid(parentId)) {
          return { __typename: 'FolderError', error: 'INVALID_ID' };
        }
        if (parentId === id) {
          return { __typename: 'FolderError', error: 'VALIDATION_ERROR' };
        }
        const newParent = await Folder.findById(parentId);
        if (!newParent) {
          return { __typename: 'FolderError', error: 'NOT_FOUND' };
        }
        folder.parent = new mongoose.Types.ObjectId(parentId);
      }
    }

    let trimmedName: string | undefined;
    if (typeof name !== 'undefined') {
      trimmedName = name != null ? name.trim() : '';
      if (trimmedName.length === 0) {
        return { __typename: 'FolderError', error: 'VALIDATION_ERROR' };
      }
      folder.name = trimmedName;
    }

    if (typeof parentId !== 'undefined' || typeof name !== 'undefined') {
      const effectiveName = typeof trimmedName === 'string' ? trimmedName : folder.name;
      const duplicateOnTargetLevel = await Folder.findOne({
        id: { $ne: folder.id },
        name: effectiveName,
        parent: folder.parent !== null ? folder.parent : null,
      });
      if (duplicateOnTargetLevel) {
        return { __typename: 'FolderError', error: 'DUPLICATE_NAME' };
      }
    }

    await folder.save();

    return {
      __typename: 'FolderSuccess',
      folder: mapFolderToGraphQL(folder)
    };
  } catch (error) {
    return { __typename: 'FolderError', error: 'VALIDATION_ERROR' };
  }
};