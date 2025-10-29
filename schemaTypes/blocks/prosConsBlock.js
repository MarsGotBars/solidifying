// schemas/blocks/prosConsBlock.js
export const prosConsBlock = {
  name: 'prosConsBlock',
  title: 'Pros & Cons',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'selection',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          {title: 'List', value: 'list'},
          {title: 'Image gallery', value: 'images'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'list',
    },
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
            {name: 'listItem', title: 'Pro', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {
              name: 'image',
              title: 'Image (optional)',
              type: 'image',
              options: {hotspot: true},
            },
          ],
          preview: {select: {title: 'listItem', subtitle: 'description'}},
        },
      ],
      hidden: ({parent}) => parent?.selection !== 'list',
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
            {name: 'listItem', title: 'Con', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {
              name: 'image',
              title: 'Image (optional)',
              type: 'image',
              options: {hotspot: true},
            },
          ],
          preview: {select: {title: 'listItem', subtitle: 'description'}},
        },
      ],
      hidden: ({parent}) => parent?.selection !== 'list',
      validation: (Rule) => Rule.max(5).error('You can only have up to 5 cons'),
    },
    {
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      hidden: ({parent}) => parent?.selection !== 'images',
      validation: (Rule) =>
        Rule.custom((images, context) => {
          if (context.parent.selection === 'images' && (!images || images.length === 0)) {
            return 'Please add at least one image'
          }
          return true
        }),
    },
  ],
}
