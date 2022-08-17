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

export const statusOptions = [
  {
    value: 1,
    label: 'Active Members',
  },
  {
    value: 2,
    label: 'Graduated / Ex-members',
  },
  {
    value: 3,
    label: 'All Member',
  },
];

export const generationOptionsConst = [
  {
    value: 1,
    label: 'Gen 1',
  },
  {
    value: 2,
    label: 'Gen 2',
  },
  {
    value: 3,
    label: 'Gen 3',
    isActive: true,
  },
  {
    value: 4,
    label: 'Gen 4',
    isActive: true,
  },
  {
    value: 5,
    label: 'Gen 5',
  },
  {
    value: 6,
    label: 'Gen 6',
    isActive: true,
  },
  {
    value: 7,
    label: 'Gen 7',
    isActive: true,
  },
  {
    value: 8,
    label: 'Gen 8',
    isActive: true,
  },
  {
    value: 9,
    label: 'Gen 9',
    isActive: true,
  },
  {
    value: 10,
    label: 'Gen 10',
    isActive: true,
  },
];
