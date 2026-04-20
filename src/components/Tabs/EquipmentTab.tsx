import type { EquipmentItem } from "../../types/products"
import "./EquipmentTab.scss"

type EquipmentTabProps = {
  equipment: EquipmentItem[]
}

export const EquipmentTab = ({ equipment }: EquipmentTabProps) => {
  return (
    <div className="equipment-tab">
      {equipment.map((item) => (
        <article className="equipment-tab__card" key={item.title}>
          <img 
            className="equipment-tab__image" 
            src={item.image} 
            alt={item.title}  
          />

          <div className="equipment-tab__content">
            <h3 className="equipment-tab__title">{item.title}</h3>
            <p className="equipment-tab__text">{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  )
}