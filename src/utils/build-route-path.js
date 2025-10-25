// /users/:id  ->  ['/users', 'id']
export function buildRoutePath(path) {
const routeParametersRegex = /:([a-zA-Z]+)/g
  //regex para identificar os parâmetros dinâmicos na rota
    const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    //substitui os parâmetros dinâmicos por grupos nomeados na regex
 const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`) //cria uma regex final que começa e termina com a string da rota

  return pathRegex
}