import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item',{'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0});

    const formatSpots = remainSpots =>{
      if (remainSpots === 0) {
        return `no spots remaining`;
      }
      if (remainSpots === 1) {
        return `1 spot remaining`;
      }
      return `${remainSpots} spots remaining`;
      
    };

  return (
    <li className={dayClass} onClick={props.onChange} data-testid="day">
      <h2 >{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}