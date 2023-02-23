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
export const MEMBERS_ONLY_STATUS = 2;
export const TRAINEE_ONLY_STATUS = 3;
export const GRADUATED_STATUS = 4;
export const ALL_STATUS = 5;

export const statusOptions = [
  {
    value: ACTIVE_STATUS,
    label: 'Active Members & Trainee',
  },
  {
    value: MEMBERS_ONLY_STATUS,
    label: 'Active Members Only',
  },
  {
    value: TRAINEE_ONLY_STATUS,
    label: 'Trainee Only',
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
