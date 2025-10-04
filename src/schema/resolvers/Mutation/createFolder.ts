// src/schema/resolvers/Mutation/createFolder.ts
import type { MutationResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';

export const createFolder: NonNullable<MutationResolvers['createFolder']> = async (_parent, {name, parentId}, _ctx) => {
  if (!name || name.trim().length === 0) {
    throw new GraphQLError('Name is required');
  }
  
  const trimmedName = name.trim();
  
  const existingFolder = await Folder.findOne({
    name: trimmedName,
    parent: parentId || null
  });
  
  if (existingFolder) {
    return {
      __typename: 'FolderError',
      error: 'DUPLICATE_NAME'
    };
  }
  
  const newFolder = new Folder({
    name: trimmedName,
    parent: parentId ? new mongoose.Types.ObjectId(parentId) : null
  });
  
  await newFolder.save();
  
  return {
    __typename: 'FolderSuccess',
    folder: newFolder
  };
};