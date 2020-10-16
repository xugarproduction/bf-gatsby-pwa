import { ActionTypes } from "./actions"

export const initialState = {
  easyFlow: {
    currentStep: 0,
  },
  factFind: {},
}

export const reducer = (state, action) => {
  const { type, payload } = action
  let easyFlowTemp

  switch (type) {
    case ActionTypes.EASY_FLOW_SELECT_TILE:
      return {
        ...state,
        easyFlow: { ...state.easyFlow, [payload.key]: payload.value },
      }

    case ActionTypes.EASY_FLOW_TOGGLE_TILE:
      easyFlowTemp = { ...state.easyFlow }
      let keyPropertyValue = easyFlowTemp?.[payload.key]

      if (keyPropertyValue) {
        const indexOfValue = keyPropertyValue.indexOf(payload.value)

        indexOfValue === -1
          ? keyPropertyValue.push(payload.value)
          : keyPropertyValue.splice(indexOfValue, 1)

        easyFlowTemp = {
          ...easyFlowTemp,
          [payload.key]: [...keyPropertyValue],
        }
      } else {
        easyFlowTemp = {
          ...easyFlowTemp,
          [payload.key]: [payload.value],
        }
      }

      return { ...state, easyFlow: { ...easyFlowTemp } }

    case ActionTypes.EASY_FLOW_GO_NEXT:
      return {
        ...state,
        easyFlow: { ...state.easyFlow, currentStep: state.easyFlow.currentStep + 1 },
      }

    case ActionTypes.EASY_FLOW_GO_BACK:
      return {
        ...state,
        easyFlow: { ...state.easyFlow, currentStep: state.easyFlow.currentStep - 1 },
      }

    case ActionTypes.EASY_FLOW_ADD_APPLICANTS:
      easyFlowTemp = { ...state.easyFlow }
      let applicants

      for (let index = 0; index < payload; index++) {
        applicants.push({})
      }

      easyFlowTemp.applicants = applicants

      return { ...state, easyFlow: { ...easyFlowTemp } }

    default:
      return state
  }
}
