// The candidates endpoint reads an absent parameter as "no filter on this
// category", so an empty selection has to become undefined rather than an
// empty string.
export const serializeFilterIds = (filterIds: number[]) => (filterIds.length > 0 ? filterIds.join(',') : undefined);
