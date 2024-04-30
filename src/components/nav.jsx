'use client'
import Link from "next/link"
import { useAuthContext } from "./authContext";
import { auth } from "./auth";
import { useRouter } from "next/router";

export default function Navbar() {
    const userData = useAuthContext();
    if (userData) console.log("NAV USER:" + userData.role);

    const handleLogout = () => {
        auth.signOut().then(() => {
            userData.role = null;
            userData.user = null;
            console.log(userData.user == null);
            useRouter().push('/');
        }).catch((e) => {
            console.error("Error signing out: ", e);
        })
    }
    return (
        <>
            <div id="main">
                <div id="Header">
                    <div className="row">
                        <div className="col-lg-2 col-6">
                            <div className="Logo">
                                <h1>
                                    <a title="Homepage">Homepage</a>
                                </h1>
                            </div>
                        </div>
                        <div className="col-lg-10 col-6">
                            <div className="main-menu">
                                <ul className="nav">
                                    <li id="Home">
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Page1</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Page2</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Page3</Link>
                                    </li>
                                    <li id="Register">
                                        <Link href="/register">Register</Link>
                                    </li>
                                    <li id="setAppointment">
                                        <Link href="/appointment">Appointment</Link>
                                    </li>
                                    {!userData.role &&
                                        <li id="login">
                                            <Link href="/login">Login</Link>
                                        </li>}
                                    {userData.role &&
                                        <li id="logout" onClick={handleLogout}>
                                            Logout
                                        </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}