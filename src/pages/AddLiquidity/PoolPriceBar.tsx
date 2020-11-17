import { Currency, Percent, Price } from '@uniswap/sdk'
import React from 'react'
import { Text } from 'rebass'
// import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../../components/Column'
// import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  // const theme = useContext(ThemeContext)
  return (
    <AutoColumn gap="md">
      <div>
        <AutoColumn
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TYPE.black color={'rgba(255,255,255,0.8)'}>{price?.toSignificant(6) ?? '-'}</TYPE.black>
          <Text fontWeight={500} fontSize={13} color={'rgba(255,255,255,0.3)'} pt={1}>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop:5
          }}
        >
          <TYPE.black color={'rgba(255,255,255,0.8)'}>{price?.invert()?.toSignificant(6) ?? '-'}</TYPE.black>
          <Text fontWeight={500} fontSize={13} color={'rgba(255,255,255,0.3)'} pt={1}>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </Text>
        </AutoColumn>
        <AutoColumn
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop:5
          }}
        >
          <TYPE.black color={'rgba(255,255,255,0.8)'}>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TYPE.black>
          <Text fontWeight={500} fontSize={13} color={'rgba(255,255,255,0.3)'} pt={1}>
            Share of Pool
          </Text>
        </AutoColumn>
      </div>
    </AutoColumn>
  )
}
