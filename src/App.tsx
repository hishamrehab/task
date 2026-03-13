import { Route, Routes, BrowserRouter } from 'react-router';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
// import UsersPage from './pages/UsersPage'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          {/* <Route path="users" element={<UsersPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;