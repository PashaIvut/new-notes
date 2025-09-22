/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { folder as Query_folder } from './resolvers/Query/folder';
import    { folders as Query_folders } from './resolvers/Query/folders';
import    { note as Query_note } from './resolvers/Query/note';
import    { notes as Query_notes } from './resolvers/Query/notes';
import    { createFolder as Mutation_createFolder } from './resolvers/Mutation/createFolder';
import    { createNote as Mutation_createNote } from './resolvers/Mutation/createNote';
import    { deleteFolder as Mutation_deleteFolder } from './resolvers/Mutation/deleteFolder';
import    { deleteNote as Mutation_deleteNote } from './resolvers/Mutation/deleteNote';
import    { updateFolder as Mutation_updateFolder } from './resolvers/Mutation/updateFolder';
import    { updateNote as Mutation_updateNote } from './resolvers/Mutation/updateNote';
import    { Folder } from './resolvers/Folder';
import    { Note } from './resolvers/Note';
export const resolvers: Resolvers = {
    Query: { folder: Query_folder,folders: Query_folders,note: Query_note,notes: Query_notes },
    Mutation: { createFolder: Mutation_createFolder,createNote: Mutation_createNote,deleteFolder: Mutation_deleteFolder,deleteNote: Mutation_deleteNote,updateFolder: Mutation_updateFolder,updateNote: Mutation_updateNote },   
    Folder: Folder,
    Note: Note,
}