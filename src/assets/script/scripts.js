import { useState } from "react";

/**
 * Lejárt token esetén tájékoztatja a felhasználót, törli a böngészőben tárolt adatokat (köztük a tokent is), valamint kilépteti a felhasználót.
 * @param {*} props
 */
export function sessionExpired(props) {
  props.showLoggedOutModal("A munkamenet lejárt! Kérem jelentkezzen be újra!");
  sessionStorage.clear();
  props.tryToLogout();
}

/**
 * Az adatbázisban angolul tárolt szövegek magyar nyelvre fordítását végzi
 */
export function translate(englishText) {
  let hungarianText;
  if (englishText != null) {
    switch (englishText.substring(0, 31)) {
      case "Cash withdrawal with creditcard":
        hungarianText = "Készpénzfelvétel bankkártyával" + englishText.substring(31, englishText.length);
        break;
      default:
        hungarianText = englishText;
        break;
    }
    switch (englishText) {
      case "-":
        hungarianText = "";
        break;
      case "account open":
        hungarianText = "Számlanyitás";
        break;
      case "Account opening":
        hungarianText = "Számlanyitás";
        break;
      case "Active":
        hungarianText = "Aktív";
        break;
      case "Breaked":
        hungarianText = "Feltörve";
        break;
      case "cash deposit":
        hungarianText = "Készpénz befizetés";
        break;
      case "cash withdrawal fee":
        hungarianText = "Készpénzfelvételi díj";
        break;
      case "cash withdrawal with creditcard":
        hungarianText = "Készpénzfelvétel bankkártyával";
        break;
      case "cash withdrawal":
        hungarianText = "Készpénzfelvétel";
        break;
      case "early withdrawal":
        hungarianText = "Betét feltörés";
        break;
      case "Every day":
        hungarianText = "Minden nap";
        break;
      case "Every month":
        hungarianText = "Minden hónap";
        break;
      case "Every week":
        hungarianText = "Minden hét";
        break;
      case "Expired":
        hungarianText = "Lejárt";
        break;
      case "Foreign currency account":
        hungarianText = "Devizaszámla";
        break;
      case "Friday":
        hungarianText = "péntekén";
        break;
      case "fund withdrawal":
        hungarianText = "Tőke jóváírás";
        break;
      case "in":
        hungarianText = "Jóváírás";
        break;
      case "Inactive":
        hungarianText = "Inaktív";
        break;
      case "incoming transfer":
        hungarianText = "Bejövő átutalás";
        break;
      case "interest withdrawal":
        hungarianText = "Kamat jóváírás";
        break;
      case "Monday":
        hungarianText = "hétfőjén";
        break;
      case "monthly fee":
        hungarianText = "Számlavezetési díj";
        break;
      case "Monthly fee":
        hungarianText = "Számlavezetési díj";
        break;
      case "Monthly saving":
        hungarianText = "Havi lekötés";
        break;
      case "out":
        hungarianText = "Terhelés ";
        break;
      case "outgoing transfer":
        hungarianText = "Kimenő átutalás";
        break;
      case "purchase with credit card":
        hungarianText = "Bankkártyás vásárlás";
        break;
      case "Quarterly saving":
        hungarianText = "Negyedéves lekötés";
        break;
      case "Random comment":
        hungarianText = "Véletlen-generált tranzakció";
        break;
      case "Random Generated":
        hungarianText = "Véletlen-generált ";
        break;
      case "recurring transfer fee":
        hungarianText = "Állandó megbízás díja";
        break;
      case "recurring transfer":
        hungarianText = "Állandó megbízás";
        break;
      case "Retail bank account":
        hungarianText = "Lakossági folyószámla";
        break;
      case "Saturday":
        hungarianText = "szombatján";
        break;
      case "Saving account":
        hungarianText = "Megtakarítási számla";
        break;
      case "saving":
        hungarianText = "Betét lekötés";
        break;
      case "Sunday":
        hungarianText = "vasárnapján";
        break;
      case "Thursday":
        hungarianText = "csütörtökén";
        break;
      case "transfer fee":
        hungarianText = "Átutalási költség";
        break;
      case "Tuesday":
        hungarianText = "keddjén";
        break;
      case "Wednesday":
        hungarianText = "szerdáján";
        break;
      case "Weekly saving":
        hungarianText = "Heti lekötés";
        break;
      case "withdrawal":
        hungarianText = "Terhelés";
        break;
      case "Yearly saving":
        hungarianText = "Éves lekötés";
        break;
      default:
        hungarianText = englishText;
        break;
    }
  }
  return hungarianText;
}

/**
 * A beviteli mezők validációját végzi
 * @param {string} fieldValue a beviteli mező értéke
 * @param {string} criterion feltétel típusa
 * @param {array} opts a feltétel paraméterei
 * @returns
 */
export function evaluate(fieldValue, criterion, opts) {
  switch (criterion) {
    case "required":
      if (fieldValue.length > 0) {
        return "OK";
      } else {
        return { error: "A mezőt ki kell tölteni!" };
      }
    case "minLength":
      if (fieldValue.length >= opts["value"]) {
        return "OK";
      } else {
        return { error: "A mező minimális hossza: " + opts["value"] + " karakter!" };
      }
    case "maxLength":
      if (fieldValue.length <= opts["value"]) {
        return "OK";
      } else {
        return { error: "A mező maximális hossza: " + opts["value"] + " karakter!" };
      }
    case "validBankAccountNumber":
      if (
        (fieldValue.length === 17 && fieldValue.substring(8, 9) === "-") ||
        (fieldValue.length === 26 && fieldValue.substring(17, 18) === "-")
      ) {
        return "OK";
      } else {
        return { error: "A bankszámlaszám 2x8 vagy 3x8 számjegyből áll, kötőjelekkel elválasztva!" };
      }
    case "lessThanZero":
      if (fieldValue > 0) {
        return "OK";
      } else {
        return { error: "Az összegnek nullánál nagyobbnak kell lennie!" };
      }
    default:
      break;
  }
}

/**
 * A bankkártyaszámot #### #### #### #### formátumban adja vissza
 * @param {int} s
 */
export function formatCreditcardNumber(s) {
  return s.toString().replace(/\d{4}(?=.)/g, "$& ");
}

/**
 * A pénzösszegeket #.## formátutmúvá alakítja át
 * @param {float} s
 */
export function formatAmount(s) {
  let x = parseFloat(s);
  x = x.toFixed(2);
  x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return x;
}

/**
 * A felhasználó adatainak a böngésző memóriájába történő mentését és az onnan történő kiolvasását végzi
 */
export default function useUserData() {
  const getUserData = () => {
    const userDataString = sessionStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    return userData?.userData;
  };
  const [userData, setUserData] = useState(getUserData());
  const saveUserData = (userData) => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData.userData);
  };

  return {
    userData,
    setUserData: saveUserData,
  };
}
