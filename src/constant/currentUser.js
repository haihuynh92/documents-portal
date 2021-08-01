export const CURRENT_USER = 'CURRENT_USER';
export const LIMIT_ITEM = 2;
export const ROLE = {
  ADMIN: 'admin',
  NOI_BO: 'sonoibo',
  SO_KHACH: 'sokhach',
  SO_MAY: 'somay',
  SO_KET: 'soket'
};
export const CONFIG_SIDEBAR = {
  DASHBOARDB: ['Dashboard'],
  MA_HANG: ['Mã hàng', 'MH'],
  CO_SO_MAY: ['Cơ sở may', 'SM'],
  SO_CAT: ['Sổ cắt', 'SC'],
  SO_LUONG_TRINH: ['sổ lương Trinh', 'TR'],
  SO_LUONG_DONG: ['sổ lương Đông', 'DO'],
  SO_LUONG_PHIEN: ['sổ lương Phiên', 'PH'],
  SO_LUONG_SI: ['sổ lương Sĩ', 'SI'],
  SO_LUONG_HANH: ['sổ lương Hạnh', 'HA'],
  SO_LUONG_HOANG: ['sổ lương Hoàng', 'HO'],
  SO_LUONG_NGUYET: ['sổ lương Nguyện', 'NG'],
  SO_LUONG_QUE: ['sổ lương Quế', 'QU'],
  SO_LUONG_KY: ['sổ lương Kỳ', 'KY'],
  SO_LUONG_DUONG: ['sổ lương Dương', 'DU'],
  SO_HANG_THUY: ['sổ Hằng Thùy', 'HT'],
  SO_HANG: ['sổ Hằng', 'HA'],
  SO_LINH: ['sổ Linh', 'LI'],
  SO_THAO: ['sổ Thảo', 'TH'],
  SO_LINHBAVAN: ['sổ Linh Ba Vân', 'LB'],
  SO_KIM: ['sổ Kim', 'KI'],
  SO_NGHI: ['sổ Nghị Em', 'NE'],
  SO_UT: ['sổ Út', 'UT'],
  SO_NGOC: ['sổ bác Ngọc', 'BN'],
  SO_NGUYET: ['sổ Nguyệt', 'NG'],
  SO_QUYEN: ['sổ Quyên', 'QU'],
  SO_DIEM: ['sổ Diễm', 'DI'],
  SO_CHU_SANH: ['sổ chú Sanh', 'SA'],
  SO_CHI_PHUONG: ['sổ chị Phượng', 'PH'],
  SO_CHI_DUYEN: ['sổ chị Duyên', 'DU'],
  SO_PHUONG_ANH: ['sổ Phương Anh', 'PA'],
  SO_CHI_HA: ['sổ chị Hà', 'HA'],
  SO_THUY_VINH: ['sổ Thủy Vịnh', 'TV'],
  SO_THUY_KET_CHAU: ['sổ Thủy kết châu', 'TH'],
  SO_CHI_TIM: ['sổ chị Tím', 'TI'],

};
export const CONFIG_MONEY = {
  default: 1000,
  standar: 26,
  totalHourPerDay: 9,
  tangca: 1.3,
  cn: 1.5,
  sunday: 7,
  tiencom: 22000
};
export const DATA_KH = [
  {
    name: 'sổ Hằng Thùy',
    value: 'sohangthuys'
  },
  {
    name: 'sổ Hằng',
    value: 'sohangs'
  },
  {
    name: 'sổ Linh',
    value: 'solinhs'
  },
  {
    name: 'sổ Thảo',
    value: 'sothaos'
  },
  {
    name: 'sổ Linh Ba Vân',
    value: 'solinhbavans'
  },
  {
    name: 'sổ Kim',
    value: 'sokims'
  },
  {
    name: 'sổ Nghị Em',
    value: 'songhis'
  },
  {
    name: 'sổ Út Minh',
    value: 'souts'
  },
  {
    name: 'sổ Bác Ngọc',
    value: 'songocs'
  }
];
export const DATA_SCS = [
  {
    name: 'sổ Nguyệt',
    value: 'songuyets'
  },
  {
    name: 'sổ Quyên',
    value: 'soquyens'
  },
  {
    name: 'sổ Diễm',
    value: 'sodiems'
  },
  {
    name: 'sổ chú Sanh',
    value: 'sochusanhs'
  },
  {
    name: 'sổ chị Phượng',
    value: 'sochiphuongs'
  },
  {
    name: 'sổ chị Duyên',
    value: 'sochiduyens'
  },
  {
    name: 'sổ Phương Anh',
    value: 'sophuonganhs'
  },
  {
    name: 'sổ chị Hà',
    value: 'sochihas'
  },
  {
    name: 'sổ Thủy Vịnh',
    value: 'sothuyvinhs'
  },
  {
    name: 'sổ Thủy kết châu',
    value: 'sothuyketchaus'
  },
  {
    name: 'sổ chị Tím',
    value: 'sochitims'
  }
];
export const DATA_SL = [
  {
    name: 'Trinh',
    value: 'sotienluongtrinhs',
    luongcoban: '6200000',
    tientrongnha: '1000000'
  },
  {
    name: 'Đông',
    value: 'sotienluongdongs',
    luongcoban: '6500000',
    tientrongnha: '1000000'
  },
  {
    name: 'Phiên',
    value: 'sotienluongphiens',
    luongcoban: '7700000',
    tientrongnha: ''
  },
  {
    name: 'Sĩ',
    value: 'sotienluongsis',
    luongcoban: '5000000',
    tientrongnha: '1000000'
  },
  {
    name: 'Hạnh',
    value: 'sotienluonghanhs',
    luongcoban: '5800000',
    tientrongnha: '1000000'
  },
  {
    name: 'Hoàng',
    value: 'sotienluonghoangs',
    luongcoban: '5000000',
    tientrongnha: ''
  },
  {
    name: 'Nguyệt',
    value: 'sotienluongnguyets',
    luongcoban: '6000000',
    tientrongnha: '1000000'
  },
  {
    name: 'Quế',
    value: 'sotienluongques',
    luongcoban: '5800000',
    tientrongnha: '1000000'
  },
  {
    name: 'Kỳ',
    value: 'sotienluongkys',
    luongcoban: '5000000',
    tientrongnha: '1000000'
  },
  {
    name: 'Dương',
    value: 'sotienluongduongs',
    luongcoban: '5000000',
    tientrongnha: '1000000'
  }
];
