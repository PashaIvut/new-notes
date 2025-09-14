import type { IFolder } from '../models/Folder';
import type { FolderMapper } from '../schema/schema.mappers';

export function mapFolderToGraphQL(folder: IFolder): FolderMapper {
    return {
        id: folder.id.toString(),
        name: folder.name,
        parentId: folder.parent?.toString() || null,
        createdAt: folder.createdAt.toISOString(),
        updatedAt: folder.updatedAt.toISOString()
    }
}