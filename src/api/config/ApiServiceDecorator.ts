import type { ApiServiceClass } from "./ApiServiceClass";


export function Mock(
  target: ApiServiceClass,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  descriptor.value = function() {
      const mockData = fetch(`src/MockedData/${propertyKey}.json`)
          .then(response => response.json())
          .then(json => json);
      return mockData
  }
}

export function Success(
    target: ApiServiceClass,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    descriptor.value = function() {
        return {
            data: {},
            success: true,
        }
    }
}
