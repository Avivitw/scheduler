import React, { useState , useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

export default function Application(props) {
  
  const [day, setDay] = useState("Monday");
  const [state, setState] = useState({
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, day);
  const dailyInterviewers = getInterviewersForDay(state, day);

  // const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setAppointments = appointments => setState({ ...state, appointments });


  useEffect(() =>{
    const daysGet = axios.get(`/api/days`);
    const appointmentsGet = axios.get(`/api/appointments`);
    const interviewersGet = axios.get(`/api/interviewers`);
    Promise.all([daysGet, appointmentsGet, interviewersGet]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);


  const appointmentsSchedule = dailyAppointments.map((appointment) =>{
    const interview = getInterview(state, appointment.interview);

     return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={dailyInterviewers}
        />
  
    );
  });



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
            days={state.days}
            value={state.day}
            onChange={setDay}
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
