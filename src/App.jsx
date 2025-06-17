import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AdminProvider } from './contexts/AdminContext';
import { AdminDataProvider } from './contexts/AdminDataContext';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Deposits from './pages/Deposits/Deposits';
import Withdrawals from './pages/Withdrawals/Withdrawals';
import KYC from './pages/KYC/KYC';
import Tickets from './pages/Tickets/Tickets';

function App() {
   return (
      <AdminProvider>
         <AdminDataProvider>
         <Router>
            <Routes>
               <Route
                  path='/login'
                  element={<Login />}
               />
               <Route
                  path='/'
                  element={
                     <ProtectedRoute>
                        <Layout>
                           <Dashboard />
                        </Layout>
                     </ProtectedRoute>
                  }
               />
               <Route
                  path='/deposits'
                  element={
                     <ProtectedRoute>
                        <Layout>
                           <Deposits />
                        </Layout>
                     </ProtectedRoute>
                  }
               />
               <Route
                  path='/withdrawals'
                  element={
                     <ProtectedRoute>
                        <Layout>
                           <Withdrawals />
                        </Layout>
                     </ProtectedRoute>
                  }
               />
               <Route
                  path='/kyc'
                  element={
                     <ProtectedRoute>
                        <Layout>
                           <KYC />
                        </Layout>
                     </ProtectedRoute>
                  }
               />
               <Route
                  path='/tickets'
                  element={
                     <ProtectedRoute>
                        <Layout>
                           <Tickets />
                        </Layout>
                     </ProtectedRoute>
                  }
               />
               <Route
                  path='/users'
                  element={
                     <ProtectedRoute>
                        <Layout>
                           <Users />
                        </Layout>
                     </ProtectedRoute>
                  }
               />
            </Routes>
         </Router>
          <ToastContainer position="top-right" autoClose={3000} />
         </AdminDataProvider>
      </AdminProvider>
   );
}

export default App;
