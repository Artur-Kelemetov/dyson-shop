import type { CharacteristicItem } from "../../types/products"
import "./CharacteristicsTab.scss"

type CharacteristicsTabProps = {
  characteristics: CharacteristicItem[]
}

export const CharacteristicsTab = ({ characteristics }: CharacteristicsTabProps) => {

  return (
    <dl className="characteristics-tab">
      {characteristics.map((item) => (
        <div className="characteristics-tab__item" key={item.label}>
          <dt className="characteristics-tab__label">{item.label}</dt>
          <dd className="characteristics-tab__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}