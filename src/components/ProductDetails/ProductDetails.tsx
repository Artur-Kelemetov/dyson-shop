import { useState, useRef, useEffect } from "react"
import { CharacteristicsTab } from "../Tabs/CharacteristicsTab"
import { EquipmentTab } from "../Tabs/EquipmentTab"
import "./ProductDetails.scss"
import { useProducts } from "../../hooks/useProducts"
import certificateImage1 from "../../assets/images/certificates/certificate-1.webp"
import certificateImage2 from "../../assets/images/certificates/certificate-2.webp"
import certificateImage3 from "../../assets/images/certificates/certificate-3.webp"
import certificateImage4 from "../../assets/images/certificates/certificate-4.webp"

type ProductDetailsProps = {
  id: string
}

type ProductDetailsTabId =
  | "equipment" 
  | "characteristics" 
  | "delivery" 
  | "payment" 
  | "rules" 
  | "warranty"  
  | "certificates"

type ProductDetailsTab = {
  id: ProductDetailsTabId
  label: string
}

const tabs: ProductDetailsTab[] = [
  { id: "equipment", label: "Комплектация" },
  { id: "characteristics", label: "Характеристики" },
  { id: "delivery", label: "Доставка" },
  { id: "payment", label: "Оплата" },
  { id: "rules", label: "Правила эксплуатации" },
  { id: "warranty", label: "Гарантия" },
  { id: "certificates", label: "Сертификаты" },
]

export const ProductDetails = ({ id }: ProductDetailsProps) => {
  const [activeTabId, setActiveTabId] = useState<ProductDetailsTabId>("equipment")

  const { data: products = [], isLoading, isError } = useProducts()

  const tabsRef = useRef<HTMLDivElement>(null)

  const product = products.find((product) => String(product.id) === id)

  const availableTabs = tabs.filter((tab) => {
    if (tab.id === "equipment") {
      return Boolean(product?.equipment?.length)
    }

    if (tab.id === "characteristics") {
      return Boolean(product?.characteristics?.length)
    }

    return true
  })

  useEffect(() => {
    if (!product) return

    const isActiveTabAvailable = availableTabs.some((tab) => tab.id === activeTabId)

    if (!isActiveTabAvailable && availableTabs.length > 0) {
      setActiveTabId(availableTabs[0].id)
    }
  }, [activeTabId, availableTabs])

  const handleTabClick = (tabId: ProductDetailsTabId) => {
    setActiveTabId(tabId)

    requestAnimationFrame(() => {
      const activeTabButton = tabsRef.current?.querySelector<HTMLButtonElement>(
        `[data-tab-id="${tabId}"]`
      )
      
      activeTabButton?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      })
    })
  }

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Не удалось загрузить данные товара</p>
  if (!product) return <p>Товар не найден</p>

  const renderContent = () => {
    switch(activeTabId) {
      case "equipment": 
        return <EquipmentTab equipment={product.equipment ?? []} />

      case "characteristics": 
        return <CharacteristicsTab characteristics={product.characteristics ?? []} />

      case "delivery":
        return (
          <div className="delivery-tab">
            <div className="delivery-tab__column">
              <h3 className="delivery-tab__title">Доставка по Москве</h3>

              <ul className="delivery-tab__list">
                <li>Доставка продукции по Москве и МО в течение 2 часов в день заказа или в любой удобный день.</li>
                <li>Стоимость доставки по Москве — 0 р.</li>
                <li>Стоимость доставки за МКАД — 500 р. до 10 км</li>
                <li>Стоимость доставки более 10 км — рассчитывается отдельно оператором</li>
                <li>Оплата возможна при получении курьеру после проверки продукции</li>
              </ul>
            </div>

            <div className="delivery-tab__column">
              <h3 className="delivery-tab__title">Доставка в регионы</h3>

              <ul className="delivery-tab__list">
                <li>Стоимость доставки в регионы осуществляется компанией Boxberry и рассчитывается отдельно оператором</li>
                <li>Оплата возможна при получении курьеру после проверки продукции</li>
              </ul>
            </div>
          </div>
        )

      case "payment":
        return (
          <div className="payment-tab">
            <p className="payment-tab__text">
              Оплата заказа производится только после того, как вы получили товар,
              проверили его внешний вид, комплектацию и убедились, что устройство
              полностью соответствует описанию. Курьер передаст товар и даст время
              осмотреть упаковку, насадки, документы и основные элементы комплекта.
            </p>

            <p className="payment-tab__title">Способы оплаты:</p>
            
            <ol>
              <li>Наличными курьеру при получении</li>
              <li>Банковской картой при получении</li>
              <li>Онлайн-оплата банковской картой</li>
              <li>Оплата после проверки товара</li>
            </ol>

            <p>
              Перед оплатой вы можете проверить комплектацию, внешний вид и
              работоспособность товара. Если у вас возникнут вопросы по устройству,
              комплектации или гарантии, курьер передаст информацию менеджеру для
              дополнительной консультации.
            </p>
          </div>
        )

      case "rules":
        return (
          <div className="rules-tab">
            <p className="rules-tab__text">
              Используйте устройство только по назначению и соблюдайте базовые правила
              безопасности. Не перекрывайте воздушные отверстия во время работы, не
              допускайте попадания влаги внутрь корпуса и не используйте устройство
              рядом с водой.
            </p>

            <p className="rules-tab__text">
              Перед началом работы убедитесь, что насадка надежно закреплена, а кабель
              и корпус не имеют видимых повреждений. Во время сушки держите прибор на
              безопасном расстоянии от волос и кожи головы, выбирая подходящую
              температуру и скорость воздушного потока.
            </p>

            <p className="rules-tab__text">
              После использования дайте устройству остыть, отключите его от сети и
              храните в сухом месте. Не наматывайте провод слишком туго вокруг корпуса,
              чтобы избежать повреждения кабеля.
            </p>
          </div>
        )

      case "warranty":
        return (
          <div className="warranty-tab">
            <p className="warranty-tab__text">
              На товар предоставляется гарантия. При обнаружении заводского брака или
              неисправности вы можете обратиться в сервисный центр или связаться с нами
              для консультации по дальнейшим действиям.
            </p>

            <p className="warranty-tab__text">
              Гарантия распространяется на производственные дефекты и неисправности,
              которые возникли не по вине пользователя. Для обращения по гарантии
              необходимо сохранить документы, подтверждающие покупку, а также не
              нарушать правила эксплуатации устройства.
            </p>

            <p className="warranty-tab__text">
              Гарантия не распространяется на механические повреждения, следы падения,
              попадание влаги внутрь корпуса, самостоятельный ремонт или использование
              устройства не по назначению.
            </p>
          </div>
        )

      case "certificates":
        return (
          <div className="certificates-tab">
            <img src={certificateImage1} alt="" className="certificates-tab__image" />
            <img src={certificateImage2} alt="" className="certificates-tab__image" />
            <img src={certificateImage3} alt="" className="certificates-tab__image" />
            <img src={certificateImage4} alt="" className="certificates-tab__image" />
          </div>
        )
    }
  }

  return (
    <section className="product-details">
      <div className="product-details__body container">
        <div className="product-details__tabs" role="tablist" ref={tabsRef}>
          <div className="product-details__tabs-list">
            {availableTabs.map((tab) => (
              <button 
                className={`product-details__tab ${activeTabId === tab.id ? "is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeTabId === tab.id}
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="product-details__content">
          {renderContent()}
        </div>
      </div>
    </section>
  )
}