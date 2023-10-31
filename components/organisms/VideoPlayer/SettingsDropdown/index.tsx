import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'

type Option = 'settings' | 'quality' | 'playback'
type SettingsArray = { name: string; value: string }
type SettingsDropdownProps = {
  playback: number
  setPlayback: Function
  quality: number
  setQuality: (arg0: number) => void
}

const settingsValue: SettingsArray[] = [
  { name: 'quality', value: 'Выбор качества' },
  { name: 'playback', value: 'Скорость проигрывания' },
  { name: 'autoplay', value: 'Авто воспроизведение' },
]

const qualityValues: SettingsArray[] = [
  { name: '1080', value: '1080p' },
  { name: '720', value: '720p' },
  { name: '480', value: '480p' },
  { name: '360', value: '360p' },
  { name: 'auto', value: 'Auto' },
]

const playbackValues: SettingsArray[] = [
  { name: '2', value: '2x' },
  { name: '1.5', value: '1.5x' },
  { name: '1.25', value: '1.25x' },
  { name: '1', value: '1x' },
  { name: '0.75', value: '0.75x' },
  { name: '0.5', value: '0.5x' },
]

const SettingsDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 14.5rem; */
  /* height: 8rem; */
  background-color: rgba(29, 29, 29, 0.9);
  position: absolute;
  bottom: 4rem;
  right: 1rem;
  z-index: 10;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  outline: none;
`
const SettingsRow = styled.text<{ selected?: boolean }>`
  color: ${(props) =>
    props.selected ? colors.uguYellow : colors.uguLightGrey};
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.5rem 0;
  opacity: ${(props) => (props.selected ? 1 : 0.8)};
  :hover {
    color: ${(props) => (props.selected ? colors.uguYellow : 'white')};
    opacity: 1;
  }
`

const Separator = styled.div`
  height: 1px;
  border-bottom: 1px solid white;
  opacity: 0.15;
  min-width: 8rem;
`

const SettingsDropdown: React.FC<SettingsDropdownProps> = (props) => {
  const { playback, setPlayback, quality, setQuality } = props
  const [setting, setSetting] = useState<Option>('settings')

  const determineSelected = (value: number) => {
    if (setting === 'playback') {
      return value === playback
    } else if (setting === 'quality') {
      return value === quality
    } else {
      return false
    }
  }

  const getRows = (array: SettingsArray[]) => {
    return array.map((option, index) => {
      return (
        <>
          <SettingsRow
            key={option.name}
            onClick={() => {
              if (option.name === 'quality') {
                setSetting('quality')
              } else if (option.name === 'playback') {
                setSetting('playback')
              }
              if (setting === 'playback') {
                setPlayback(parseFloat(option.name))
              }
              if (setting === 'quality') {
                setQuality(parseFloat(option.name))
              }
            }}
            selected={determineSelected(parseFloat(option.name))}
          >
            {option.value}
          </SettingsRow>
          {index < array.length - 1 && <Separator />}
        </>
      )
    })
  }

  return (
    <SettingsDropdownWrapper>
      {(setting === 'quality' || setting === 'playback') && (
        <>
          <SettingsRow
            onClick={() => {
              setSetting('settings')
            }}
          >
            {'Назад'}
          </SettingsRow>{' '}
          <Separator />
        </>
      )}
      {setting === 'settings' && getRows(settingsValue)}
      {setting === 'quality' && getRows(qualityValues)}
      {setting === 'playback' && getRows(playbackValues)}
    </SettingsDropdownWrapper>
  )
}

export default SettingsDropdown
