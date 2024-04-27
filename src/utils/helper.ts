export const getValueFromObjectByKey = (objectArray: any, keyFrom: string, valueFrom: any) => {
  if (!Array.isArray(objectArray) || !keyFrom) {
    return ''
  }

  const foundObject = objectArray.find(item => item[keyFrom] === valueFrom)
  return foundObject
}
