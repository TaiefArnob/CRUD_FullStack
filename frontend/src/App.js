import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import PatientsList from './components/Patient/PatientsList';
import EditPatient from './components/Edit/Edit';
import AddPatient from './components/AddPatient/AddPatient';


function App() {

  const route=createBrowserRouter([
    {
      path:'/',
      element:<PatientsList/>
    },
    {
      path:'/register',
      element:<AddPatient/>
    },
    {
      path:'/edit-patient/:id',
      element:<EditPatient/>
    }
  ])


  return (
    <>
    <RouterProvider router={route}>
    </RouterProvider>
    </>
  );
}

export default App;
