import { name as pkgName } from '../package.json'

export const createQualifyActionType = moduleName => type =>
  `${pkgName}/${moduleName}/${type}`
