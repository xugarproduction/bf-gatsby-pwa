import * as React from "react"

import useStore, { DataType } from "../../../../../hooks/useStore"
import useFirstRenderDisabledEffect from "../../../../../hooks/useFirstRenderDisabledEffect"

import TitleWithTooltip from "../../../../../components/Shared/TitleWithTooltip"
import Description from "../../../../../components/Shared/Description"
import StepHeader from "../../../../../components/DynamicStepper/StepHeader"
import StepWithBackButtonContainer from "../../../../../components/DynamicStepper/StepWithBackButtonContainer"

const CurrentRate: React.FC = () => {
  const {
    state: {
      easyFlow: { current_rate },
    },
    boundSelectAndNext,
  } = useStore()

  const isFirstRender = useFirstRenderDisabledEffect()
  const [amount, setAmount] = React.useState(current_rate ?? null)

  React.useEffect(() => {
    if (!isFirstRender && amount !== current_rate)
      boundSelectAndNext({
        key: "current_rate",
        value: amount,
      } as DataType)
  }, [amount])

  React.useEffect(() => {
    if (!isFirstRender && current_rate !== amount) setAmount(current_rate)
  }, [current_rate])

  return (
    <StepWithBackButtonContainer>
      <StepHeader>
        <TitleWithTooltip title="Current Rate">Norem ipsum...</TitleWithTooltip>
        <Description>What is your current rate?</Description>
      </StepHeader>

      <div className="flex items-center justify-center">
        <input
          type="number"
          min="0.00"
          max="1000000.00"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
    </StepWithBackButtonContainer>
  )
}

export default CurrentRate