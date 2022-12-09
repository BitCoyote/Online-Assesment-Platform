import { createBrowserRouter } from "react-router-dom";
import MainPageComponent from "./scripts/MainPageComponent";
import AssessmentComponent from "./scripts/AssessmentComponent";
import AssessmentResults from "./scripts/AssessmentResults";
import NotFound from "./scripts/Helpers/NotFound/NotFound";
import Auth from "./scripts/Auth/Auth";

export const router = createBrowserRouter([
    {
        element: <Auth />,
        children: [
            {
                path: '*',
                element: <NotFound />,
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