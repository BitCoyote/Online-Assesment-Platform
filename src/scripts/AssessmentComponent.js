import React, { useState, useEffect } from "react"
import {getAssessment} from "../api/assessments";

function AssessmentComponent() {
  const [currAssessment, setCurrAssessment] = useState([]);

  useEffect(() => {
        setCurrAssessment(getAssessment())
  }, []);

  console.log('currAssessment', currAssessment)

  return (
    <div>
        {
            currAssessment.map(item => <div>{item}</div>)
        }
    </div>
  )
}

export default AssessmentComponent
