import type { MutationResolvers } from './../../types.generated';
import { Folder } from '../../../db';
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

    // Update parentId only if provided (guard clause style)
    if (parentId !== undefined) {
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

    // Update name only if provided (guard clause style)
    let effectiveNameForDuplicateCheck = folder.name;
    if (name !== undefined) {
      const trimmedName = name?.trim() ?? ''
      if (!trimmedName) {
        return { __typename: 'FolderError', error: 'VALIDATION_ERROR' };
      }
      folder.name = trimmedName;
      effectiveNameForDuplicateCheck = trimmedName;
    }

    // Early return if nothing to update
    if (name === undefined && parentId === undefined) {
      await folder.save();
      return {
        __typename: 'FolderSuccess',
        folder
      };
    }

    // Check duplicates only when name or parent might have changed
    const effectiveName = effectiveNameForDuplicateCheck;
    const duplicateOnTargetLevel = await Folder.findOne({
      _id: { $ne: folder._id },
      name: effectiveName,
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
  } catch (error) {
    return { __typename: 'FolderError', error: 'VALIDATION_ERROR' };
  }
};