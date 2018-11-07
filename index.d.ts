export function useDataLoader<Data, Args extends any[]>(
  getData: (...args: Args) => Promise<Data>,
  ...args: Args
): {
  data: Data | null
  error: Error | null
  loading: boolean
  retry: () => void
}
