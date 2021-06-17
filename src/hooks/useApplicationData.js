import { useState, useEffect } from "react";
import axios from 'axios';

export function useApplicationData(initial) {

  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = function(day){
    setState(prev => {return { ...prev, day }});
  }


  const getSpotsForDay = function(appointments){
    const filteredDays = state.days.filter(filterDay => filterDay.name === state.day);
    return filteredDays[0].appointments.map(appointmentId =>  appointments[appointmentId]).filter(appointment => !appointment.interview).length;
  };

  const updateAppointmentsAndDays = function(appointmentId, interview){
    const appointment = {
      ...state.appointments[appointmentId],
      interview: interview ? { ...interview } : null
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    const spots = getSpotsForDay(appointments);
    const days = state.days.map(day => {
      if(day.name === state.day){
        return {...day, spots: spots}
      }
      return day;
    })
    setState(prev => { return {...prev, appointments, days}});
  };

  const bookInterview = function(id, interview)  {
   
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(response => {
        updateAppointmentsAndDays(id, interview);
      });
  };

  const cancelInterview = function(id) {
    
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        updateAppointmentsAndDays(id);
      });
  };


  useEffect(() =>{
    const daysGet = axios.get(`/api/days`);
    const appointmentsGet = axios.get(`/api/appointments`);
    const interviewersGet = axios.get(`/api/interviewers`);
    Promise.all([daysGet, appointmentsGet, interviewersGet]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);


return {
  state,
  setDay,
  bookInterview,
  cancelInterview
  }

};