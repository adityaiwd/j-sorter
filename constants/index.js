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
  'Cari cara yang menyenangkan dan interaktif untuk menyusun daftar member JKT48 favoritmu? Tidak perlu mencari lagi karena kami hadir dengan Game JKT48 Member Sorter! Dengan gameplay yang mudah dimengerti dan desain yang menarik, kamu bisa dengan mudah memilih member favoritmu dan melihat peringkat mereka dibandingkan dengan yang lainnya. Mulai bermain sekarang dan temukan member JKT48 yang benar-benar mencuri hatimu.';

export const twitterSeoDescription =
  'Temukan member JKT48 favoritmu dengan game interaktif JKT48 Member Sorter yang seru! Mainkan sekarang di jkt48membersorter.vercel.app dan temukan member JKT48 yang benar-benar mencuri hatimu. #JKT48 #JKT48MemberSorter #Game';
