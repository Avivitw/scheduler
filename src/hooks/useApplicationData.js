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

  const bookInterview = function(id, interview)  {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(response => {setState( {...state,
        appointments})});
     
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {setState( {...state,
        appointments})})

  }


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