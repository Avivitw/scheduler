import React, { useState , useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12pm",
  },
  {
    id: 5,
    time: "11pm",
    interview: {
      student: "Vivi Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {


  const [selectedDay, setSelectedDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() =>{
    axios.get(`/api/days`).then((response) => {
      setDays(response.data)
      console.log(response.data);
    });
  }, [])


  const appointmentsSchedule = appointments.map((appointment) =>{
     return (<Appointment
        key={appointment.id}
        {...appointment}/>
      )});

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={selectedDay}
            onChange={setSelectedDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
         {appointmentsSchedule}
         <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
