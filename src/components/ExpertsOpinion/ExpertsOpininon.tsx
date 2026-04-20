import "./ExpertsOpinion.scss"

type ExpertsOpinionProps = {
  imageSrc: string,
  imageAlt?: string
}

export const ExpertsOpinion = ({ imageSrc, imageAlt = 'Девушка с феном Dyson' }: ExpertsOpinionProps) => {
  return (
    <section className="experts-opinion" aria-labelledby="experts-opinion-title">
      <div className="experts-opinion__body container">
        <div className="experts-opinion__content">
          <h2 className="experts-opinion__title h2" id="experts-opinion-title">
            Мнение экспертов о технике Dyson
          </h2>
          <div className="experts-opinion__text">
            <p>
              Сегодня многие стилисты и салоны красоты в своей работе используют технику от Dyson.
            </p>
            <p>Несмотря на высокую стоимость, техника Dyson помогает экономить. Мастера тратят меньше времени на сушку и укладку волос, 
              благодаря чему успевают обслужить большее количество клиентов. 
              Также устройства от Dyson потребляют значительно меньше электроэнергии, не теряя свою мощность.
            </p>
            <p>
              Фены Dyson универсальны. Они подходят для сушки разных типов волос. Насадки из комплекта помогают создавать укладки на любой вкус. 
              Функциональность девайсов впечатляет не меньше, чем их уникальный дизайн.
            </p>
            <p>
              Ведущие стилисты отмечают, что техника Dyson для ухода за волосами идеально подходит для длительной работы за счет своей эргономичности. 
            А за счет бесшумности инновационного мотора использование устройств стало максимально комфортным.
            </p>
          </div>
        </div>
          <div className="experts-opinion__image-wrapper">
            <img className="experts-opinion__image" src={imageSrc} alt={imageAlt} width={700} height={700}/>
          </div>
      </div>
    </section>
  )
}