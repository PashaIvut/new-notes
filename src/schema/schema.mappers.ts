export interface FolderMapper {
    id: string;
    name: string;
    parentId?: string | null; 
    createdAt: string;
    updatedAt: string;
  }

  export interface NoteMapper {
    id: string;
    title: string;
    content?: string | null;
    folderId?: string | null; 
    createdAt: string;
    updatedAt: string;
  }
  