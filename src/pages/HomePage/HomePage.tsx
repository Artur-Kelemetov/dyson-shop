import { Hero } from "../../components/Hero/Hero"
import { ExpertsOpinion } from "../../components/ExpertsOpinion/ExpertsOpininon"
import { Categories } from "../../components/Categories/Categories";
import expertsOpinionImage from "../../assets/images/experts-opinion-image.png"
import { Advantages } from "../../components/Advantages/Advantages";
import { SpecialOffers } from "../../components/SpecialOffers/SpecialOffers";
import { Reviews } from "../../components/Reviews/Reviews";
import { Faq } from "../../components/Faq/Faq";
import { News } from "../../components/News/News";
import { ContactSection } from "../../components/ContactSection/ContactSection";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ExpertsOpinion imageSrc={expertsOpinionImage}/>
      <Categories/>
      <Advantages/>
      <SpecialOffers/>
      <Reviews />
      <Faq />
      <News />
      <ContactSection />
    </>
  )
}