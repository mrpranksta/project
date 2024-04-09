//them dong nay vi event handler (tuc la onClick cua cai button) chi thuc hien dc tren client component"
'use client';

import Link from "next/link";
import Script from "next/script";
import login from "../../components/auth"

export default function LoginPage() {
  return (
    <>
      <Script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"/>
      <Script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"/>
      <Script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"/>
      <main>
        <Link href="/">Return</Link>
        <div id="Title">
          <h2 id="form">Login</h2>
        </div>
        <div id="login">
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Password" />
          <button id="execute-request-button" onClick={login}>Login</button>
        </div>
      </main>
    </>

  );
}
