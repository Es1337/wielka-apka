import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Home from './pages/Home';
import GroupView from './components/group_view/GroupView';
import TrainingView from './components/training/training_view/TrainingView';
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivateRoutes from './PrivateRoutes';
import AddExercise from './components/training/add_training/AddExercise';
import ModifyExercise from './components/training/modify_exercise/ModifyExercise';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home/> },
  { 
    element: <PrivateRoutes/>, 
    children: [
      { 
        path: '/group/:groupId', 
        element: <GroupView/> },
      { 
        path: '/group/:groupId/training/:trainingId', 
        element: <TrainingView/> },
      { 
        path: '/group/:groupId/training/:trainingId/add-exercise', 
        element: <AddExercise/> },
      { 
        path: '/group/:groupId/training/:trainingId/modify-exercise', 
        element: <ModifyExercise/> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
