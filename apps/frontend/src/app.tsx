
import './app.css';
import Signup from './signup';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import EdStem from './homepage';
import LogIn from './login';
import Question from './question';

const router = createBrowserRouter([
  {
    path: "/",
    element: <EdStem />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"questions/:id",
        element: <Question />,
      },
    ],
  },
  
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  }
]);


function App() {

  return (
    <div className = "container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
