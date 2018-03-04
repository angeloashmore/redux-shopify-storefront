// @flow

import { name as pkgName } from '../package.json'

export const createQualifyActionType = (moduleName: string) => (type: string) =>
  `${pkgName}/${moduleName}/${type}`
