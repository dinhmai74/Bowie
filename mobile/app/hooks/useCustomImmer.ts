import { useImmer } from 'use-immer'
import { Draft } from 'immer'

export const useCustomImmer = <T>(init: T): [T, (f: (draft: Draft<T>) => void | T) => void] => {
  const [state, setState] = useImmer(init)

  let setStateReturn: any = () => {}

  if (setState) setStateReturn = setState

  return [state, setStateReturn]
}
