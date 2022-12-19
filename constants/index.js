const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const ACTIVE_STATUS = 1;
export const GRADUATED_STATUS = 2;
export const ALL_STATUS = 3;

export const statusOptions = [
  {
    value: ACTIVE_STATUS,
    label: 'Active Members',
  },
  {
    value: GRADUATED_STATUS,
    label: 'Graduated / Ex-members',
  },
  {
    value: ALL_STATUS,
    label: 'All Member',
  },
];

export const generationCopy = gen => {
  switch (gen) {
    case 1:
      return `${gen}st Generation`;
    case 2:
      return `${gen}nd Generation`;
    case 3:
      return `${gen}rd Generation`;
    default:
      return `${gen}th Generation`;
  }
};
