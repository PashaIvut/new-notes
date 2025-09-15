import type { MutationResolvers } from './../../types.generated';
import { Note, Folder } from '../../../db';
import { mapNoteToGraphQL } from '../../../utils/mappers';
import mongoose from 'mongoose';

export const updateNote: NonNullable<MutationResolvers['updateNote']> = async (_parent, { id, title, content, folderId }, _ctx) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { __typename: 'NoteError', error: 'INVALID_ID' };
    }

    const note = await Note.findById(id);
    if (!note) {
      return { __typename: 'NoteError', error: 'NOT_FOUND' };
    }

    if (typeof folderId !== 'undefined') {
      if (folderId === null) {
        note.folder = null;
      } else {
        if (!mongoose.Types.ObjectId.isValid(folderId)) {
          return { __typename: 'NoteError', error: 'INVALID_ID' };
        }
        const folder = await Folder.findById(folderId);
        if (!folder) {
          return { __typename: 'NoteError', error: 'NOT_FOUND' };
        }
        note.folder = new mongoose.Types.ObjectId(folderId);
      }
    }

    if (typeof title !== 'undefined') {
      const trimmed = title != null ? title.trim() : '';
      if (trimmed.length === 0) {
        return { __typename: 'NoteError', error: 'VALIDATION_ERROR' };
      }
      const duplicate = await Note.findOne({
        _id: { $ne: note._id },
        title: trimmed,
        folder: note.folder != null ? note.folder : null
      });
      if (duplicate) {
        return { __typename: 'NoteError', error: 'DUPLICATE_TITLE' };
      }
      note.title = trimmed;
    }

    if (typeof content !== 'undefined') {
      note.content = content != null ? content : null;
    }

    await note.save();

    return {
      __typename: 'NoteSuccess',
      note: mapNoteToGraphQL(note)
    };
  } catch (error) {
    return { __typename: 'NoteError', error: 'VALIDATION_ERROR' };
  }
};