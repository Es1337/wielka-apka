import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './pages/Home';
import GroupView from './components/group_view/GroupView';
import TrainingView from './components/training_view/TrainingView';
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  { path: '/', element: <Home/> },
  { path: '/group/:group-id', element: <GroupView/> },
  { path: '/group/:group-id/training/:training-id', element: <TrainingView/> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
