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
import StudentAttendanceStatus from "../Pages/StudentsPage/StudentDashboard/StudentAttendance/StudentAttendanceStatus";
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
                path: "/:name/register",
                element: <Register></Register>
            },
        ]
    },

    {

        path: '/:name/admin',
        element: <Admin></Admin>,
        children: [
            {
                path: '/:name/admin',
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: '/:name/admin/calender',
                element: <AcademicCalender></AcademicCalender>
            },
            {
                path: '/:name/admin/staff',
                element: <AllStaffInfo></AllStaffInfo>
            },
            {
                path: '/:name/admin/student',
                element: <AllStudent></AllStudent>
            },
            {
                path: '/:name/admin/student/details/:studentId',
                element: <StudentsDetailsPage></StudentsDetailsPage>
            },
            {
                path: '/:name/admin/idCard',
                element: <StdTcrIdCard></StdTcrIdCard>
            },
            {
                path: '/:name/admin/salary',
                element: <AddSalary></AddSalary>
            },
            {
                path: '/:name/admin/addNotice',
                element: <NoticeHomePage></NoticeHomePage>
            },
            {
                path: '/:name/admin/siteManagement',
                element: <SiteManagement></SiteManagement>
            },
            {
                path: '/:name/admin/addEvents',
                element: <AddEvents></AddEvents>
            },
            {
                path: '/:name/admin/Student_attendance',
                element: <StudentAttendanceStatus></StudentAttendanceStatus>
            },
            {
                path: '/:name/admin/teacher_attendance',
                element: <Tcr_Atd_Sheet></Tcr_Atd_Sheet>
            },
            {
                path: '/:name/admin/addStudent',
                element: <AddStudent></AddStudent>
            },
            {
                path: '/:name/admin/admissionProcess',
                element: <AdminAdmissionProcess></AdminAdmissionProcess>
            },
            {
                path: '/:name/admin/addStaff',
                element: <AddStaff></AddStaff>
            },
            {
                path: '/:name/admin/atnTime',
                element: <SchoolStartEndField></SchoolStartEndField>
            },
            {
                path: '/:name/admin/admission',
                element: <AdmissionInfo></AdmissionInfo>
            },
            {
                path: '/:name/admin/admissionProcess/details/:applicationId',
                element: <ApplicationDetails></ApplicationDetails>
            },
            {
                path: '/:name/admin/class',
                element: <AddClassInfo></AddClassInfo>
            },
            {
                path: '/:name/admin/classRoutine',
                element: <GenerateClassRoutine></GenerateClassRoutine>
            },
            {
                path: '/:name/admin/transfer',
                element: <TransferCertificate></TransferCertificate>
            },
            {
                path: '/:name/admin/character',
                element: <CharacterCertificate></CharacterCertificate>
            },
            {
                path: '/:name/admin/completion',
                element: <CourseCompletionCertificate></CourseCompletionCertificate>
            },
            {
                path: '/:name/admin/paymentSystem',
                element: <Payment></Payment>
            },
            {
                path: '/:name/admin/term&subjects',
                element: <AddTermAndSubject></AddTermAndSubject>
            },

        ]

    }


])