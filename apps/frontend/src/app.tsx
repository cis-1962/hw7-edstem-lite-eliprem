
import './app.css';
import Signup from './signup';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import EdStem from './edstem';
import LogIn from './login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <EdStem />,
    errorElement: <ErrorPage />,
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
    <div className = "container marg-auto mt-10">
      <RouterProvider router={router} />
      {/* <button
        type="button"
        onClick={async () => {
          const res = await fetch('/api/hello', { method: 'GET' });
          const data = (await res.json()) as { message: string };
          // eslint-disable-next-line no-alert
          alert(data.message);
        }}
        >
        Hello, backend!
      </button> */}
    </div>
  );
}

export default App;
