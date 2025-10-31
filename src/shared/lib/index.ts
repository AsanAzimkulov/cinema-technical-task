export const config = {
  get API_ENDPOINT(): string {
    const { public: pub } = useRuntimeConfig()
    return pub.API_ENDPOINT || 'http://localhost:3001'
  }
}


