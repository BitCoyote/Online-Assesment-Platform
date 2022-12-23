import { createBrowserRouter } from "react-router-dom";
import MainPageComponent from "./scripts/MainPageComponent";
import AssessmentComponent from "./scripts/AssessmentComponent";
import AssessmentResults from "./scripts/AssessmentResults";
import NotFound from "./scripts/Helpers/NotFound/NotFound";
import Auth from "./scripts/Auth";
import WelcomeComponent from "./scripts/WelcomeComponent";
import LogInPage from "./scripts/LogInPage";

export const router = createBrowserRouter([
    {
        element: <Auth />,
        children: [
            {
                path: '*',
                element: <NotFound />,
            },
            {
                path: '',
                element: <WelcomeComponent/>,
            },
            {
                path: '/kmq-login',
                element: <LogInPage/>,
            },
            {
                path: 'main-page',
                element: <MainPageComponent />,
            },
            {
                path: "assessment/:test_id",
                element: <AssessmentComponent />,
            },
            {
                path: "get-results/:test_id",
                element: <AssessmentResults />,
            }
        ]
    }
])