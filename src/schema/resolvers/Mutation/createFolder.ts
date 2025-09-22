// src/schema/resolvers/Mutation/createFolder.ts
import type { MutationResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import mongoose from 'mongoose';

export const createFolder: NonNullable<MutationResolvers['createFolder']> = async (_parent, {name, parentId}, _ctx) => {
  try {
    if (!name || name.trim().length === 0) {
      return {
        __typename: 'FolderError',
        error: 'VALIDATION_ERROR'
      };
    }
    
    const existingFolder = await Folder.findOne({
      name: name.trim(),
      parent: parentId || null
    });
    
    if (existingFolder) {
      return {
        __typename: 'FolderError',
        error: 'DUPLICATE_NAME'
      };
    }
    
    const newFolder = new Folder({
      name: name.trim(),
      parent: parentId ? new mongoose.Types.ObjectId(parentId) : null
    });
    
    await newFolder.save();
    
    return {
      __typename: 'FolderSuccess',
      folder: newFolder
    };
  } catch (error) {
    return {
      __typename: 'FolderError',
      error: 'VALIDATION_ERROR'
    };
  }
};