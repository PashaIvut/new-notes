import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FolderMapper, NoteMapper } from './schema.mappers';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ObjectId: { input: any; output: any; }
};

export type DeleteError = {
  __typename?: 'DeleteError';
  error: DeleteErrorType;
};

export type DeleteErrorType =
  | 'INVALID_ID'
  | 'NOT_FOUND';

export type DeleteResult = DeleteError | DeleteSuccess;

export type DeleteSuccess = {
  __typename?: 'DeleteSuccess';
  success: Scalars['Boolean']['output'];
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
  notes: Array<Note>;
  parent?: Maybe<Folder>;
  parentId?: Maybe<Scalars['ObjectId']['output']>;
  subfolders: Array<Folder>;
  updatedAt: Scalars['String']['output'];
};

export type FolderError = {
  __typename?: 'FolderError';
  error: FolderErrorType;
};

export type FolderErrorType =
  | 'DUPLICATE_NAME'
  | 'INVALID_ID'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR';

export type FolderResult = FolderError | FolderSuccess;

export type FolderSuccess = {
  __typename?: 'FolderSuccess';
  folder: Folder;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFolder: FolderResult;
  createNote: NoteResult;
  deleteFolder: DeleteResult;
  deleteNote: DeleteResult;
  updateFolder?: Maybe<FolderResult>;
  updateNote?: Maybe<NoteResult>;
};


export type MutationcreateFolderArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
};


export type MutationcreateNoteArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['ObjectId']['input']>;
  title: Scalars['String']['input'];
};


export type MutationdeleteFolderArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationdeleteNoteArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationupdateFolderArgs = {
  id: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ObjectId']['input']>;
};


export type MutationupdateNoteArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  folderId?: InputMaybe<Scalars['ObjectId']['input']>;
  id: Scalars['ObjectId']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Note = {
  __typename?: 'Note';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  folder?: Maybe<Folder>;
  folderId?: Maybe<Scalars['ObjectId']['output']>;
  id: Scalars['ObjectId']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type NoteError = {
  __typename?: 'NoteError';
  error: NoteErrorType;
};

export type NoteErrorType =
  | 'DUPLICATE_TITLE'
  | 'INVALID_ID'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR';

export type NoteResult = NoteError | NoteSuccess;

export type NoteSuccess = {
  __typename?: 'NoteSuccess';
  note: Note;
};

export type Query = {
  __typename?: 'Query';
  folder?: Maybe<FolderResult>;
  folders: Array<Folder>;
  note?: Maybe<NoteResult>;
  notes: Array<Note>;
};


export type QueryfolderArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QuerynoteArgs = {
  id: Scalars['ObjectId']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  DeleteResult: ( Omit<DeleteError, 'error'> & { error: _RefType['DeleteErrorType'] } & { __typename: 'DeleteError' } ) | ( DeleteSuccess & { __typename: 'DeleteSuccess' } );
  FolderResult: ( Omit<FolderError, 'error'> & { error: _RefType['FolderErrorType'] } & { __typename: 'FolderError' } ) | ( Omit<FolderSuccess, 'folder'> & { folder: _RefType['Folder'] } & { __typename: 'FolderSuccess' } );
  NoteResult: ( Omit<NoteError, 'error'> & { error: _RefType['NoteErrorType'] } & { __typename: 'NoteError' } ) | ( Omit<NoteSuccess, 'note'> & { note: _RefType['Note'] } & { __typename: 'NoteSuccess' } );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DeleteError: ResolverTypeWrapper<Omit<DeleteError, 'error'> & { error: ResolversTypes['DeleteErrorType'] }>;
  DeleteErrorType: ResolverTypeWrapper<'INVALID_ID' | 'NOT_FOUND'>;
  DeleteResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DeleteResult']>;
  DeleteSuccess: ResolverTypeWrapper<DeleteSuccess>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Folder: ResolverTypeWrapper<FolderMapper>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  FolderError: ResolverTypeWrapper<Omit<FolderError, 'error'> & { error: ResolversTypes['FolderErrorType'] }>;
  FolderErrorType: ResolverTypeWrapper<'INVALID_ID' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'DUPLICATE_NAME'>;
  FolderResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FolderResult']>;
  FolderSuccess: ResolverTypeWrapper<Omit<FolderSuccess, 'folder'> & { folder: ResolversTypes['Folder'] }>;
  Mutation: ResolverTypeWrapper<{}>;
  Note: ResolverTypeWrapper<NoteMapper>;
  NoteError: ResolverTypeWrapper<Omit<NoteError, 'error'> & { error: ResolversTypes['NoteErrorType'] }>;
  NoteErrorType: ResolverTypeWrapper<'INVALID_ID' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'DUPLICATE_TITLE'>;
  NoteResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['NoteResult']>;
  NoteSuccess: ResolverTypeWrapper<Omit<NoteSuccess, 'note'> & { note: ResolversTypes['Note'] }>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  Query: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DeleteError: DeleteError;
  DeleteResult: ResolversUnionTypes<ResolversParentTypes>['DeleteResult'];
  DeleteSuccess: DeleteSuccess;
  Boolean: Scalars['Boolean']['output'];
  Folder: FolderMapper;
  String: Scalars['String']['output'];
  FolderError: FolderError;
  FolderResult: ResolversUnionTypes<ResolversParentTypes>['FolderResult'];
  FolderSuccess: Omit<FolderSuccess, 'folder'> & { folder: ResolversParentTypes['Folder'] };
  Mutation: {};
  Note: NoteMapper;
  NoteError: NoteError;
  NoteResult: ResolversUnionTypes<ResolversParentTypes>['NoteResult'];
  NoteSuccess: Omit<NoteSuccess, 'note'> & { note: ResolversParentTypes['Note'] };
  ObjectId: Scalars['ObjectId']['output'];
  Query: {};
};

export type DeleteErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteError'] = ResolversParentTypes['DeleteError']> = {
  error?: Resolver<ResolversTypes['DeleteErrorType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteErrorTypeResolvers = EnumResolverSignature<{ INVALID_ID?: any, NOT_FOUND?: any }, ResolversTypes['DeleteErrorType']>;

export type DeleteResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteResult'] = ResolversParentTypes['DeleteResult']> = {
  __resolveType?: TypeResolveFn<'DeleteError' | 'DeleteSuccess', ParentType, ContextType>;
};

export type DeleteSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteSuccess'] = ResolversParentTypes['DeleteSuccess']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  subfolders?: Resolver<Array<ResolversTypes['Folder']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderError'] = ResolversParentTypes['FolderError']> = {
  error?: Resolver<ResolversTypes['FolderErrorType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FolderErrorTypeResolvers = EnumResolverSignature<{ DUPLICATE_NAME?: any, INVALID_ID?: any, NOT_FOUND?: any, VALIDATION_ERROR?: any }, ResolversTypes['FolderErrorType']>;

export type FolderResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderResult'] = ResolversParentTypes['FolderResult']> = {
  __resolveType?: TypeResolveFn<'FolderError' | 'FolderSuccess', ParentType, ContextType>;
};

export type FolderSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['FolderSuccess'] = ResolversParentTypes['FolderSuccess']> = {
  folder?: Resolver<ResolversTypes['Folder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationcreateFolderArgs, 'name'>>;
  createNote?: Resolver<ResolversTypes['NoteResult'], ParentType, ContextType, RequireFields<MutationcreateNoteArgs, 'title'>>;
  deleteFolder?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<MutationdeleteFolderArgs, 'id'>>;
  deleteNote?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<MutationdeleteNoteArgs, 'id'>>;
  updateFolder?: Resolver<Maybe<ResolversTypes['FolderResult']>, ParentType, ContextType, RequireFields<MutationupdateFolderArgs, 'id'>>;
  updateNote?: Resolver<Maybe<ResolversTypes['NoteResult']>, ParentType, ContextType, RequireFields<MutationupdateNoteArgs, 'id'>>;
};

export type NoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  folder?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
  folderId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoteErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['NoteError'] = ResolversParentTypes['NoteError']> = {
  error?: Resolver<ResolversTypes['NoteErrorType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoteErrorTypeResolvers = EnumResolverSignature<{ DUPLICATE_TITLE?: any, INVALID_ID?: any, NOT_FOUND?: any, VALIDATION_ERROR?: any }, ResolversTypes['NoteErrorType']>;

export type NoteResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['NoteResult'] = ResolversParentTypes['NoteResult']> = {
  __resolveType?: TypeResolveFn<'NoteError' | 'NoteSuccess', ParentType, ContextType>;
};

export type NoteSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['NoteSuccess'] = ResolversParentTypes['NoteSuccess']> = {
  note?: Resolver<ResolversTypes['Note'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  folder?: Resolver<Maybe<ResolversTypes['FolderResult']>, ParentType, ContextType, RequireFields<QueryfolderArgs, 'id'>>;
  folders?: Resolver<Array<ResolversTypes['Folder']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['NoteResult']>, ParentType, ContextType, RequireFields<QuerynoteArgs, 'id'>>;
  notes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DeleteError?: DeleteErrorResolvers<ContextType>;
  DeleteErrorType?: DeleteErrorTypeResolvers;
  DeleteResult?: DeleteResultResolvers<ContextType>;
  DeleteSuccess?: DeleteSuccessResolvers<ContextType>;
  Folder?: FolderResolvers<ContextType>;
  FolderError?: FolderErrorResolvers<ContextType>;
  FolderErrorType?: FolderErrorTypeResolvers;
  FolderResult?: FolderResultResolvers<ContextType>;
  FolderSuccess?: FolderSuccessResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Note?: NoteResolvers<ContextType>;
  NoteError?: NoteErrorResolvers<ContextType>;
  NoteErrorType?: NoteErrorTypeResolvers;
  NoteResult?: NoteResultResolvers<ContextType>;
  NoteSuccess?: NoteSuccessResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
};

