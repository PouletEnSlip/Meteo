import React, { useState } from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { RxMagnifyingGlass } from 'react-icons/rx';
import "./assets/css/style.css";

function App() {
  const [showComponents, setShowComponents] = useState(false);
  const [mainImg, setMainImg] = useState();
  const [ville, setVille] = useState('');
  const [nomVille, setNomVille] = useState();
  const [pays, setPays] = useState();
  const [temperature, setTemperature] = useState();
  const [ressenti, setRessenti] = useState();
  const [humidite, setHumidite] = useState();
  const [vent, setVent] = useState();
  const [pression, setPression] = useState();
  const [heure, setHeure] = useState();
  const [dataChart, setDataChart] = useState();
  const [jour2, setJour2] = useState();
  const [jour3, setJour3] = useState();
  const [jour4, setJour4] = useState();
  const [jour5, setJour5] = useState();
  const [jour6, setJour6] = useState();
  const [temp2, setTemp2] = useState();
  const [temp3, setTemp3] = useState();
  const [temp4, setTemp4] = useState();
  const [temp5, setTemp5] = useState();
  const [temp6, setTemp6] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [img5, setImg5] = useState();
  const [img6, setImg6] = useState();
  const metaTheme = document.getElementById("themecolor");

  const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (ville.trim()) {
        document.querySelector('.info-txt').style.display = 'block';
        const key = process.env.REACT_APP_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${key}`);
        if (response.ok) {
          const data = await response.json();
          const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ville}&units=metric&appid=${key}`);
          const data2 = await response2.json();
          setShowComponents(true);
          fetchDataCurrent(data, data2);
        } else {
          alert("Ville non reconnue, vérifiez l'orthographe et le nom complet de la ville...");
          document.querySelector('.info-txt').style.display = 'none';
          return;
        }
      } else {
        alert("Veuillez entrer une ville...");
        return;
      }
    }
  };

  const geolocation = async () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          navigator.geolocation.getCurrentPosition(async position => {
            document.querySelector('.info-txt').style.display = 'block';
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const key = process.env.REACT_APP_API_KEY;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
            const data = await response.json();
            const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
            const data2 = await response2.json();
            setShowComponents(true);
            fetchDataCurrent(data, data2);
          });
        } else {
          alert("Veuillez activer la géolocalisation de votre appareil pour ce site...");
          return;
        }
      });
    } else {
      alert("Votre navigateur ne prend pas en charge la géolocalisation...");
      return;
    }
  };

  const fetchDataCurrent = async (data, data2) => {
    const date = new Date();
    const offset = parseInt(data.timezone) / 60;
    document.querySelector('.info-txt').style.display = 'none';
    setNomVille(data.name);
    setPays(data.sys.country);
    setTemperature(data.main.temp.toFixed(1) + "°C");
    setRessenti(data.main.feels_like.toFixed(1) + "°C");
    setHumidite(data.main.humidity + "%");
    setVent(Math.round(3.6 * data.wind.speed) + "km/h");
    setPression(data.main.pressure + "hPa");
    const heureLocale = new Date(date.getTime() + (offset + date.getTimezoneOffset()) * 6e4).toLocaleTimeString("fr-FR").slice(0, -3);
    setHeure(heureLocale);
    if (data.weather[0].id === 800) {
      if (heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09")) {
        setMainImg(<img src="./assets/icons/sun.svg" className="mainImg" alt="Temps dégagé" />);
      } else {
        setMainImg(<img src="./assets/icons/sunnight.svg" className="mainImg" alt="Temps dégagé" />);
      }
      document.body.style.background = "#1c95ec";
      metaTheme.content = "#1c95ec";
    } else if (200 <= data.weather[0].id && data.weather[0].id <= 232) {
      setMainImg(<img src="./assets/icons/thunder.svg" className="mainImg" alt="Temps orageux" />);
      document.body.style.background = "#2c3c47";
      metaTheme.content = "#2c3c47";
    } else if (600 <= data.weather[0].id && data.weather[0].id <= 622) {
      setMainImg(<img src="./assets/icons/snow.svg" className="mainImg" alt="Temps neigeux" />);
      document.body.style.background = "#83939e";
      metaTheme.content = "#83939e";
    } else if (701 <= data.weather[0].id && data.weather[0].id <= 781) {
      if (heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09")) {
        setMainImg(<img src="./assets/icons/haze.svg" className="mainImg" alt="Temps brumeux" />);
      } else {
        setMainImg(<img src="./assets/icons/hazenight.svg" className="mainImg" alt="Temps brumeux" />);
      }
      document.body.style.background = "#63baf7";
      metaTheme.content = "#63baf7";
    } else if (data.weather[0].id === 801) {
      if (heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09")) {
        setMainImg(<img src="./assets/icons/fewclouds.svg" className="mainImg" alt="Temps partiellement nuageux" />);
      } else {
        setMainImg(<img src="./assets/icons/fewcloudsnight.svg" className="mainImg" alt="Temps partiellement nuageux" />);
      }
      document.body.style.background = "#41adfa";
      metaTheme.content = "#41adfa";
    } else if (802 <= data.weather[0].id && data.weather[0].id <= 804) {
      setMainImg(<img src="./assets/icons/clouds.svg" className="mainImg" alt="Temps nuageux" />);
      document.body.style.background = "#3e85b8";
      metaTheme.content = "#3e85b8";
    } else if (501 <= data.weather[0].id && data.weather[0].id <= 531) {
      setMainImg(<img src="./assets/icons/shower.svg" className="mainImg" alt="Temps très pluvieux" />);
      document.body.style.background = "#2f5069";
      metaTheme.content = "#2f5069";
    } else {
      setMainImg(<img src="./assets/icons/rain.svg" className="mainImg" alt="Temps pluvieux" />);
      document.body.style.background = "#386e94";
      metaTheme.content = "#386e94";
    }
    fetchDataForecasts(data2);
  };

  const fetchDataForecasts = async (data) => {
    let t = [];
    let s = [];
    for (let i = 0; i < data.list.length; i++) {
      let n = data.list[i].dt_txt.substring(11);
      let r = data.list[i].main.temp;
      let o = data.list[i].weather[0].id;
      if (n.indexOf("12:00:00") !== -1) {
        t.push(o);
        s.push(r);
      }
    }
    let j2 = data.list[7].dt_txt;
    let j3 = data.list[15].dt_txt;
    let j4 = data.list[23].dt_txt;
    let j5 = data.list[31].dt_txt;
    let j6 = data.list[39].dt_txt;
    if (t[0] === 800) {
      setImg2(<img src="./assets/icons/sun.svg" alt="Temps dégagé" />);
    } else if (200 <= t[0] && t[0] <= 232) {
      setImg2(<img src="./assets/icons/thunder.svg" alt="Temps orageux" />);
    } else if (600 <= t[0] && t[0] <= 622) {
      setImg2(<img src="./assets/icons/snow.svg" alt="Tmps neigeux" />);
    } else if (701 <= t[0] && t[0] <= 781) {
      setImg2(<img src="./assets/icons/sun.svg" alt="Temps brumeux" />);
    } else if (t[0] === 801) {
      setImg2(<img src="./assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" />);
    } else if (802 <= t[0] && t[0] <= 804) {
      setImg2(<img src="./assets/icons/clouds.svg" alt="Temps nuageux" />);
    } else if (501 <= t[0] && t[0] <= 531) {
      setImg2(<img src="./assets/icons/shower.svg" alt="Temps très pluvieux" />);
    } else {
      setImg2(<img src="./assets/icons/rain.svg" alt="Temps pluvieux" />);
    }
    if (t[1] === 800) {
      setImg3(<img src="./assets/icons/sun.svg" alt="Temps dégagé" />);
    } else if (200 <= t[1] && t[1] <= 232) {
      setImg3(<img src="./assets/icons/thunder.svg" alt="Temps orageux" />);
    } else if (600 <= t[1] && t[1] <= 622) {
      setImg3(<img src="./assets/icons/snow.svg" alt="Tmps neigeux" />);
    } else if (701 <= t[1] && t[1] <= 781) {
      setImg3(<img src="./assets/icons/sun.svg" alt="Temps brumeux" />);
    } else if (t[1] === 801) {
      setImg3(<img src="./assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" />);
    } else if (802 <= t[1] && t[1] <= 804) {
      setImg3(<img src="./assets/icons/clouds.svg" alt="Temps nuageux" />);
    } else if (501 <= t[1] && t[1] <= 531) {
      setImg3(<img src="./assets/icons/shower.svg" alt="Temps très pluvieux" />);
    } else {
      setImg3(<img src="./assets/icons/rain.svg" alt="Temps pluvieux" />);
    }
    if (t[2] === 800) {
      setImg4(<img src="./assets/icons/sun.svg" alt="Temps dégagé" />);
    } else if (200 <= t[2] && t[2] <= 232) {
      setImg4(<img src="./assets/icons/thunder.svg" alt="Temps orageux" />);
    } else if (600 <= t[2] && t[2] <= 622) {
      setImg4(<img src="./assets/icons/snow.svg" alt="Tmps neigeux" />);
    } else if (701 <= t[2] && t[2] <= 781) {
      setImg4(<img src="./assets/icons/sun.svg" alt="Temps brumeux" />);
    } else if (t[2] === 801) {
      setImg4(<img src="./assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" />);
    } else if (802 <= t[2] && t[2] <= 804) {
      setImg4(<img src="./assets/icons/clouds.svg" alt="Temps nuageux" />);
    } else if (501 <= t[2] && t[2] <= 531) {
      setImg4(<img src="./assets/icons/shower.svg" alt="Temps très pluvieux" />);
    } else {
      setImg4(<img src="./assets/icons/rain.svg" alt="Temps pluvieux" />);
    }
    if (t[3] === 800) {
      setImg5(<img src="./assets/icons/sun.svg" alt="Temps dégagé" />);
    } else if (200 <= t[3] && t[3] <= 232) {
      setImg5(<img src="./assets/icons/thunder.svg" alt="Temps orageux" />);
    } else if (600 <= t[3] && t[3] <= 622) {
      setImg5(<img src="./assets/icons/snow.svg" alt="Tmps neigeux" />);
    } else if (701 <= t[3] && t[3] <= 781) {
      setImg5(<img src="./assets/icons/sun.svg" alt="Temps brumeux" />);
    } else if (t[3] === 801) {
      setImg5(<img src="./assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" />);
    } else if (802 <= t[3] && t[3] <= 804) {
      setImg5(<img src="./assets/icons/clouds.svg" alt="Temps nuageux" />);
    } else if (501 <= t[3] && t[3] <= 531) {
      setImg5(<img src="./assets/icons/shower.svg" alt="Temps très pluvieux" />);
    } else {
      setImg5(<img src="./assets/icons/rain.svg" alt="Temps pluvieux" />);
    }
    if (t[4] === 800) {
      setImg6(<img src="./assets/icons/sun.svg" alt="Temps dégagé" />);
    } else if (200 <= t[4] && t[4] <= 232) {
      setImg6(<img src="./assets/icons/thunder.svg" alt="Temps orageux" />);
    } else if (600 <= t[4] && t[4] <= 622) {
      setImg6(<img src="./assets/icons/snow.svg" alt="Tmps neigeux" />);
    } else if (701 <= t[4] && t[4] <= 781) {
      setImg6(<img src="./assets/icons/sun.svg" alt="Temps brumeux" />);
    } else if (t[4] === 801) {
      setImg6(<img src="./assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" />);
    } else if (802 <= t[4] && t[4] <= 804) {
      setImg6(<img src="./assets/icons/clouds.svg" alt="Temps nuageux" />);
    } else if (501 <= t[4] && t[4] <= 531) {
      setImg6(<img src="./assets/icons/shower.svg" alt="Temps très pluvieux" />);
    } else {
      setImg6(<img src="./assets/icons/rain.svg" alt="Temps pluvieux" />);
    }
    setTemp2(Math.floor(s[0]));
    setTemp3(Math.floor(s[1]));
    setTemp4(Math.floor(s[2]));
    setTemp5(Math.floor(s[3]));
    setTemp6(Math.floor(s[4]));
    let E = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
    let day2 = new Date(j2.slice(0, -9));
    let day3 = new Date(j3.slice(0, -9));
    let day4 = new Date(j4.slice(0, -9));
    let day5 = new Date(j5.slice(0, -9));
    let day6 = new Date(j6.slice(0, -9));
    setJour2(E[day2.getDay()]);
    setJour3(E[day3.getDay()]);
    setJour4(E[day4.getDay()]);
    setJour5(E[day5.getDay()]);
    setJour6(E[day6.getDay()]);
    const listeDonnees = [{
      name: data.list[0].dt_txt.substring(11).slice(0, -3),
      temp: data.list[0].main.temp
    }, {
      name: data.list[1].dt_txt.substring(11).slice(0, -3),
      temp: data.list[1].main.temp
    }, {
      name: data.list[2].dt_txt.substring(11).slice(0, -3),
      temp: data.list[2].main.temp
    }, {
      name: data.list[3].dt_txt.substring(11).slice(0, -3),
      temp: data.list[3].main.temp
    }, {
      name: data.list[4].dt_txt.substring(11).slice(0, -3),
      temp: data.list[4].main.temp
    }, {
      name: data.list[5].dt_txt.substring(11).slice(0, -3),
      temp: data.list[5].main.temp
    }, {
      name: data.list[6].dt_txt.substring(11).slice(0, -3),
      temp: data.list[6].main.temp
    }, {
      name: data.list[7].dt_txt.substring(11).slice(0, -3),
      temp: data.list[7].main.temp
    }];
    setDataChart(listeDonnees);
  };

  const handleReturn = () => {
    setShowComponents(false);
    document.body.style.background = "#1c95ec";
    metaTheme.content = "#1c95ec";
  };

  return (
    <div className="wrapper">
      <header>
        {showComponents ? (
          <>
            <span id="heure">{heure}</span>
            <span id="retour" aria-label="Retour" onClick={handleReturn}><RxMagnifyingGlass color="white" size="25px" /></span>
          </>
        ) : (
          <span>Météo</span>
        )}
      </header>
      {!showComponents && (
        <div className="input-part">
          <p className="info-txt">Chargement...</p>
          <input
            type="text"
            placeholder="Saisissez le nom d'une ville"
            maxLength="40"
            aria-label="Rechercher"
            onKeyUp={(event) => handleKeyUp(event)}
            onChange={(event) => setVille(event.target.value)}
            required
          />
          <div className="separator"></div>
          <button onClick={geolocation}>Localisation actuelle</button>
        </div>
      )}
      {showComponents && (
        <>
          <div className="current-part">
            <div className="main-info">
              <div className="temp">
                {mainImg}
                <span>{temperature}</span>
              </div>
            </div>
            <div className="location">
              <span>{nomVille}, {pays}</span>
            </div>
            <div className="bottom-details">
              <div className="column feels">
                <div className="details">
                  <span>{ressenti}</span>
                  <p>Ressenti</p>
                </div>
              </div>
              <div className="column humidity">
                <div className="details">
                  <span>{humidite}</span>
                  <p>Humidité</p>
                </div>
              </div>
              <div className="column wind">
                <div className="details">
                  <span>{vent}</span>
                  <p>Vent</p>
                </div>
              </div>
              <div className="column pressure">
                <div className="details">
                  <span>{pression}</span>
                  <p>Pression</p>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-part">
            <div className="graphique">
              <p className="titreGraph">Températures prochaines 24 heures</p>
              <LineChart width={320} height={150} data={dataChart}>
                <XAxis axisLine={false} tick={false} dataKey="name" />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(255,255,255,.1)", borderColor: "rgba(255,255,255,.1)" }}
                  wrapperStyle={{ outline: "none" }}
                  formatter={(value) => value + "°C"}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="rgba(255,255,255,.7)"
                  strokeWidth="2"
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </div>
          </div>
          <div className="forecasts-part">
            <div className="bottom-details">
              <div className="column">
                <div className="details">
                  <p>{jour2}</p>
                  {img2}
                  <div className="temp">
                    <span>{temp2}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour3}</p>
                  {img3}
                  <div className="temp">
                    <span>{temp3}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour4}</p>
                  {img4}
                  <div className="temp">
                    <span>{temp4}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour5}</p>
                  {img5}
                  <div className="temp">
                    <span>{temp5}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour6}</p>
                  {img6}
                  <div className="temp">
                    <span>{temp6}</span>
                    °C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <span className="copyright">&copy;2020-{new Date().getFullYear()}
        <a href="https://leoseguin.fr/" target="_blank" rel="noreferrer">Léo SEGUIN</a>
      </span>
    </div>
  );
}

export default App;