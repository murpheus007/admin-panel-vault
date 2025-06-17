import { ID, Query } from 'appwrite';
import { databases, databaseId, storage, bucketId } from './appwrite';

export const db = {
   createDocument: async ({
      collectionsId,
      data,
      documentId = ID.unique(),
   }) => {
      return databases.createDocument(
         databaseId,
         collectionsId,
         documentId,
         data,
      );
   },

   getDocument: async (collectionsId, documentId) => {
      return databases.getDocument(databaseId, collectionsId, documentId);
   },

   updateDocument: async (collectionsId, documentId, data) => {
      return databases.updateDocument(
         databaseId,
         collectionsId,
         documentId,
         data,
      );
   },
   deleteDocument: async (collectionsId, documentId) => {
      return databases.deleteDocument(databaseId, collectionsId, documentId);
   },
   listDocuments: async (collectionsId, queries = []) => {
      return databases.listDocuments(databaseId, collectionsId, queries);
   },
   listRecentDocuments: async (collectionsId, userId, limit = 3) => {
      return databases.listDocuments(databaseId, collectionsId, [
         Query.equal('userId', userId),
         Query.orderDesc('$createdAt'),
         Query.limit(limit),
      ]);
   },
   createImage: async ({ fileId = ID.unique(), file }) => {
      return await storage.createFile(bucketId, fileId, file);
   },
};
