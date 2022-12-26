import { createBrowserRouter } from "react-router-dom";
import MainPageComponent from "./scripts/MainPageComponent";
import AssessmentComponent from "./scripts/AssessmentComponent";
import AssessmentResults from "./scripts/AssessmentResults";
import NotFound from "./scripts/Helpers/NotFound/NotFound";
import Auth from "./scripts/Auth";
import WelcomeComponent from "./scripts/WelcomeComponent";
import LogInPage from "./scripts/LogInPage";
import withTabs from "./hoc/withTabs";
import DashboardContainer from "./scripts/Admin/DashboardContainer";
import CompanyAdminDashBoard from "./scripts/Admin/CompanyAdmin/DashBoard";
import SATResult from "./scripts/Admin/CompanyAdmin/SatResult";
import RedirectionComponent from "./scripts/Admin/RedirectionComponent";

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
                path: '/user-login',
                element: <LogInPage/>,
            },
            {
                path: 'main-page',
                element: withTabs(MainPageComponent),
            },
            {
                path: "assessment/:test_id",
                element: withTabs(AssessmentComponent),
            },
            {
                path: "get-results/:test_id",
                element: withTabs(AssessmentResults),
            },
            {
                path: "/admin-page",
                element: <DashboardContainer />,
                children: [
                    {
                        path: "",
                        element: <RedirectionComponent />
                    },
                    {
                        path: "companies",
                        element: <CompanyAdminDashBoard />
                    },
                    {
                        path: "company-results/:test_id",
                        element: <SATResult />
                    }
                ]
            }
        ]
    }
])