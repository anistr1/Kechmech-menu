import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-05-18'
})

const supplements = [
  { name: 'Tomate cerise • légumes grillés • roquette', price: 1 },
  { name: 'Ricotta • anchois • artichaud • tomate séchée', price: 3 },
  { name: 'Thon • jambon fumé • champignon', price: 4 },
  { name: 'Viande Hachée', price: 5 },
  { name: 'Mozzarella', price: 4 },
  { name: 'Roquefort • parmesan • gruyère', price: 6 },
  { name: 'Saumon • crevette • bresaola', price: 8 },
]

async function run() {
  const createdSupplements = []
  for (const supp of supplements) {
    const res = await client.create({
      _type: 'supplement',
      name: supp.name,
      price: supp.price
    })
    console.log(`Created supplement ${supp.name}`)
    createdSupplements.push(res)
  }

  const group = await client.create({
    _type: 'supplementGroup',
    name: 'Suppléments Pizza',
    supplements: createdSupplements.map(s => ({
      _type: 'reference',
      _ref: s._id,
      _key: s._id
    }))
  })
  console.log(`Created group ${group.name}`)

  // Find Pizza and Mini Pizza categories.
  // Using slug or title, let's use a GROQ query that finds them.
  const categories = await client.fetch(`*[_type == "category" && slug.current in ["pizza", "mini-pizza"]]`)
  for (const cat of categories) {
    await client.patch(cat._id).set({
      supplementGroup: {
        _type: 'reference',
        _ref: group._id
      }
    }).commit()
    console.log(`Updated category ${cat.title} (${cat.slug.current})`)
  }
}

run().catch(console.error)
