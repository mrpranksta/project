'use client';
import Image from "next/image";
import Link from "next/link";

import { auth, database } from "../../components/auth";
import { ref, set, child } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";


function valid_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true
  } else {
    // Email is not good
    return false
  }
}

function valid_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
    return false
  } else {
    return true
  }
}

export function valid_name(name) {
  if (name == null) {
    return false
  }
  if (name.length <= 0) {
    return false
  } else {
    return true
  }
}

export default function registerPage() {
  const [formContent, setFormContent] = useState({
    fullName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  
  const handleChange = (e) => {
    setFormContent({
      ...formContent,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    //CHECK LATER
    // if (password != confirmPassword) {
    //   alert('difference password');
    // }
    // else if (valid_name(fullName) == false) {
    //   alert('invalid name');
    // }
    // else if (valid_email(email) == false || valid_password(password) == false) {
    //   alert('Email or Password is not valid');
    // };

    createUserWithEmailAndPassword(auth, formContent.email, formContent.password).then(() => {
      const databaseRef = ref(database);
      const userContent = {
        fullName : formContent.fullName,
        gender: formContent.gender,
        age: formContent.age,
        phoneNumber: formContent.phoneNumber,
        address: formContent.address,
        password: formContent.password,
        role: 'patient'
      }
      //QUAN LY THEO SDT
      set(child(databaseRef, 'user/' + userContent.role + '/' + userContent.phoneNumber), userContent);
      router.push('/');
    }
    ).catch((e) => {
      //!BAT LOI NE, KHONG CHO CHAY TIEP NE
      if (e.message.includes("auth/email-already-in-use")) alert('email ton tai');
    }
    );

    // setFullName(''); setConfirmPassword(''); setEmail(''); setPassword(''); setPhoneNumber('');
  }
  return (
    <>
      <div id="Title">
        <h2 id="form">Register</h2>

        <form id="register" onSubmit={handleRegister}>
          <input type="text" id="fullName" placeholder="Full name"
            onChange={handleChange} />
          <input type="text" id="phoneNumber" placeholder="Phone number"
            onChange={handleChange} />
          <input type="text" id="gender" placeholder="Gender"
            onChange={handleChange} />
          <input type="email" id="email" placeholder="Email"
            onChange={handleChange} />
          <input type="password" id="password" placeholder="Create Password"
            onChange={handleChange} />
          <input type="password" id="confirmPassword" placeholder="Confirm Password"
            onChange={handleChange} />
          <button>Register</button>
        </form>
      </div>
    </>
  );
}
