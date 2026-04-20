import { useParams } from "react-router-dom"
import { ProductHero } from "../../components/ProductHero/ProductHero"
import { ProductDetails } from "../../components/ProductDetails/ProductDetails"

export const ProductPage = () => {
  const { id = "" } = useParams()

  return (
    <>
      <ProductHero id={id}/>
      <ProductDetails id={id} />
    </>
  )
}