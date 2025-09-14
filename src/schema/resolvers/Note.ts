import type   { NoteResolvers } from './../types.generated';
    export const Note: NoteResolvers = {
    /* Implement Note resolver logic here */
        folder: ({ folder }, _arg, _ctx) => {
                            /* Note.folder resolver is required because Note.folder and NoteMapper.folder are not compatible */
                            return folder
                          },
    };