import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6y0aobbo',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    deployment: {
      appId: 'o402jrnaq7srjwywbmapgwvy',
    },
    autoUpdates: true,
  },
})
