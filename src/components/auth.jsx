//*LIBRARY
import { getAuth} from "firebase/auth";
import { getDatabase, ref} from "firebase/database";
import { initializeApp, getApps } from "firebase/app";

//*CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyDioYAzvJooHpspr8Z58bImI0s2jaIRU90",
    authDomain: "testlogin-c11b6.firebaseapp.com",
    projectId: "testlogin-c11b6",
    storageBucket: "testlogin-c11mb6.appspot.com",
    messagingSenderId: "598921663451",
    appId: "1:598921663451:web:8bc05bbb07d312f1650dfe",
    measurementId: "G-4N0GNYZQ8J"
};
export let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);

export function editPatientInfo(patientID, name, phone) {
    const newName = prompt("Nhập tên", name);
    const newSDT = prompt("Nhập sđt", phone);

    if (newName !== null && newSDT !== null) {
        ref('patientList/' + patientID).update({
            Ho_va_ten: newName,
            SDT: newSDT
        })
            .then(() => {
                alert('cap nhat thanh cong')
            }
            ).catch((error) => {
                console.error("kooix", error)
            })
    }
}

export function GetUserInfo() {
    const user = auth.currentUser;
    if (user) return (
        <li>{user.uid}</li>
    )
    else return;
}

