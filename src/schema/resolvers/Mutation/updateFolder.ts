import type { MutationResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import mongoose from 'mongoose';

export const updateFolder: NonNullable<MutationResolvers['updateFolder']> = async (_parent, { id, name, parentId }, _ctx) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { __typename: 'FolderError', error: 'INVALID_ID' };
  }

  const folder = await Folder.findById(id);
  if (!folder) {
    return { __typename: 'FolderError', error: 'NOT_FOUND' };
  }

  // Меняем id родителя только если он предоставлен
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

  // Меняем имя только если оно предоставлено 
  let effectiveNameForDuplicateCheck = folder.name;
  if (name !== undefined) {
    const trimmedName = name?.trim() ?? ''
    if (!trimmedName) {
      return { __typename: 'FolderError', error: 'VALIDATION_ERROR' };
    }
    folder.name = trimmedName;
    effectiveNameForDuplicateCheck = trimmedName;
  }

  // Ранний выход если ничего не поменялось
  if (name === undefined && parentId === undefined) {
    await folder.save();
    return {
      __typename: 'FolderSuccess',
      folder
    };
  }

  // Проверяем дубликаты только тогда, когда имя или родитель поменялись
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
};