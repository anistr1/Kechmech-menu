import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { TagIcon, DocumentTextIcon, CogIcon } from '@sanity/icons'

// Singleton types that shouldn't appear in generic lists
const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Menu Kechmech')
    .items([
      // 1. Site Settings (singleton)
      S.listItem()
        .title('Paramètres du site')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Paramètres du site')
        ),

      S.divider(),

      // 2. Categories — Drag & drop ordering view
      orderableDocumentListDeskItem({
        type: 'category',
        title: 'Catégories',
        icon: TagIcon,
        S,
        context,
      }),

      // 3. Articles par Catégorie — Grouped view
      S.listItem()
        .title('Articles par Catégorie')
        .icon(DocumentTextIcon)
        .child(
          S.documentList()
            .title('Choisissez une catégorie')
            .filter('_type == "category"')
            .canHandleIntent(() => false)
            .child(categoryId =>
              (orderableDocumentListDeskItem({
                type: 'menuItem',
                title: 'Articles',
                icon: DocumentTextIcon,
                filter: 'category._ref == $categoryId',
                params: { categoryId },
                S,
                context,
              }) as any).child
            )
        ),

      // 3.5 Tous les Articles (Global)
      orderableDocumentListDeskItem({
        type: 'menuItem',
        title: 'Tous les Articles (Global)',
        icon: DocumentTextIcon,
        S,
        context,
      }),

      S.divider(),

      // 4. Remaining types (supplements, etc.) as standard lists
      ...S.documentTypeListItems().filter(
        (listItem) => {
          const id = listItem.getId() as string
          return !SINGLETONS.includes(id) && !['category', 'menuItem'].includes(id)
        }
      ),
    ])
