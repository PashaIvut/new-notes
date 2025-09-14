import type { IFolder } from '../models/Folder';
import type { INote } from '../models/Note';
import type { FolderMapper, NoteMapper } from '../schema/schema.mappers';

export function mapFolderToGraphQL(folder: IFolder): FolderMapper {
    return {
        id: folder.id.toString(),
        name: folder.name,
        parentId: folder.parent?.toString() || null,
        createdAt: folder.createdAt.toISOString(),
        updatedAt: folder.updatedAt.toISOString()
    }
}

export function mapNoteToGraphQL(note: INote): NoteMapper {
    return {
      id: note.id.toString(),
      title: note.title,
      content: note.content,
      folderId: note.folder?.toString() || null,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    };
  }