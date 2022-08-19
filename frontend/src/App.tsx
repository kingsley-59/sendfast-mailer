import * as React from 'react';
import './App.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Loader from './components/Loader';
import DashboardLayout from './Layouts/DashboardLayout';


// dynamic imports
const Login = React.lazy(() => import('./pages/Login'))
const Home = React.lazy(() => import('./pages/Home'))
const Signup = React.lazy(() => import('./pages/Signup'))


function ProtectedRoutes() {
  const userExists = true

  if (!userExists) return <Navigate to={'/'} replace />

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

function App() {
  return (
    <AuthProvider>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard/*' element={<ProtectedRoutes />} />
        </Routes>
      </React.Suspense>
    </AuthProvider>
  );
}

export default App;
