export const getValueFromObjectByKey = (
  objectArray: any,
  keyFrom: string,
  valueFrom: any,
  keyTo: string,
) => {
  if (!Array.isArray(objectArray) || !keyFrom || !keyTo) {
    return ''
  }

  const foundObject = objectArray.find(item => item[keyFrom] === valueFrom)
  return foundObject ? foundObject[keyTo] : ''
}
