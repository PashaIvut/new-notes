import type { MutationResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import mongoose from 'mongoose';
import { mapFolderToGraphQL } from '../../../utils/mappers';

export const createFolder: NonNullable<MutationResolvers['createFolder']> = async (_parent, {name, parentId}, _ctx) => {
        const newFolder = new Folder({
            name, 
            parent: parentId ? new mongoose.Types.ObjectId(parentId) : null
        });

        await newFolder.save();

        return mapFolderToGraphQL(newFolder);
};