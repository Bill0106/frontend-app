export const SCREEN_DESKTOP = 1200
export const SCREEN_LAPTOP = 992
export const SCREEN_TABLET = 768

const MEDIA_QUERIES = {
  DESKTOP: `${SCREEN_DESKTOP}px`,
  LAPTOP_MAX: `${SCREEN_DESKTOP - 1}px`,
  LAPTOP: `${SCREEN_LAPTOP}px`,
  TABLET_MAX: `${SCREEN_LAPTOP - 1}px`,
  TABLET: `${SCREEN_TABLET}px`,
  MOBILE: `${SCREEN_TABLET - 1}px`
}

const IMG_WIDTH = 360
const GAP = 16
const columnLayout = (num: number) => IMG_WIDTH * num + GAP * (num + 1)

export const MAX_WIDTH = IMG_WIDTH * 6 + GAP * 5

export const COLUMN_LAYOUT = {
  COLUMN_6: `${columnLayout(6)}px`,
  COLUMN_5: `${columnLayout(5)}px`,
  COLUMN_4: `${columnLayout(4)}px`,
  COLUMN_3: `${columnLayout(3)}px`,
  COLUMN_2: `${columnLayout(2)}px`,
  COLUMN_1: `${columnLayout(1)}px`
}

export default MEDIA_QUERIES
