import type { NoteResolvers } from '../types.generated';
import { Folder as FolderModel } from '../../db';

export const Note: NoteResolvers = {
  id: p => String(p.id ?? p._id),
  folderId: p => (p.folder ? p.folder.toString() : null),
  createdAt: p => p.createdAt.toISOString(),
  updatedAt: p => p.updatedAt.toISOString(),
  folder: (p) => (p.folder ? FolderModel.findById(p.folder) : null),
};