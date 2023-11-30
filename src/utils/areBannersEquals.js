export function areBannersEqual (objBanners, arrBanners) {
  return (
    objBanners.banners.length === arrBanners.length &&
    objBanners.banners.every((objBanner, index) => {
      const arrBanner = arrBanners[index]
      return (
        objBanner.icon === arrBanner.icon &&
        objBanner.title === arrBanner.title &&
        objBanner.category === arrBanner.category &&
        objBanner.color === arrBanner.color &&
        objBanner.dark === arrBanner.dark
      )
    })
  )
}
