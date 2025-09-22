import type { FolderResolvers } from './../types.generated';
import { Folder as FolderModel, Note as NoteModel } from '../../db';

export const Folder: FolderResolvers = {
  id: p => String(p.id ?? p._id),
  parentId: p => (p.parent ? p.parent.toString() : null),
  createdAt: p => p.createdAt.toISOString(),
  updatedAt: p => p.updatedAt.toISOString(),
  parent: (p) => (p.parent ? FolderModel.findById(p.parent) : null),
  notes: (p) => NoteModel.find({ folder: p.id ?? p._id }),
  subfolders: (p) => FolderModel.find({ parent: p.id ?? p._id }),
};