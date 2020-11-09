import * as React from "react"

import useSlider from "../../hooks/useSlider"

export type ValueType = number | string
export type StepsType = {
  value: ValueType
  label: string
}

export type SliderProps = {
  steps: Array<StepsType>
  onChange: CallableFunction
  onIndexChange?: CallableFunction
  defaultValue?: any
  style?: any
}

const Slider: React.FC<SliderProps> = ({
  steps,
  onChange,
  onIndexChange,
  defaultValue,
  style,
}) => {
  const { nodes } = useSlider({ steps, onChange, onIndexChange, defaultValue })

  return (
    <div style={{ ...style }} className="flex flex-start w-full">
      {React.Children.map(nodes, node => node)}
    </div>
  )
}

export default Slider
