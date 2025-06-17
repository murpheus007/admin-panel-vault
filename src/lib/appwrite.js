import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client
   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const collectionsId = {
   USERS: import.meta.env.VITE_APPWRITE_COLLECTION_USER_INFO,
   PLANS: import.meta.env.VITE_APPWRITE_COLLECTION_USER_PLANS,
   TRANSACTIONS: import.meta.env.VITE_APPWRITE_COLLECTION_USER_TRANSACTIONS,
   PREFERENCES: import.meta.env.VITE_APPWRITE_COLLECTION_USER_PREFERENCES,
   SUPPORT: import.meta.env.VITE_APPWRITE_COLLECTION_SUPPORT_MESSAGES,
   CLAIMED: import.meta.env.VITE_APPWRITE_COLLECTION_CLAIMED_PLANS,
   KYC: import.meta.env.VITE_APPWRITE_COLLECTION_KYC,
   REFERRALS: import.meta.env.VITE_APPWRITE_COLLECTION_REFERRALS,
};
