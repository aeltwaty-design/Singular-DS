export interface ColorScale {
  25: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface StatusColors {
  error: ColorScale;
  warning: ColorScale;
  success: ColorScale;
  info: ColorScale;
}

export const grayLight: ColorScale = {
  25: '#FDFDFD',
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E9EAEB',
  300: '#D5D7DA',
  400: '#A4A7AE',
  500: '#717680',
  600: '#535862',
  700: '#414651',
  800: '#252B37',
  900: '#181D27',
  950: '#0A0D12',
};

export const grayDark: ColorScale = {
  25: '#FAFAFA',
  50: '#F7F7F7',
  100: '#F0F0F1',
  200: '#ECECED',
  300: '#CECFD2',
  400: '#94979C',
  500: '#85888E',
  600: '#61656C',
  700: '#373A41',
  800: '#22262F',
  900: '#13161B',
  950: '#0C0E12',
};

export const statusColors: StatusColors = {
  error: {
    25: '#FFFBFA',
    50: '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    300: '#FDA29B',
    400: '#F97066',
    500: '#F04438',
    600: '#D92D20',
    700: '#B42318',
    800: '#912018',
    900: '#7A271A',
    950: '#55160C',
  },
  warning: {
    25: '#FFFCF5',
    50: '#FFFAEB',
    100: '#FEF0C7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#7A2E0E',
    950: '#4E1D09',
  },
  success: {
    25: '#F6FEF9',
    50: '#ECFDF3',
    100: '#DCFAE6',
    200: '#ABEFC6',
    300: '#75E0A7',
    400: '#47CD89',
    500: '#17B26A',
    600: '#079455',
    700: '#067647',
    800: '#085D3A',
    900: '#074D31',
    950: '#053321',
  },
  info: {
    25: '#F5FAFF',
    50: '#EFF8FF',
    100: '#D1E9FF',
    200: '#B2DDFF',
    300: '#84CAFF',
    400: '#53B1FD',
    500: '#2E90FA',
    600: '#1570EF',
    700: '#175CD3',
    800: '#1849A9',
    900: '#194185',
    950: '#102A56',
  },
};
