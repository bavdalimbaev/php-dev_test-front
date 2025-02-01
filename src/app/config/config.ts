import {environment} from '../../environments/environment'

/*
 * Конфиги
 */
class Configurations {
  public static exceptions: string[] = [
    'backend',
    'frontend',
  ]

  public frontend: string = environment.frontend

  public backend: string = environment.backend

  public category = {
    getList: '/categories',
    get: '/categories/{id}',
    create: '/categories/{id}',
    update: '/categories/{id}',
    delete: '/categories/{id}',
  }

  public product = {
    getList: '/products',
    get: '/products/{id}',
    create: '/products/{id}',
    update: '/products/{id}',
    delete: '/products/{id}',
  }

  public user = {
    getList: '/user',
    get: '/user/{id}',
    create: '/user/{id}',
    update: '/user/{id}',
    delete: '/user/{id}',
  }

  constructor() {
    return new Proxy(this, this)
  }

  public get(target: any, prop: any) {
    // @ts-ignore
    const thisProp = this[prop]
    if (target && thisProp && prop !== 'exceptions') {
      if (thisProp instanceof Object) {
        return getProxy(
          thisProp,
          Configurations.exceptions.some(
            (property: string) => property === prop,
          ),
        )
      }

      if (
        Configurations.exceptions.some(
          (property: string) => property === prop,
        )
      ) {
        return thisProp
      }
    }

    return null
  }

  public getUrl = (path: string, variables: any) =>
    path.replace(/{(\w+)}/g, (_, key) => variables[key])

  public getUrlSpecial = (path: string, variables: any) =>
    path.replace(/:(\w+)/g, (_, key) => variables[key])
}

function getProxy(object: any, excepted: boolean = false): any {
  return new Proxy(object, {
    get(target, prop) {
      if (target && object[prop] && prop !== 'exceptions') {
        if (object[prop] instanceof Object) {
          return getProxy(object[prop], excepted)
        }

        if (
          !excepted &&
          !Configurations.exceptions.some(
            (property: string): boolean => property === prop,
          ) &&
          typeof object[prop] === 'string'
        ) {
          return Config.backend + object[prop]
        }

        return object[prop]
      }
    },
  })
}

export const Config: Configurations = new Configurations()


export const ROUTING_PATH = {
  user: 'user',
  product: 'product',
  category: 'category',
}

