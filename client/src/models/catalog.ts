export interface ICatalogItemParams {
  title: string,
  description: string,
  userId: number | undefined
}

export interface ICatalogItemDb extends ICatalogItemParams {
  id: number,
}

