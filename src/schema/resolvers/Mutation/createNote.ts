// src/schema/resolvers/Mutation/createNote.ts
import type { MutationResolvers } from './../../types.generated';
import { Note, Folder } from '../../../db';
import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';

export const createNote: NonNullable<MutationResolvers['createNote']> = async (_parent, {title, content, folderId}, _ctx) => {
  if (!title || title.trim().length === 0) {
    throw new GraphQLError('Title is required');
  }
  
  if (folderId) {
    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      throw new GraphQLError('Invalid folder ID');
    }
    
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return {
        __typename: 'NoteError',
        error: 'NOT_FOUND'
      };
    }
  }

  const existingNote = await Note.findOne({
    title: title.trim(),
    folder: folderId || null
  });
  
  if (existingNote) {
    return {
      __typename: 'NoteError',
      error: 'DUPLICATE_TITLE'
    };
  }
  
  const newNote = new Note({
    title: title.trim(),
    content: content || null,
    folder: folderId ? new mongoose.Types.ObjectId(folderId) : null
  });
  
  await newNote.save();
  
  return {
    __typename: 'NoteSuccess',
    note: newNote
  };
};