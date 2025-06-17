import { ID } from 'appwrite';
import { account } from './constants';

export const checkAuth = async () => {
   try {
      const user = await account.get(); // Fetch logged-in user
      console.log('User is authenticated:', user);

      return user ;
   } catch (error) {
      console.error('User is not logged in', error);
      return false;
   }
};

export const signUpUser = async (name, email, password) => {
   try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      return user;
   } catch (error) {
      console.error('Signup error:', error);
      throw error; // let the calling function handle it
   }
};

export const loginUser = async (email, password) => {
   try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      return user;
   } catch (error) {
      console.error('Login error:', error);
      throw error;
   }
};

export const logoutUser = async () => {
   try {
      await account.deleteSession(
         'current', // sessionId
      );

      return true;
   } catch (error) {
      console.log('You could not log out: ', error);
   }
};
