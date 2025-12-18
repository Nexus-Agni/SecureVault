import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import { Toaster } from './components/ui/sonner'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from './components/theme-provider'
import ResetPassword from './pages/ResetPassword'
import Vault from './pages/Vault'
import ProtectedRoute from './components/ProtectedRoute'
import PasswordGenerator from './pages/PasswordGenerator'
import CheckBreach from './pages/CheckBreach'

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
      </Routes>
    </ThemeProvider>
  )
}

export default App
