# react-use-data-loader

React hook for loading data

# Installation

Using npm:

```
$ npm install --save react-use-data-loader
```

Using yarn:

```
$ yarn add react-use-data-loader
```

Since this module uses React's upcoming Hooks feature, to try this out you'll need to install the 16.7.0-alpha.0 version of react and react-dom:

```
$ yarn add react@16.7.0-alpha.0 react-dom@16.7.0-alpha.0
```

# Usage

```jsx
import React from 'react'
import { useDataLoader } from 'react-use-data-loader'

async function getData(id) {
  /* async api call */

  return 'item ' + id
}

function Example({ id }) {
  const { data, error, loading, retry } = useDataLoader(getData, id)

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return <ViewData data={data} />
}

function App() {
  return <Example id={3} />
}
```

# API

```ts

useDataLoader(getData: GetData, ...args: Args) => ({
  data: Data | null,
  error: Error | null,
  loading: boolean,
  retry: Retry,
})

type GetData = (...args: Args) => Promise<Data>
type Retry = () => void

```