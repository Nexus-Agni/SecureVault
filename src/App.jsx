import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Vault from './pages/Vault.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PasswordGenerator from './pages/PasswordGenerator.jsx'
import CheckBreach from './pages/CheckBreach.jsx'
import UserProfile from './components/UserProfile.jsx'
import SecondFactorAuth from './pages/SecondFactorAuth.jsx'
import OAuthCallback from './pages/OAuthCallback.jsx'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/mfa' element={<SecondFactorAuth/>}/>
        <Route path='/oauth-callback' element={<OAuthCallback/>}/>
        
        {/* Protected Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/vault' element={
          <ProtectedRoute>
            <Vault/>
          </ProtectedRoute>
        }/>
        <Route path='/generate-password' element={
          <ProtectedRoute>
            <PasswordGenerator/>
          </ProtectedRoute>
        }/>
        <Route path='/check-breach' element={
          <ProtectedRoute>
            <CheckBreach/>
          </ProtectedRoute>
        }/>
        <Route path='/profile' element={
          <ProtectedRoute>
            <UserProfile/>
          </ProtectedRoute>
        }/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
