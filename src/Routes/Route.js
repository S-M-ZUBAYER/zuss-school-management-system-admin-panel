import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main"
import Admin from "../Pages/AdminPage/Admin";
import Tcr_Atd_Sheet from "../Pages/AdminPage/AdminDashboard/AdminPageDashboard/Tcr_Atd_Sheet";
import Contact from "../Pages/ContactPage/Contact";
import Home from "../Pages/Homepage/Home/Home";
import Login from "../Pages/Login/Login";
import MainAdmin from "../Pages/MainAdminPage/MainAdmin";
import Register from "../Pages/Register/Register";
import TransferCertificate from "../Pages/TeachersPage/TeacherDashboard/Certificates/TransferCertificate";
import CharacterCertificate from "../Pages/TeachersPage/TeacherDashboard/Certificates/CharacterCertificate";
import CourseCompletionCertificate from "../Pages/TeachersPage/TeacherDashboard/Certificates/CourseCompletionCertificate";
import StdTcrIdCard from "../Pages/AdminPage/AdminDashboard/AdminPageDashboard/StdTcrIdCard";
import AllStaffInfo from "../Pages/AdminPage/AdminDashboard/AdminPageDashboard/AllStaffInfo";
import AddSalary from "../Pages/AdminPage/AdminDashboard/Salary/addSalary";
import AcademicCalender from "../Pages/AdminPage/AdminDashboard/AdminPageDashboard/AcademicCalenderPage/AcademicCalender";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddNotice from "../Pages/AdminPage/AddNotice";
import AddStudent from "../Pages/AdminPage/AddStudent/AddStudent";
import AddStaff from "../Pages/AdminPage/AddStaff/AddStaff";
import AllStudent from "../Pages/AdminPage/AllStudent/AllStudent";
import AdmissionInfo from "../Pages/AdminPage/AdminDashboard/Admission/AdmissionInfo";
import AddEvents from "../Pages/AdminPage/AddEvents";
import AdminDashboard from "../Pages/AdminPage/AdminDashboard/AdminPageDashboard/AdminDashboard";
import AddClassInfo from "../Pages/AdminPage/AdminDashboard/Admission/AddClassInfo/AddClassInfo";
import ApplicationDetails from "../Pages/IntroductionPage/ApplicationDetails";
import AdminAdmissionProcess from "../Pages/AdminPage/AdminAdmissionProcess";
import GenerateClassRoutine from "../Pages/AdminPage/GenerateClassRoutine";
import SchoolStartEndField from "../Pages/AttendancePage/SchoolStartEndField";
import StudentsDetailsPage from "../Pages/AdminPage/AllStudent/StudentsDetailsPage";
import Payment from "../Pages/AdminPage/AdminDashboard/Payment/Payment";
import AddTermAndSubject from "../Pages/TeachersPage/TeacherDashboard/AddTermAndSubject";
import NoticeHomePage from "../Pages/IntroductionPage/IntroDashboard/NoticeHomePage";
import SiteManagement from "../Pages/IntroductionPage/IntroDashboard/SiteManagement";
import PrivateRoute from "./PrivateRoute";
import AdminRegister from "../Pages/Register/AdminRegister";

export const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <MainAdmin></MainAdmin>,
    //     errorElement: <ErrorPage></ErrorPage>
    // },
    {
        path: "/",
        element: <Login></Login>,
        errorElement: <ErrorPage></ErrorPage>
    },
    {

        path: "/:name",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/:name",
                element: <Home></Home>,
            },
            {
                path: "/:name/contact",
                element: <Contact></Contact>
            },
            {
                path: "/:name/login",
                element: <Login></Login>
            },
            {
                path: "/:name/teacherRegister",
                element: <Register></Register>
            },
            {
                path: "/:name/adminRegister",
                element: <AdminRegister></AdminRegister>
            },
        ]
    },

    {

        path: '/:name/admin',
        element: <PrivateRoute><Admin></Admin></PrivateRoute>,
        children: [
            {
                path: '/:name/admin',
                element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
            },
            {
                path: '/:name/admin/calender',
                element: <PrivateRoute><AcademicCalender></AcademicCalender></PrivateRoute>
            },
            {
                path: '/:name/admin/staff',
                element: <PrivateRoute><AllStaffInfo></AllStaffInfo></PrivateRoute>
            },
            {
                path: '/:name/admin/student',
                element: <PrivateRoute><AllStudent></AllStudent></PrivateRoute>
            },
            {
                path: '/:name/admin/student/details/:studentId',
                element: <PrivateRoute><StudentsDetailsPage></StudentsDetailsPage></PrivateRoute>
            },
            {
                path: '/:name/admin/idCard',
                element: <PrivateRoute><StdTcrIdCard></StdTcrIdCard></PrivateRoute>
            },
            {
                path: '/:name/admin/salary',
                element: <PrivateRoute><AddSalary></AddSalary></PrivateRoute>
            },
            {
                path: '/:name/admin/addNotice',
                element: <PrivateRoute><NoticeHomePage></NoticeHomePage></PrivateRoute>
            },
            {
                path: '/:name/admin/siteManagement',
                element: <PrivateRoute><SiteManagement></SiteManagement></PrivateRoute>
            },
            {
                path: '/:name/admin/addEvents',
                element: <PrivateRoute><AddEvents></AddEvents></PrivateRoute>
            },

            {
                path: '/:name/admin/teacher_attendance',
                element: <PrivateRoute><Tcr_Atd_Sheet></Tcr_Atd_Sheet></PrivateRoute>
            },
            {
                path: '/:name/admin/addStudent',
                element: <PrivateRoute><AddStudent></AddStudent></PrivateRoute>
            },
            {
                path: '/:name/admin/admissionProcess',
                element: <PrivateRoute><AdminAdmissionProcess></AdminAdmissionProcess></PrivateRoute>
            },
            {
                path: '/:name/admin/addStaff',
                element: <PrivateRoute><AddStaff></AddStaff></PrivateRoute>
            },
            {
                path: '/:name/admin/atnTime',
                element: <PrivateRoute><SchoolStartEndField></SchoolStartEndField></PrivateRoute>
            },
            {
                path: '/:name/admin/admission',
                element: <PrivateRoute><AdmissionInfo></AdmissionInfo></PrivateRoute>
            },
            {
                path: '/:name/admin/admissionProcess/details/:applicationId',
                element: <PrivateRoute><ApplicationDetails></ApplicationDetails></PrivateRoute>
            },
            {
                path: '/:name/admin/class',
                element: <PrivateRoute><AddClassInfo></AddClassInfo></PrivateRoute>
            },
            {
                path: '/:name/admin/classRoutine',
                element: <PrivateRoute><GenerateClassRoutine></GenerateClassRoutine></PrivateRoute>
            },
            {
                path: '/:name/admin/transfer',
                element: <PrivateRoute><TransferCertificate></TransferCertificate></PrivateRoute>
            },
            {
                path: '/:name/admin/character',
                element: <PrivateRoute><CharacterCertificate></CharacterCertificate></PrivateRoute>
            },
            {
                path: '/:name/admin/completion',
                element: <PrivateRoute><CourseCompletionCertificate></CourseCompletionCertificate></PrivateRoute>
            },
            {
                path: '/:name/admin/paymentSystem',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: '/:name/admin/term&subjects',
                element: <PrivateRoute><AddTermAndSubject></AddTermAndSubject></PrivateRoute>
            },

        ]

    }


])