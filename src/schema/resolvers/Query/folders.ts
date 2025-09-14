
import type { QueryResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import { mapFolderToGraphQL } from '../../../utils/mappers';

export const folders: NonNullable<QueryResolvers['folders']> = async (_parent, _arg, _ctx) => {
  const folders = await Folder.find();
  return folders.map(mapFolderToGraphQL);
};