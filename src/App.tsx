import { Route, Routes, BrowserRouter } from 'react-router'

import DashboardLayout from './components/DashboardLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* <Route index element={<Navigate to="/users" replace />} /> */}
          {/* <Route path="users" element={<UsersPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App