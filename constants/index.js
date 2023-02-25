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

export const seoDescription =
  "Looking for a fun and interactive way to sort your favorite JKT48 members? Look no further than our JKT48 Member Sorter! With intuitive gameplay and sleek design, you'll be able to easily select your top members and see how they rank against the rest. Start playing now and discover which JKT48 member truly captures your heart.";

export const twitterSeoDescription =
  'Explore and discover your favorite JKT48 members with our fun and interactive JKT48 Member Sorter game! Play now at jkt48membersorter.vercel.app and discover which JKT48 member truly captures your heart. #JKT48 #JKT48MemberSorter #Game';
