// schemas/blocks/prosConsBlock.js
export const prosConsBlock = {
  name: 'prosConsBlock',
  title: 'Pros & Cons',
  type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { 
      name: 'pros', 
      title: 'Pros', 
      type: 'array', 
      of: [
        {
          name: 'pro',
          title: 'Pro',
          type: 'object',
          fields: [
            { name: 'listItem', title: 'Pro', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'listItem', subtitle: 'description' } },
        },
      ],
      validation: (Rule) => Rule.max(5).error('You can only have up to 5 pros'),
    },
    { 
      name: 'cons', 
      title: 'Cons', 
      type: 'array', 
      of: [
        {
          name: 'con',
          title: 'Con',
          type: 'object',
          fields: [
            { name: 'listItem', title: 'Con', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'listItem', subtitle: 'description' } },
        },
      ],
      validation: (Rule) => Rule.max(5).error('You can only have up to 5 cons'),
    },
  ],
}
