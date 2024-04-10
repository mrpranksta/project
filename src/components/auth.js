// var firebaseConfig = {
//     apiKey: "AIzaSyDioYAzvJooHpspr8Z58bImI0s2jaIRU90",
//     authDomain: "testlogin-c11b6.firebaseapp.com",
//     projectId: "testlogin-c11b6",
//     storageBucket: "testlogin-c11b6.appspot.com",
//     messagingSenderId: "598921663451",
//     appId: "1:598921663451:web:8bc05bbb07d312f1650dfe",
//     measurementId: "G-4N0GNYZQ8J"
// };

//*LIBRARY
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeApp, getApps } from "firebase/app";
//*BI MAT QUOC GIA
const firebaseConfig = {
    apiKey: "AIzaSyDioYAzvJooHpspr8Z58bImI0s2jaIRU90",
    authDomain: "testlogin-c11b6.firebaseapp.com",
    projectId: "testlogin-c11b6",
    storageBucket: "testlogin-c11mb6.appspot.com",
    messagingSenderId: "598921663451",
    appId: "1:598921663451:web:8bc05bbb07d312f1650dfe",
    measurementId: "G-4N0GNYZQ8J"
};
let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);
export const database = getDatabase();

export default function valid_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }

export function valid_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password.length < 6) {
      return false
    } else {
      return true
    }
  }
export function valid_name(name){
    if (name == null){
        return false
    }
    if (name.length <= 0){
        return false
    } else {
        return true
    }
}

export function editPatientInfo(patientID, name,phone){
    const newName = prompt("Nhập tên", name);
    const newSDT = prompt("Nhập sđt", phone);

    if(newName !== null && newSDT !== null){ 
        ref('patientList/' + patientID).update({
            Ho_va_ten: newName,
            SDT: newSDT
        })
        .then(()=>{
            alert('cap nhat thanh cong')
        }
        ) .catch((error) => {
            console.error("kooix",error)
        })
    }
}

export function logout() {
    auth().signOut().then(() => {
        console.log("User signed out");
        location.reload();
    }).catch((error) => {
        console.error("Error signing out", error);
    })
    localStorage.removeItem('customToken')
}

export function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    //ham valid_email vs valid_password
    if (valid_email(email) == false || valid_password(password) == false){
        alert('Email or Password is not valid')
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then( () => {
        database.ref('Register').orderByChild('email').equalTo(email).once('value')
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                userID = childSnapshot.val().phone_number
                
                var database_ref = database.ref()
            
                var user_data = {
                    last_login : Date.now()
                }
                database_ref.child('Login/' + userID).update(user_data)
                alert('user logged in!')
                window.location.href = "index1.html";
            })
        })
       
    }
    )
}
    