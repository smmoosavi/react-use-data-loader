import { useEffect, useState, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'get':
      return { ...state, loading: true }
    case 'success':
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loading: false,
      }
    case 'error':
      return {
        ...state,
        data: null,
        error: action.payload.error,
        loading: false,
      }
    default:
      return state
  }
}

export const useDataLoader = (getData, ...args) => {
  const [nonce, setNonce] = useState(Date.now())
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: true,
  })

  useEffect(
    () => {
      let cancel = false

      dispatch({ type: 'get' })
      getData(...args)
        .then(data => {
          !cancel && dispatch({ type: 'success', payload: { data } })
        })
        .catch(error => {
          !cancel && dispatch({ type: 'error', payload: { error } })
        })

      return () => {
        cancel = true
      }
    },
    [nonce, ...args],
  )

  const retry = () => {
    setNonce(Date.now())
  }

  return { ...state, retry }
}
