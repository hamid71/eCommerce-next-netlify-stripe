import  fs  from "fs"
import matter from "gray-matter"
import marked from "marked"
import styled from "styled-components"
import Page from "../../components/styled/Page"

const Title = styled.div`
    display: flex;
    align-items: flex-end;
`;
const SubTitle = styled.p`
    padding: 1rem 1rem;
    margin:.75rem .5rem;
    color: #666;
`;
const Price = styled.span `
font-size: 2rem;
background: #3de2b6 ;
padding: .25rem 1rem;
border-radius: 5px;
color: white;
font-weight: 800;
display:inline-block;
margin-bottom:1rem;
`
const product = ({product:{data, content}}) => {
    const html = marked(content)
  return (
    <Page>
        <Title>
        <h1>{data.name}</h1>
      <SubTitle>{data.description}</SubTitle>   
        </Title>
      <Price> ${data.price /100 }</Price>
      <div dangerouslySetInnerHTML= {{__html: html}}/>
    </Page>
  )
}
export const getStaticPaths = () => {
    const dirctory = `${process.cwd()}/content`
    const filenames= fs.readdirSync(dirctory)
    const paths = filenames.map((filename) => {
        return {
            params: {
                product:filename.replace(".md","")
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}
export const getStaticProps = async(context) =>{
    const productName = context.params.product
    const filePath = `${process.cwd()}/content/${productName}.md`
    const fileContent = fs.readFileSync(filePath).toString()
    const { data, content} = matter(fileContent)
    return{
        props:{
            product:{
                data,
                content,
            }
        }
    }
}

export default product
