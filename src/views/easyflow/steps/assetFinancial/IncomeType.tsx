import * as React from "react"

import Tile from "../../../../components/Tile"
import TileWithCheckBox from "../../../../components/TileWithCheckBox"
import TilesContainer from "../../../../components/Shared/TilesContainer"
import TitleWithTooltip from "../../../../components/Shared/TitleWithTooltip"
import Description from "../../../../components/Shared/Description"
import StepHeader from "../../../../components/DynamicStepper/StepHeader"
import StepWithBackButtonContainer from "../../../../components/DynamicStepper/StepWithBackButtonContainer"
import StepWithNextAndBackButtonContainer from "../../../../components/DynamicStepper/StepWithNextAndBackButtonContainer"

import {
  PayslipLogo,
  SoleTraderLogo,
  CompanyLogo,
  TrustEntityLogo,
} from "../../../../utils/icons"

import useStore, { DataType } from "../../../../hooks/useStore"

const AssetPurchase: React.FC = () => {
  const {
    state: {
      easyFlow: { asset_purchase, asset_income_type },
    },
    boundSelectAndNext,
    boundToggleTile,
  } = useStore()

  const header = (
    <StepHeader>
      <TitleWithTooltip title="Type of income">Norem ipsum...</TitleWithTooltip>
      <Description>Please select your streams of income</Description>
    </StepHeader>
  )

  const component =
    asset_purchase === "Personal Name" ? (
      <StepWithBackButtonContainer>
        {header}

        <TilesContainer
          stepKeyName="asset_income_type"
          stepValue={asset_income_type}
          onTileClick={(data: DataType) => boundSelectAndNext(data)}
        >
          <Tile img={PayslipLogo}>PAYG Employed (Payslips)</Tile>
        </TilesContainer>
      </StepWithBackButtonContainer>
    ) : (
      <StepWithNextAndBackButtonContainer>
        {header}

        <TilesContainer
          isMultiple
          stepKeyName="asset_income_type"
          stepValue={asset_income_type}
          onTileClick={(data: DataType) => boundToggleTile(data)}
        >
          <TileWithCheckBox img={SoleTraderLogo}>Sole Trader</TileWithCheckBox>

          <TileWithCheckBox img={CompanyLogo}>Company</TileWithCheckBox>

          <TileWithCheckBox img={TrustEntityLogo}>Trust</TileWithCheckBox>
        </TilesContainer>
      </StepWithNextAndBackButtonContainer>
    )

  return component
}

export default AssetPurchase