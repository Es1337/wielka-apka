import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './pages/Home';
import GroupView from './components/group_view/GroupView';

const router = createBrowserRouter([
  { path: '/', element: <Home/> },
  { path: '/group/:id', element: <GroupView/> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
