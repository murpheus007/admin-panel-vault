// import { cache } from '../lib/cache'; // adjust path as needed

export const initialAdminState = {
  admin: null,
  userInfo: null,
  loading: true,
  error: null,
};

export const adminReducer = (state, action) => {
   switch (action.type) {
      case 'SET_ADMIN':
         return { ...state, admin: action.payload };
      case 'SET_USER_INFO':
         return { ...state, userInfo: action.payload };
      case 'SET_LOADING':
         return { ...state, loading: action.payload };
      case 'SET_ERROR':
         return { ...state, error: action.payload };
      case 'LOGOUT':
         return { ...initialAdminState, loading: false };
      default:
         return state;
   }
};
