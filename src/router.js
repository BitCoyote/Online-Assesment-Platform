import {createBrowserRouter} from "react-router-dom";
import MainPageComponent from "./scripts/MainPageComponent";
import AssessmentComponent from "./scripts/AssessmentComponent";
import AssessmentResults from "./scripts/AssessmentResults";

export const router = createBrowserRouter([
    {
        path: "main-page",
        element: <MainPageComponent/>,
    },
    {
        path: "assessment/:test_id",
        element: <AssessmentComponent/>,
    },
    {
        path: "get-results/:test_id",
        element: <AssessmentResults/>,
    },
]);