import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  const InterviewerItems = props.interviewers.map(interviewer => {
    return (<InterviewerListItem
      key={interviewer.id}
      selected={interviewer.id === props.interviewer}
      {...interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
      />)
     
  });
  

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{InterviewerItems}</ul>
  </section>
  );
}