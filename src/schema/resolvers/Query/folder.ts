
import type   { QueryResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import { mapFolderToGraphQL } from '../../../utils/mappers';
import mongoose from 'mongoose';

export const folder: NonNullable<QueryResolvers['folder']> = async (_parent, { id }, _ctx) => { 
        if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
        }

        const folder = await Folder.findById(id);
        return folder ? mapFolderToGraphQL(folder) : null;
 };