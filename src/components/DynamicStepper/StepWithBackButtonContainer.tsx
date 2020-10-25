import * as React from "react"

import StepContainer from "./StepContainer"
import StepButtons from "./StepButtons"
import BackButton from "./BackButton"

const StepWithBackButtonContainer: React.FC = ({ children }) => {
  return (
    <StepContainer>
      {children}

      <StepButtons>
        <BackButton />
      </StepButtons>
    </StepContainer>
  )
}

export default StepWithBackButtonContainer
