const doesCourseMaterialExistsOnLive = (
  items: any[] = [],
  itemId: string
): boolean => {
  return !items?.some((s) => s._id === itemId)
}
export default doesCourseMaterialExistsOnLive
