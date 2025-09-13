export interface FolderMapper {
    id: string;
    name: string;
    parent?: string | null; 
    createdAt: string;
    updatedAt: string;
  }

  export interface NoteMapper {
    id: string;
    title: string;
    content?: string | null;
    folder?: string | null; 
    createdAt: string;
    updatedAt: string;
  }
  