const camelToSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const queryStringBuilder = (params: any) => {
  const keys = Object.keys(params);
  let queryString = '';

  for (let index = 0; index < keys.length; index++) {
    let key = keys[index];
    index === 0
      ? (queryString += `?${camelToSnakeCase(key)}=${encodeURIComponent(
          params[key],
        )}`)
      : (queryString += `&${camelToSnakeCase(key)}=${encodeURIComponent(
          params[key],
        )}`);
  }
  return queryString;
};

export { queryStringBuilder };
