import * as React from "react"

import Summary from "./Summary"
import ContactForm from "./ContactForm"
import EnquiryDetails from "./EnquiryDetails"

import StepContainer from "../../../../components/DynamicStepper/StepContainer"

import { fetchAPI } from "../../../../utils/fetchUtils"

import useStore from "../../../../hooks/useStore"

type BodyType = {
  firstName: string
  familyName: string
  email: string
  primaryCode: string
  primary: string
  description: object
}

const ApplicationSummary: React.FC = () => {
  const {
    state: {
      easyFlow,
      enquiryDetails,
      contactInfo: { fullName, emailAddress, phoneNumber },
    },
    boundSetContactValue,
    boundSetEnquiryDetailsValue,
    boundFinishEasyFlow,
  } = useStore()

  const [isFormValid, setIsFormValid] = React.useState(false)
  const { urgency } = enquiryDetails
  const { path } = easyFlow

  const getBodyData = () => {
    return {
      idWorkflow: "016c389f-d3a3-45a6-937b-aae5d36c555d",
      firstName: fullName.split(" ")[0],
      familyName: fullName.split(" ")[1],
      email: emailAddress,
      primary: phoneNumber,
      primaryCode: "+61",
      description: {
        ...easyFlow,
        ...enquiryDetails,
      },
    } as BodyType
  }

  const finishEasyFlow = async () => {
    const data = getBodyData()

    //console.log(JSON.stringify(data))

    const response = await fetchAPI("server", data)

    //console.log(response)

    boundFinishEasyFlow()
  }

  return (
    <StepContainer
      back
      next={{
        label: "Proceed to finish",
        onClick: finishEasyFlow,
        isDisabled: !(isFormValid && urgency),
      }}
    >
      <div className="flex flex-col flex-no-wrap space-y-10 w-full lg:flex-row lg:flex-wrap justify-center">
        <div className="flex flex-col lg:flex-row items-start justify-center space-x-5 w-full">
          {path && path !== "Other_Financial_Enquiries" && <Summary />}
          <ContactForm
            stateProps={{ fullName, emailAddress, phoneNumber, urgency }}
            methods={{
              onValid: setIsFormValid,
              setContactValue: boundSetContactValue,
              setEnquiryDetailsValue: boundSetEnquiryDetailsValue,
            }}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <EnquiryDetails />
        </div>
      </div>
    </StepContainer>
  )
}

export default ApplicationSummary
