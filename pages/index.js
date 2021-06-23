import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import styled from 'styled-components'
import UnstyledLink from '../components/styled/UnstyledLink'
import useCart from '../hooks/useCart'
import { useContext } from 'react'
import { Context } from '../context/Cart'
const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  min-height:200px;
  position:relative;
  transition: transform .3s;
  &:hover{
    transform: scale(1.02);
  }
`;
const ProductContainer = styled.div`
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: .5rem;
  margin:.5rem;
`;
const Price = styled.div`
position:absolute;
bottom:.5rem;
right:1rem;
font-size:2.5rem;
`;
const renderproduct = (product, addItemToCart) => {
  
  const handleClick =(e)=>{
    e.stopPropagation()
    addItemToCart(product)
  }
  
  return(
   
      <Link key={product.id} href={product.slug}>
        <UnstyledLink>
        <Container>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <button onClick={handleClick}>
          Add to cart
        </button>
        <Price>${product.price / 100}</Price>
        </Container>
        </UnstyledLink>
      </Link>
    
    
    
  )
}
const HomePage= (props) =>{
  const { cart, addItemToCart}= useCart()
  console.log(cart)
  return (
    <ProductContainer>
      {
        props.products.map((product) =>
         renderproduct(product,addItemToCart)) 
      }
      
    </ProductContainer>
    
  )
  
}
    
  
  
  export const getStaticProps= async()=>{

    const dirctory = `${process.cwd()}/content`
    const filenames= fs.readdirSync(dirctory)
    const products = filenames.map(filename => {
      //read file fro fs
      const fileContent = fs.readFileSync(`${dirctory}/${filename}`)
      // pull out the frontmatter => name
      const { data } = matter(fileContent)
      //return name, slug
      const slug = `/products/${filename.replace(".md"," ")}`
      const product =
      {...data,
        slug,
      }
      
      return product
    })
    
    return {
      props:{
        products
      }
    }
  }
  export default HomePage