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

const compositionData = {
  compositionTitle: 'Format Familial',
  compositionSize: '(40 cm)',
  compositionSubtitle: 'Composez votre pizza !',
  compositionCombos: [
    { _key: 'combo-1', _type: 'combo', count: 2, price: 30 },
    { _key: 'combo-2', _type: 'combo', count: 4, price: 38 }
  ],
  compositionChoices: [
    'Tonno', 'Chakino', 'Chakino suprême', 'Mexicain',
    'Bresaola', 'Paisano', 'Ricca', 'Frutti de mare',
    'Acqua e terra', '4 fromages', 'Diavola', 'Norvégienne'
  ]
}

async function run() {
  // Find the Pizza category
  const categories = await client.fetch(`*[_type == "category" && slug.current == "pizza"]`)
  
  if (categories.length === 0) {
    console.error('Pizza category (slug: "pizza") not found.')
    return
  }

  const pizzaCategory = categories[0]
  
  console.log(`Found category: ${pizzaCategory.title} (${pizzaCategory._id})`)

  await client.patch(pizzaCategory._id)
    .set(compositionData)
    .commit()

  console.log('Successfully updated Pizza category composition settings in Sanity!')
}

run().catch(console.error)
