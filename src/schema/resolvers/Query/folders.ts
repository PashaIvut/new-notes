import type { QueryResolvers } from './../../types.generated';
import { Folder } from '../../../db';
import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';

export const folders: NonNullable<QueryResolvers['folders']> = async (_parent, args, _ctx) => {
  const { first, after } = args;
  
  const pageSize = first && first > 0 ? first : 10;
  
  if (after && !mongoose.Types.ObjectId.isValid(after)) {
    throw new GraphQLError('Invalid cursor');
  }
  
  let query = {};
  
  if (after) {
    query = { _id: { $gt: after } };
  }
  
  const limit = pageSize + 1;
  
  const folders = await Folder.find(query)
    .sort({ _id: 1 }) 
    .limit(limit)
    .lean(); 
  
  const hasNextPage = folders.length > pageSize;
  
  const actualFolders = hasNextPage ? folders.slice(0, pageSize) : folders;
  
  const edges = actualFolders.map(folder => ({
    node: folder,
    cursor: folder._id
  }));
  
  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];
  
  const pageInfo = {
    hasNextPage,
    hasPreviousPage: !!after, 
    startCursor: firstEdge?.cursor || null,
    endCursor: lastEdge?.cursor || null
  };
  
  return {
    edges,
    pageInfo
  };
};