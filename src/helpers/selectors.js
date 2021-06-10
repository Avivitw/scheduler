import React, { useState  } from "react";


export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }
  const filteredDays = state.days.filter(filterDay => filterDay.name === day);
  if (!filteredDays[0]) {
    return [];
  }
  const appointments = filteredDays[0].appointments.map(appointment =>  state.appointments[appointment]);
  return appointments;
};


export function getInterview(state, interview) {
  if (!state.interviewers) {
    return null;
  }
  if (!interview) {
    return null;
  }
  //the interview paremeter is comming from the appointments we nead to spraed it and rewrite it to get the data from
  //the appointment state - we had all the infoo we need there
  const result = {...interview,
      interviewer: state.interviewers[interview.interviewer]
  };
  return result;
};