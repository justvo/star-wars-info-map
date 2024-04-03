import AboutPlanet from "./pages/AboutPlanet"
import MainPage from "./pages/MainPage"
import Persons from "./pages/Persons"
import Film from './pages/Film'

export const AppRoutes =[
    {
        index:true,
        element: < MainPage/>,
    },
    {
        path: "/about-planet/:id",
        element: <AboutPlanet />,
      },
    {
        path: "/person/:id",
        element: <Persons />,
      },
    {
        path: "/film/:id",
        element: <Film />,
      },

]          