import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList (props) {

  const dayItems = props.days.map(day => {
    return (<DayListItem
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value}
      onChange={(event) => {props.onChange(day.name)}} />)
  });

  return (
    <ul>
      {dayItems}
    </ul>
  )};