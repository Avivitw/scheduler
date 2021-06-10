import React, { useState  } from "react";


export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(filterDay => filterDay.name === day);
  if (!filteredDays[0]) {
    return [];
  }
  const appointments = filteredDays[0].appointments.map(appointment =>  state.appointments[appointment]);
  return appointments;
}