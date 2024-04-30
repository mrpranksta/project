'use client'
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, query, equalTo, onValue, get } from 'firebase/database';
import { auth, database } from "../components/auth"
import { useRouter } from 'next/navigation'

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

const AuthContextProvider = ({
  children,
}) => {
  const [userData, setUserData] = React.useState({
    user: null,
    role: ''
  })
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUserData({
          ...userData,
          user: authUser
        });
        console.log('user:' + userData.user);
      }
      else {
        setUserData(null);
        console.log('user:' + userData.user);
      }

      //TODO: check role
      const roles = ['patient', 'nurse', 'doctor', 'admin'];
      for (let role of roles) {
        const usersRef = ref(database, 'user/' + role);
        // console.log(usersRef);
        get(usersRef).then((snapshot) => {
          if (snapshot.exists()) {
            Object.keys(snapshot.val()).forEach(key => {
                      const userStored = snapshot.val()[key];
                      if (userStored) {
                        console.log('Check value of user: ' + userStored.role);
                        setUserData({
                          ...userData,
                          role: userStored.role
                        })
                      }
              })
            }
          })
        .catch((e) => console.error(e));
          
      }
        // let userQuery = query(userRef, equalTo(role));
        // console.log(userQuery);

        // if (userQuery) {
        //   onValue(userQuery, (snapshot) => {
        //     const userNum = snapshot.size;
        //     if (userNum) {
        //       Object.keys(snapshot.val()).forEach(key => {
        //         const userStored = snapshot.val()[key];
        //         if (userStored) {
        //           console.log('Check value of user:' + userStored);
        //           setUserData({
        //             ...userData,
        //             role: userStored.role
        //           })
        //         }
        //       })
        //     }

        //   })
        // }
        //}

      setLoading(false);
    }
    )

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={userData}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
