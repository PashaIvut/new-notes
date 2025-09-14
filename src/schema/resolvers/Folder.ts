// src/schema/resolvers/Folder.ts
import type { FolderResolvers } from './../types.generated';
import { Folder as FolderModel } from '../../db';
import { Note } from '../../db';
import { mapFolderToGraphQL } from '../../utils/mappers';
import { mapNoteToGraphQL } from '../../utils/mappers';

export const Folder: FolderResolvers = {
  parent: async (parent) => {
    if (!parent.parentId) return null;
    const parentFolder = await FolderModel.findById(parent.parentId);
    return parentFolder ? mapFolderToGraphQL(parentFolder) : null;
  },
  
  notes: async (parent) => {
    const notes = await Note.find({ folder: parent.id });
    return notes.map(mapNoteToGraphQL);
  },
  
  subfolders: async (parent) => {
    const subfolders = await FolderModel.find({ parent: parent.id });
    return subfolders.map(mapFolderToGraphQL);
  }
};