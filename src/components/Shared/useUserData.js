import { useState } from 'react';

export default function useUserData() {
  const getUserData = () => {
    const userDataString = sessionStorage.getItem('userData');
    const userUserData = JSON.parse(userDataString); // ez csak addig kellett, amig a bejelentkezés a sessionstorage-al történt
    return userUserData?.userData // ez csak addig kellett, amig a bejelentkezés a sessionstorage-al történt
  };

  const [userData, setUserData] = useState(getUserData());
  const saveUserData = userUserData => {
    sessionStorage.setItem('userData', JSON.stringify(userUserData));
    setUserData(userUserData.userData);
  };

  return { // ez sztem nem kell, sőt, az egész fájlból csal a seesionstorage-ba mentés kell
      userData,
    setUserData: saveUserData
  }
}