import React from 'react'
import { Detector } from 'react-detect-offline'

export function CheckConnection(props) {
  const { children } = props
  return (
    <Detector
      render={({ online }) =>
        online ? (
          children
        ) : (
          <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <h1>No connection</h1>
            <h2>Please check connection </h2>
          </div>
        )
      }
    />
  )
}
