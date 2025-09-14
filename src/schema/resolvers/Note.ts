// src/schema/resolvers/Note.ts
import type { NoteResolvers } from './../types.generated';
import { Folder } from '../../db';
import { mapFolderToGraphQL } from '../../utils/mappers';

export const Note: NoteResolvers = {
  folder: async (parent) => {
    if (!parent.folderId) return null;
    
    const folder = await Folder.findById(parent.folderId);
    return folder ? mapFolderToGraphQL(folder) : null;
  }
};