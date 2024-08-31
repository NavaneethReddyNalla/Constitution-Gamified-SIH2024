import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import RootLayout from './RootLayout';
import HomePage from './pages/home page/HomePage'
import QuizPage from './pages/home page/QuizPage/QuizPage'
function App() {

  const browserRouter = createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      children:[
        {
          path:'',
          element:<HomePage/>
        },
        // {
        //   path:'/vidhur',
        //   element:
        // },
        {
          path:'/flash',
          element:<QuizPage/>
        }
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={browserRouter}/>
    </div>
  );
}

export default App;
