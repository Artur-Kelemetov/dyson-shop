import { useParams } from "react-router-dom"
import { ProductHero } from "../../components/ProductHero/ProductHero"
import { ProductDetails } from "../../components/ProductDetails/ProductDetails"
import { RelatedProducts } from "../../components/RelatedProducts/RelatedProducts"
import { Faq } from "../../components/Faq/Faq"

export const ProductPage = () => {
  const { id = "" } = useParams()

  return (
    <>
      <ProductHero id={id}/>
      <ProductDetails id={id}/>
      <Faq/>
      <RelatedProducts id={id}/>
    </>
  )
}