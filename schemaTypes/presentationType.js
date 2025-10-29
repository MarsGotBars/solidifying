// schemas/presentationType.js
import { defineField, defineType } from 'sanity'

export const presentationType = defineType({
  name: 'presentation',
  title: 'Presentation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Presentation Title',
      description: 'Title of the presentation',
      type: 'string',
      validation: (Rule) => Rule.required().error('A presentation requires a title'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the URL',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      hidden: ({document}) => !document?.title,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional summary for the presentation',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'slide' }] }],
      options: { sortable: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slideCount: 'slides.length',
    },
    prepare({ title, slideCount }) {
      return {
        title: title,
        subtitle: `${slideCount || 0} slide${slideCount === 1 ? '' : 's'}`,
      }
    },
  },
})
