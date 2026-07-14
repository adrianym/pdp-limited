import { useEffect, useState } from 'react'

import './App.css'
import { DesktopView } from './DesktopView'
import { DeviceSwitcher } from './DeviceSwitcher'
import { MobileView } from './MobileView'

export type DeviceMode = 'desktop' | 'app'

const STORAGE_KEY = 'md.pdp.deviceMode'

function readInitialMode(): DeviceMode {
  if (typeof window === 'undefined') return 'desktop'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'desktop' || stored === 'app') return stored
  } catch {
    // ignore storage errors
  }
  return 'desktop'
}

function App() {
  const [mode, setMode] = useState<DeviceMode>(readInitialMode)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore storage errors
    }
    document.documentElement.dataset.deviceMode = mode
  }, [mode])

  return (
    <>
      {mode === 'desktop' ? <DesktopView /> : <MobileView />}
      <DeviceSwitcher mode={mode} onChange={setMode} />
    </>
  )
}

export default App
