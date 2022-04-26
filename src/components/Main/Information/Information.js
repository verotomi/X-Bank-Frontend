import React, { Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { VERSION_NUMBER } from "../../../assets/config/config";
import BreadCrumbs from "../../Shared/BreadCrumbs";

/**
 * Az információs oldal megjelenítése
 */
export default class Information extends React.Component {
  render() {
    return (
      <Fragment>
        <BreadCrumbs
          data={[
            { name: "Főoldal", link: "/" },
            { name: "Információk", link: "" },
          ]}
        />
        <div className="dashboard">
          <Row>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-bank"></i>
                    </div>
                    <h5 className="card-title">Szolgáltató</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    A weboldal szolgáltatójának részletes adatai
                  </label>
                  <p className="noIndent">
                    Cég neve: X Bank Limited
                    <br />
                    Cég címe: 1013 Budapest, Lánchíd utca 2.
                    <br />
                    Telefonszám: +36-20-289-0955
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i>§</i>
                    </div>
                    <h5 className="card-title">Jogi nyilatkozat</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    Tájékoztatás a weboldal üzemeltetőjének a jogi felelősségeiről
                  </label>
                  <p>
                    Tájékoztatjuk, hogy az X Bank Limited (a továbbiakban: Bank) netbank alkalmazásának a használatával Ön -
                    minden további jogcselekmény nélkül - elfogadja a jelen Jogi nyilatkozatban foglalt valamennyi feltételt.
                  </p>
                  <p>
                    A Bank alkalmazásában található minden képi és szöveges tartalom, letölthető dokumentum, ide értve azok
                    elrendezését, megjelenési formáját is, szerzői jogi és védjegyoltalom alatt áll, és a személyes használatot
                    meghaladó mértékben bármilyen formában kizárólag a Bank előzetes írásbeli engedélyével használható fel.
                  </p>
                  <p>
                    A Bank alkalmazásában valamennyi információ, adat, feltétel, meghatározás vagy leírás kizárólag
                    tájékoztatási céllal kerül közzétételre, azok teljességéért, pontosságáért és megbízhatóságáért, valamint az
                    ezekből eredő közvetlen vagy közvetett károkért a Bank felelősséget nem vállal, felhasználásuk az Ön saját
                    felelősségére történik. A részletes, pontos és aktuális feltételrendszert az Ügyfélszolgálatunkon közzétett,
                    mindenkor hatályos Üzletszabályzat, Általános Szerződési Feltételek és vonatkozó Hirdetmények tartalmazzák,
                    melyek megismerése érdekében, kérjük, hogy keresse fel Ügyfélszolgálatunkat, ahol munkatársaink készséggel
                    állnak az Ön rendelkezésére.
                  </p>
                  <p>
                    A Bank nem tartozik felelősséggel azokért az esetlegesen bekövetkező károkért, veszteségekért, költségekért,
                    melyek az alkalmazás használatából, használatra képtelen állapotából, nem megfelelő működéséből,
                    meghibásodásából, üzemzavarából, vonal- vagy rendszerhibából, általa hordozott vírusból, vagy az adatok
                    illetéktelen személy által történő megváltoztatása következtében keletkeznek.
                  </p>
                  <p>
                    A Bank alkalmazásából linkek segítségével elérhető weboldalakon szereplő információkat a Bank nem ellenőrzi,
                    ezek elérhetőségéért, tartalmi helyességéért felelősséget nem vállal.
                  </p>
                  <p>
                    A Bank bármely, az alkalmazás használata során tudomására jutott személyes adatot a Strasbourgban 1981.
                    január 28. napján kelt Egyezményt kihirdető 1998. évi VI. törvény és a személyes adatok védelméről és a
                    közérdekű adatok nyilvánosságáról szóló 1992. évi LXIII. törvény rendelkezései szerint kezeli. Amennyiben Ön
                    az alkalmazáson keresztül bármely személyes adatát eljuttatja a Bankhoz, ezzel hozzájárulását adja ahhoz,
                    hogy a Bank azt a hivatkozott törvényeknek megfelelően - az adatátadás jellege által meghatározott céllal és
                    ideig - nyilvántartsa és kezelje.
                  </p>
                  <p>
                    A Bank valamennyi rendelkezésére bocsátott, az Ön személyére, adataira, vagyoni helyzetére, üzleti
                    tevékenységére, gazdálkodására, tulajdonosi, üzleti kapcsolataira, számla egyenlegére, forgalmára vonatkozó
                    tényt adatot, információt, megoldást banktitokként kezel.
                  </p>
                  <p>
                    Jelen Jogi nyilatkozat esetleges jövőbeni módosítása esetén a változásokat a Bank a honlapján teszi közzé,
                    és a közzététellel egyidejűleg módosításra kifejezetten felhívja a honlap látogatóinak figyelmét.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-shield-plus"></i>
                    </div>
                    <h5 className="card-title">Adatvédelmi tájékoztató</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    Tájékoztatás a weboldal üzemeltetőjének az adatvédelemmel kapcsolatos álláspontjáról
                  </label>
                  <p>
                    Az X Bank Limited (a továbbiakban: Bank) bármely, az alkalmazás használata, illetve általa nyújtott
                    szolgáltatások során a tudomására jutott személyes adatok feldolgozása és kezelése tekintetében az egyének
                    védelméről, a személyes adatok gépi feldolgozása során, Strasbourgban, 1981. január 28. napján kelt
                    Egyezmény kihirdetéséről szóló 1998. évi VI. törvény továbbá a 2018. május 25-től alkalmazandó az Európai
                    Parlament és Tanács természetes személyeknek a személyes adatok kezelése tekintetében történő védelméről és
                    az ilyen adatok szabad áramlásáról, valamint a 95/46/EK rendelet hatályon kívül helyezéséről szóló 2016/679
                    rendelete (általános adatvédelmi rendelet, a továbbiakban: GDPR), valamint az információszabadságról szóló
                    2011. évi CXII. törvény (Infotv.), valamint az adatvédelemre vonatkozó egyéb jogszabályi rendelkezések
                    betartása mellett jár el.
                  </p>
                  <p>
                    Amennyiben Ön bármely személyes adatát a Bank tudomására hozza, ezzel lehetővé teszi, hogy a Bank azt a
                    vonatkozó jogszabályoknak megfelelően - az adatátadás jellege által meghatározott céllal és ideig -
                    nyilvántartsa és kezelje. A Bank az adatbiztonsági követelmények betartása érdekében gondoskodik a személyes
                    adatok védelméről és biztonságáról, különösen a jogosulatlan hozzáférés, megváltoztatás, továbbítás,
                    nyilvánosságra hozatal, törlés vagy megsemmisítés, valamint a véletlen megsemmisülés és sérülés ellen.
                  </p>
                  <p>
                    A Bank valamennyi rendelkezésére bocsátott, az Ön személyére, adataira, vagyoni helyzetére, üzleti
                    tevékenységére, gazdálkodására, tulajdonosi, üzleti kapcsolataira, számla egyenlegére, forgalmára vonatkozó
                    tényt adatot, információt, megoldást a hitelintézetekről és pénzügyi vállalkozásokról szóló 2013. évi
                    CCXXXVII. törvényben foglaltak szerint banktitokként kezel.
                  </p>
                  <p>
                    Az adatvédelemre, adatkezelésre vonatkozó részletes szabályokról a Bank Adatkezelési Tájékoztatójában
                    olvashat.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card netbank-card netbank-form">
                <Card.Body className="card-body pb-0">
                  <div className="d-flex flex-row">
                    <div className="card-icon d-flex align-items-center justify-content-center">
                      <i className="bi bi-laptop"></i>
                    </div>
                    <h5 className="card-title">X Bank - netbank alkalmazás</h5>
                  </div>
                  <label htmlFor="selectSourceAccountNumber" className="form-label first-label">
                    A netbank alkalmazás adatai
                  </label>
                  <p className="noIndent">
                    Verzió: {VERSION_NUMBER}
                    <br />© 2022 Verovszki Tamás
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
