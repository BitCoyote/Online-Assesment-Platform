import { createBrowserRouter } from "react-router-dom";
import MainPageComponent from "./scripts/MainPageComponent";
import AssessmentComponent from "./scripts/AssessmentComponent";
import AssessmentResults from "./scripts/AssessmentResults";
import NotFound from "./scripts/Helpers/NotFound/NotFound";
import Auth from "./scripts/Auth";
import WelcomeComponent from "./scripts/WelcomeComponent";
import LogInPage from "./scripts/LogInPage";
import withTabs from "./hoc/withTabs";
import CompanyAdminDashBoard from "./scripts/Admin/CompanyAdmin";
import SATResult from "./scripts/Admin/CompanyAdmin/Components/SatResult";
import checkRole from "./hoc/checkRole";
import CompanyList from "./scripts/Admin/CompanyList";

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
                element: checkRole(withTabs(MainPageComponent))(['Participant']),
            },
            {
                path: "assessment/:test_id",
                element: checkRole(withTabs(AssessmentComponent))(['Participant']),
            },
            {
                path: "get-results/:id_params",
                element: checkRole(withTabs(AssessmentResults))(['Participant', 'Company_Admin']),
            },
            {
                path: 'admin-page/companies',
                element: checkRole(withTabs(CompanyAdminDashBoard))(['Company_Admin'])
            },
            {
                path: "admin-page/company-results/:test_id",
                element: checkRole(withTabs(SATResult))(['Company_Admin'])
            },
            {
                path: 'admin-page/companies-list',
                element: checkRole(withTabs(CompanyList))(['NGen_Admin'])
            }
        ]
    }
])