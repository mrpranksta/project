'use client';
import Link from "next/link";
import Script from "next/script";

import { auth } from "../components/auth";
import { useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

//!KIEM TRA TRANG THAI LOGIN
;
    

export default function homePage() {
    return (
        <>
                {/* PHAN SEARCH */}
                <div className="SearchBox version1">
                    <div className="content">
                        <h3>BOOK N MEET A DOCTOR!</h3>
                        <p>
                            India's best online appointment scheduling platform
                        </p>
                        <div className="Searchbox_input">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <select className="search-query statefld" name="state" id="state">
                                            <option value="">State</option>
                                            <option value="AP"> Andhra Pradesh</option>
                                            <option value="AR"> Arunachal Pradesh</option>
                                            <option value="AN"> Andaman & Nicobar</option>
                                            <option value="CH"> Chandigarh</option>
                                            <option value="CT"> Chhattisgarh</option>
                                            <option value="DN"> Dadra and Nagar Haveli</option>
                                            <option value="DD"> Daman & Diu</option>
                                            <option value="AS"> Assam</option>
                                            <option value="BR"> Bihar</option>
                                            <option value="DL"> Delhi</option>
                                            <option value="GA"> Goa</option>
                                            <option value="GJ"> Gujarat</option>
                                            <option value="HR"> Haryana</option>
                                            <option value="HP"> Himachal Pradesh</option>
                                            <option value="LD"> Lakshadweep</option>
                                            <option value="PY"> Puducherry</option>
                                            <option value="JM"> Jammu</option>
                                            <option value="KS"> Kashmir</option>
                                            <option value="JH"> Jharkhand</option>
                                            <option value="KA"> Karnataka</option>
                                            <option value="KL"> Kerala</option>
                                            <option value="MP"> Madhya Pradesh</option>
                                            <option value="MH"> Maharashtra</option>
                                            <option value="MN"> Manipur</option>
                                            <option value="ML"> Meghalaya</option>
                                            <option value="MZ"> Mizoram</option>
                                            <option value="NL"> Nagaland</option>
                                            <option value="OR"> Odisha</option>
                                            <option value="PB"> Punjab</option>
                                            <option value="RJ"> Rajasthan</option>
                                            <option value="SK"> Sikkim</option>
                                            <option value="TN"> Tamil Nadu</option>
                                            <option value="TR"> Tripura</option>
                                            <option value="UK"> Uttarakhand</option>
                                            <option value="UP"> Uttar Pradesh</option>
                                            <option value="WB"> West Bengal</option>



                                        </select>
                                    </div>
                                    <div className="col-lg-4">
                                        <select name="city" id="city" className="search-query cityfld">
                                            <option value="Adilabad">Adilabad</option>
                                            <option value="Alappuzha">Alappuzha</option>
                                            <option value="Chittoor">Chittoor</option>
                                            <option value="East">East Godavari</option>
                                            <option value="Guntur">Guntur</option>
                                            <option value="Hyderabad">Hyderabad</option>
                                            <option value="Kadapa">Kadapa</option>
                                            <option value="Karimnagar">Karimnagar</option>
                                            <option value="Khammam">Khammam</option>
                                            <option value="Krishna">Krishna</option>
                                            <option value="Ernakulam">Ernakulam</option>
                                            <option value="Idukki">Idukki</option>
                                            <option value="Kollam">Kollam</option>
                                            <option value="Kannur">Kannur</option>
                                            <option value="Kasaragod">Kasaragod</option>
                                            <option value="Kottayam">Kottayam</option>
                                            <option value="Kozhikode">Kozhikode</option>
                                            <option value="Malappuram">Malappuram</option><option value="Palakkad">Palakkad</option>
                                            <option value="Pathanamthitta">Pathanamthitta</option>
                                            <option value="Thrissur">Thrissur</option>
                                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                            <option value="Wayanad">Wayanad</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-4">
                                        <input type="text" className="search-query ui-autocomplete-input" placeholder="Doctor / Specialization"></input>
                                        <input type="submit" className="button_submit" value="Search"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Main_content">
                    <div className="main_title">
                        <h1>ONLINE MOBILE APPOINTMENT SCHEDULING PLATFORM</h1>
                        <p>Online Appointment, Phone-in Appointment, Walk-in Appointment with Token</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="box_feat" id="icon_1">
                                <span></span>
                                <h3>DOCTOR NEAR ME</h3>
                                <p>Doctor / Hospital / Specialization to match specific consultation needs. Confirmed Online Appointment slots, practice locations, to select from to book appointment for clinic consultation or video consultation.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="box_feat" id="icon_2">
                                <span></span>
                                <h3>KNOW YOUR DOCTOR</h3>
                                <p>Request appointments based on slots, date,consultation location. Know your Doctor to book confirmed doctor Appointment effortlessly with clinic details of practice location to engage with patients effortlessly.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="box_feat" id="icon_3">
                                <h3>BOOK CONFIRMED APPOINTMENT</h3>
                                <p>Avoid endless back and forth communication; empowering with Google verified SMS & dynamic Email notifications. Confirmed Doctor Appointment, clinical procedure scheduling, schedule next consultation with token.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Main_content Main_content2">
                    <div className="main_title">
                        <h1>WHY CHOOSE BOOKNMEET</h1>
                        <p>Online Appointment, Phone-in Appointment, Walk-in Appointment with Token</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="box_feat" id="icon_4">
                                <span></span>
                                <h3>SIMPLIFIES SCHEDULING</h3>
                                <p>With BOOKNMEET, scheduling occurs in one well organised platform so the endless back and forth communication can be avoided and a streamlined communication is guaranteed. Manage multiple locations or employees, only show your clients the calendar you want them to see, and block out any dates you will be taking off from work. Manage Clinic effortlessly with our powerful interface for phonein, walkin and online requests.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="box_feat" id="icon_5">
                                <span></span>
                                <h3>POWERFUL.PERSONAL</h3>
                                <p>BOOKNMEET offers a wide selection of online solutions that simplify the process of scheduling appointments (clinic and eConsultation) that doesn't require registration.Send automatic and manual reminders, see who is missing at first sight.No switching between calendar and BOOKNMEET. Avoid booking conflicts. Automatically sync appointments and procedure scheduling on our powerful interface access on mobile.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="box_feat" id="icon_6">
                                <h3>BOOKNMEET QMM-TOKEN</h3>
                                <p>Improve outpatient (OP) flow at Hospitals & clinics with BOOKNMEET's QMM (Queue Management Module). Seamless queue management that works with online appointments, clinic phone-in appointments & walk-in appointments. SMS notification and reminder to maintain the patient flow in consultation with Unique Token ID. Intimating patients by sms and email reminders to avoid missing booked confirmed appointments effortlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Footer">

                </div>
        </>
    );
}
