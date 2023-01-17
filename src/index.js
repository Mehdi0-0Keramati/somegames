import ReactDOM from "react-dom/client";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom"


import { TikTokToe, WordHunt, MemoryGame, DinoGame, FlappyBird } from "./components"
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import bg from "./assets/videos/SomeGamesBG.gif";



const root = ReactDOM.createRoot(document.getElementById("root"))

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/TikTokToe",
        element: <TikTokToe />,
    },
    {
        path: "/WordHunt",
        element: <WordHunt />,
    },
    {
        path: "/MemoryGame",
        element: <MemoryGame />,
    },
    {
        path: "/DinoGame",
        element: <DinoGame />,
    },
    {
        path: "/FlappyBird",
        element: <FlappyBird />,
    },
])

root.render(
    <section style={{ background: `url(${bg}) no-repeat center center/cover` }}>
        <RouterProvider router={router} />
    </section>
)
