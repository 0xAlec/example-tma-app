import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = '906b9d654c7abec20de8377bca38d7f4'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [base]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  networks,
  projectId
})

export const config = wagmiAdapter.wagmiConfig