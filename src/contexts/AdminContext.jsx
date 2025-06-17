import { createContext, useContext, useEffect, useReducer } from 'react';
import { adminReducer, initialAdminState } from './adminReducer';
import { account } from '../lib/appwrite';
import { db } from '../lib/database';
import { Query } from 'appwrite';
import { collectionsId } from '../lib/appwrite';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
   const [state, dispatch] = useReducer(adminReducer, initialAdminState);

   const fetchAdmin = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
         const session = await account.get();
         dispatch({ type: 'SET_ADMIN', payload: session });

         const res = await db.listDocuments(collectionsId.USERS, [
            Query.equal('userId', session.$id),
         ]);

         const info = res.documents[0];

         if (info?.role !== 'admin') {
            await account.deleteSession('current');
            dispatch({ type: 'LOGOUT' });
            return;
         }

         dispatch({ type: 'SET_USER_INFO', payload: info });
         console.log(info);
      } catch (err) {
         console.log(err);
         dispatch({ type: 'LOGOUT' });
      } finally {
         // ✅ only stop loading when admin check is complete
         dispatch({ type: 'SET_LOADING', payload: false });
      }
   };

   const login = async (email, password) => {
      await account.createEmailPasswordSession(email, password);
      await fetchAdmin();
   };

   const logout = async () => {
      await account.deleteSession('current');
      dispatch({ type: 'LOGOUT' });
   };

   useEffect(() => {
      fetchAdmin();
   }, []);

   return (
      <AdminContext.Provider value={{ state, login, logout }}>
         {children}
      </AdminContext.Provider>
   );
};

export const useAdmin = () => useContext(AdminContext);
