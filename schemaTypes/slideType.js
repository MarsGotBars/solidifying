// schemas/slide.js
import {defineField, defineType} from 'sanity'
import {prosConsBlock} from './blocks/prosConsBlock'
import {ComposeSparklesIcon} from '@sanity/icons'

export const slideType = defineType({
  name: 'slide',
  title: 'Slides',
  type: 'document',
  icon: ComposeSparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      // we can mark it as required and show a custom error text in case it's not filled-in
      validation: (Rule) => Rule.required().error('Every slide needs a title'),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle or tagline',
    }),

    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Pros & Cons', value: 'proscons'},
          {title: 'List', value: 'list'},
          {title: 'WYSIWYG', value: 'block'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'prosConsBlocks',
      title: 'Pros & Cons Sections',
      type: 'array',
      //
      of: [prosConsBlock],
      hidden: ({parent}) => parent?.contentType !== 'proscons',
      validation: (Rule) => Rule.max(3).error('You can only have up to 3 sections'),
    }),

    defineField({
      name: 'list',
      title: 'List',
      type: 'array',
      // array of type strings!
      of: [
        {
          type: 'reference',
          to: [{type: 'slide'}], // 'slide' is the schema name of your slide documents
        },
      ],
      hidden: ({parent}) => parent?.contentType !== 'list',
    }),

    // Important to import https://www.npmjs.com/package/@portabletext/to-html into the frontend for wysiwyg's
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Paragraph', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Subheading', value: 'h3'},
            {title: 'Minor heading', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {name: 'href', type: 'url', title: 'URL'},
                  {name: 'blank', type: 'boolean', title: 'Open in new tab'},
                ],
              },
            ],
          },
        },
      ],
      hidden: ({parent}) => parent?.contentType !== 'block',
    }),

    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Video', value: 'video'},
          {title: 'Image Gallery', value: 'images'},
        ],
        layout: 'radio',
      },
    }),
    // There is no default video embed like for images so we upload a file
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        // Aaaand restrict it to video files!
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // allows free focal point selection
          },
          fields: [
            {name: 'alt', type: 'string', title: 'Alt text'},
            {name: 'caption', type: 'string', title: 'Caption'},
            {
              name: 'format',
              title: 'Format',
              type: 'string',
              options: {
                list: [
                  {title: '4:3', value: '4:3'},
                  {title: 'Free', value: 'free'},
                ],
                layout: 'radio',
              },
              initialValue: '4:3',
            },
          ],
        },
      ],
      hidden: ({parent}) => parent?.mediaType !== 'images',
    }),
    defineField({
      name: 'notes',
      title: 'Speaker Notes',
      type: 'text',
      description: 'Private notes for the presentation (not shown on slides)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: subtitle || '',
      }
    },
  },
})
