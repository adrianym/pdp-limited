import type { DeviceMode } from './App'

type DeviceSwitcherProps = {
  mode: DeviceMode
  onChange: (mode: DeviceMode) => void
}

export function DeviceSwitcher({ mode, onChange }: DeviceSwitcherProps) {
  return (
    <div
      className="device-switcher"
      role="group"
      aria-label="Cambiar vista del prototipo"
    >
      <button
        type="button"
        className={`device-switcher__btn ${mode === 'desktop' ? 'is-active' : ''}`}
        aria-pressed={mode === 'desktop'}
        onClick={() => onChange('desktop')}
      >
        Desktop
      </button>
      <button
        type="button"
        className={`device-switcher__btn ${mode === 'app' ? 'is-active' : ''}`}
        aria-pressed={mode === 'app'}
        onClick={() => onChange('app')}
      >
        App
      </button>
    </div>
  )
}
