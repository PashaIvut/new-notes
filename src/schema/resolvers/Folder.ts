import type   { FolderResolvers } from './../types.generated';
    export const Folder: FolderResolvers = {
    /* Implement Folder resolver logic here */
        notes: async (_parent, _arg, _ctx) => { /* Folder.notes resolver is required because Folder.notes exists but FolderMapper.notes does not */ },
        parent: ({ parent }, _arg, _ctx) => {
                            /* Folder.parent resolver is required because Folder.parent and FolderMapper.parent are not compatible */
                            return parent
                          },
        parentId: async (_parent, _arg, _ctx) => { /* Folder.parentId resolver is required because Folder.parentId exists but FolderMapper.parentId does not */ },
        subfolders: async (_parent, _arg, _ctx) => { /* Folder.subfolders resolver is required because Folder.subfolders exists but FolderMapper.subfolders does not */ }
    };