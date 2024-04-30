//them dong nay vi event handler (tuc la onClick cua cai button) chi thuc hien dc tren client component"
'use client';

import Link from "next/link";

import { useState } from "react";
import { auth } from "../../components/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
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

function valid_name(name) {
  if (name == null) {
    return false
  }
  if (name.length <= 0) {
    return false
  } else {
    return true
  }
}

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (valid_email(email) && valid_password(password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log({ res });
          router.push('/');
        })
        .catch((e) => console.error(e));
    }
  }
  //*EVENT
  return (
      <>
        <main>
          <Link href="/">Return</Link>
          <div id="Title">
            <h2 id="form">Login</h2>
          </div>
          <form id="login" onSubmit={handleLogin}>
            <input type="email" id="email" placeholder="Email"
              onChange={(event) => setEmail(event.target.value)} />
            <input type="password" id="password" placeholder="Password"
              onChange={(event) => setPassword(event.target.value)} />
            <button type="submit" id="execute-request-button">Login</button>
          </form>
        </main>
      </>
  
    );
}