'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { database } from "../../components/auth";
import { ref, onValue, orderByChild, equalTo, query, update, set } from "firebase/database";

//TODO:
/*Implement logic to filter before submitting onto database
  Add a localStorage
*/


export default function appointmentPage() {

  const [formContent, setFormContent] = useState({
    fullName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    address: '',
    clinic: 'select',
    healthInsurance: 'select',
    numberHealthInsurance: '',
    time: 'select',
    date: '',

  });

  const [toRender, setToRender] = useState(false);

  const handleChange = (e) => {
    setFormContent({
      ...formContent,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formContent);


    const doctorRef = ref(database, 'doctorList/' + formContent.khoa);
    onValue(doctorRef, (doctorSnapshot) => {
      const doctorNum = doctorSnapshot.size;
      const appRef = ref(database, 'Appointment');

      let appQuery = query(appRef, orderByChild('Clinic'), equalTo(formContent.khoa));
      onValue(appQuery, (appSnapshot) => {
        const appNum = appSnapshot.size;
        //
        let count = 0;

        if (appNum) {
          Object.keys(appSnapshot.val()).forEach(key => {
            const appointment = appSnapshot.val()[key];
            console.log('Check value of appointment:' + appointment);
            if (appointment.Date === date && appointment.Time == time) {
              count++;
            }
          });
        }

        console.log("Number of appointments in the clinic and date: " + count);
        console.log("Number of doctors in the clinic: " + doctorNum);
        if (count == doctorNum) {
          console.log('full')
          return
        }
        else {
          console.log("success");
          //TODO: implement logic check before submitting to firebase

          //*Update loc theo so dien thoai?
          update(ref(database, 'Appointment/' + formContent.phoneNumber), formContent)
          .then(() => {
            alert('Submit successfully')
          })
          .catch((e) => {
            console.error('Error submitting:' + e);
          });
        }
      }, (e) => {
        console.error('Error fetching appointment:' + e);
      })
    }, (e) => {
      console.error('Error fetching doctor:' + e);
    })
  };

  //*RENDER HEALTHINSURANCE BASED ON BOOLEAN
  useEffect(() => {
    if (formContent.healthInsurance == "yes") setToRender(true);
    else setToRender(false);

  }, [formContent.healthInsurance]);

  return (
    <>
      <Link href="/">Return</Link>
      <div id="test1">
        <h2 id="form">Set Appointment</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div id="fullName">
          <label>Full Name:  </label>
          <input type="text" id="fullName" placeholder="Full name" onChange={handleChange} />
        </div>
        <div id="gender">
          <label>Gender: </label>
          <input type="text" id="gender" placeholder="Gender" onChange={handleChange} />
        </div>
        <div id="age">
          <label>Age: </label>
          <input type="text" id="age" placeholder="Age" onChange={handleChange} />
        </div>
        <div id="phoneNumber">
          <label>Phone Number: </label>
          <input type="text" id="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        </div>
        <div id="address">
          <label>Address: </label>
          <input type="text" id="address" placeholder="Address" onChange={handleChange} />
        </div>

        <div id="healthInsurance">
          <label>Health Insurance: </label>
          <select id="healthInsurance" value={formContent.healthInsurance} onChange={handleChange}>
            <option value="Select">select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <div id="numberHealthInsurance">
            {toRender &&
              <>
                <label>Health Insurance ID: </label>
                <input id="numberHealthInsurance" onChange={handleChange} />
              </>
            }
          </div>

          <div id="khoa">
            <label>Choose department: </label>
            <select id="khoa" onChange={handleChange}>
              <option value="Select">select</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Otorhinolaryngology">Otorhinolaryngology</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          <div id="time">
            <label>Choose appointment slot: </label>
            <select id="time" onChange={handleChange}>
              <option value="Select">select</option>
              <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
              <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label>Choose appointment date: </label>
          <input type="date" id="date" placeholder="Date" onChange={handleChange} />
        </div>

        <div id="button_cointer">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>



  );
}
