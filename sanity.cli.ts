import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'erbzvv1i', // User needs to replace this
    dataset: 'production'
  },
  autoUpdates: true,
})
