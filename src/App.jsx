import { useState, useEffect } from "react";
import Prayar from "./Component/Prayar"


function App() {
  let [prayarTimes, setprayarTimes] = useState({})
  let [dateTime, setdateTime] = useState("")
  let [city, setCity] = useState("Cairo")



  let cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
  ]

  useEffect(() => {
    let fetchPrayarTimes = async () => {
      try {
        let response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`);

        let data = await response.json()
        setprayarTimes(data.data.timings)
        setdateTime(data.data.date.gregorian.date)
        console.log(data.data.date.gregorian.date)
      }
      catch (error) {
        console.log(error)

      }
    }
    fetchPrayarTimes()
  }, [city])

  let formatTimes = (time) => {
    // let hours = time.split(":")[0]
    // let minutes = time.split(":")[1]
    // let ampm = hours >= 12? "PM" : "AM";
    // hours = hours % 12 || 12
    if (!time) {
      return "00:00"
    }
    let [hours, minutes] = time.split(":").map(Number)
    let perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`

  }
  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>{city.name}</option>

              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayar name="الفجر" time={formatTimes(prayarTimes.Fajr)} />
        <Prayar name="الظهر" time={formatTimes(prayarTimes.Dhuhr)} />
        <Prayar name="العصر" time={formatTimes(prayarTimes.Asr)} />
        <Prayar name="المغرب" time={formatTimes(prayarTimes.Maghrib)} />
        <Prayar name="العشاء" time={formatTimes(prayarTimes.Isha)} />
      </div>
    </section >
  )
}

export default App
