import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  
  const InterviewerItems = props.interviewers.map(interviewer => {
    return (<InterviewerListItem
      key={interviewer.id}
      selected={interviewer.id === props.value}
      {...interviewer}
      onChange={event => props.onChange(interviewer.id)}
      />)
      
    });
    
    
    return (
      <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{InterviewerItems}</ul>
  </section>
  );
}


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};