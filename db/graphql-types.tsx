export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  Time: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>;
  /** Delete an existing document in the collection of 'Session' */
  deleteSession?: Maybe<Session>;
  /** Create a new document in the collection of 'User' */
  createUser: User;
  deleteSessionsByUserId?: Maybe<Session>;
  /** Delete an existing document in the collection of 'Token' */
  deleteToken?: Maybe<Token>;
  /** Create a new document in the collection of 'Token' */
  createToken: Token;
  /** Create a new document in the collection of 'Session' */
  createSession: Session;
  /** Update an existing document in the collection of 'Session' */
  updateSession?: Maybe<Session>;
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>;
  /** Update an existing document in the collection of 'Token' */
  updateToken?: Maybe<Token>;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UserInput;
};

export type MutationDeleteSessionArgs = {
  id: Scalars['ID'];
};

export type MutationCreateUserArgs = {
  data: UserInput;
};

export type MutationDeleteSessionsByUserIdArgs = {
  userId: Scalars['ID'];
};

export type MutationDeleteTokenArgs = {
  id: Scalars['ID'];
};

export type MutationCreateTokenArgs = {
  data: TokenInput;
};

export type MutationCreateSessionArgs = {
  data: SessionInput;
};

export type MutationUpdateSessionArgs = {
  id: Scalars['ID'];
  data: SessionInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateTokenArgs = {
  id: Scalars['ID'];
  data: TokenInput;
};

export type Query = {
  __typename?: 'Query';
  /** Find a document from the collection of 'Session' by its id. */
  findSessionByID?: Maybe<Session>;
  findUserByEmail?: Maybe<User>;
  /** Find a document from the collection of 'Token' by its id. */
  findTokenByID?: Maybe<Token>;
  allUsers: UserPage;
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>;
  findTokenByType: TokenPage;
  findSessionByHandle?: Maybe<Session>;
  findTokenByTypeAndHashedToken?: Maybe<Token>;
};

export type QueryFindSessionByIdArgs = {
  id: Scalars['ID'];
};

export type QueryFindUserByEmailArgs = {
  email: Scalars['String'];
};

export type QueryFindTokenByIdArgs = {
  id: Scalars['ID'];
};

export type QueryAllUsersArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};

export type QueryFindTokenByTypeArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type QueryFindSessionByHandleArgs = {
  handle: Scalars['String'];
};

export type QueryFindTokenByTypeAndHashedTokenArgs = {
  type: Scalars['String'];
  hashedToken: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  privateData?: Maybe<Scalars['String']>;
  antiCSRFToken?: Maybe<Scalars['String']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  expiresAt?: Maybe<Scalars['Time']>;
  publicData?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  hashedSessionToken?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'Session' input values */
export type SessionInput = {
  expiresAt?: Maybe<Scalars['Time']>;
  handle: Scalars['String'];
  user?: Maybe<SessionUserRelation>;
  hashedSessionToken?: Maybe<Scalars['String']>;
  antiCSRFToken?: Maybe<Scalars['String']>;
  publicData?: Maybe<Scalars['String']>;
  privateData?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Session'. */
export type SessionPage = {
  __typename?: 'SessionPage';
  /** The elements of type 'Session' in this page. */
  data: Array<Maybe<Session>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Session' and 'User' using the field 'Session.user'. */
export type SessionUserRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>;
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
  /** If true, disconnects this document from 'User' */
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type Token = {
  __typename?: 'Token';
  /** The document's ID. */
  _id: Scalars['ID'];
  expiresAt: Scalars['Time'];
  type: Scalars['String'];
  hashedToken: Scalars['String'];
  sentTo: Scalars['String'];
  user: User;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'Token' input values */
export type TokenInput = {
  hashedToken: Scalars['String'];
  type: Scalars['String'];
  expiresAt: Scalars['Time'];
  sentTo: Scalars['String'];
  user?: Maybe<TokenUserRelation>;
};

/** The pagination object for elements of type 'Token'. */
export type TokenPage = {
  __typename?: 'TokenPage';
  /** The elements of type 'Token' in this page. */
  data: Array<Maybe<Token>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Token' and 'User' using the field 'Token.user'. */
export type TokenUserRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>;
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']>;
  hashedPassword?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  role: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  sessions: SessionPage;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

export type UserSessionsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** 'User' input values */
export type UserInput = {
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  hashedPassword?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  sessions?: Maybe<UserSessionsRelation>;
};

/** The pagination object for elements of type 'User'. */
export type UserPage = {
  __typename?: 'UserPage';
  /** The elements of type 'User' in this page. */
  data: Array<Maybe<User>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'User' and 'Session'. */
export type UserSessionsRelation = {
  /** Create one or more documents of type 'Session' and associate them with the current document. */
  create?: Maybe<Array<Maybe<SessionInput>>>;
  /** Connect one or more documents of type 'Session' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Session' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};
