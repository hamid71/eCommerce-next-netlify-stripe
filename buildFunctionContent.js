const fs= require("fs")
const matter = require("gray-matter")

const getProudcts = ()=>{
    const dirctory = `${process.cwd()}/content`
    const filenames= fs.readdirSync(dirctory)
    const products = filenames.map(filename => {
      //read file fro fs
      const fileContent = fs.readFileSync(`${dirctory}/${filename}`)
      // pull out the frontmatter => name
      const { data } = matter(fileContent)
      
      return data
    })
    
   return products
}
console.log(getProudcts())
//Write into file called products.json inside functions folder
const filepath = `${process.cwd()}/functions/products.json`
const products = getProudcts()
fs.writeFileSync(filepath,JSON.stringify(products))