interface variables {
  [key: string]: string | number
}

export default interface IParserMailDTO {
  file: string
  variables: variables
}
