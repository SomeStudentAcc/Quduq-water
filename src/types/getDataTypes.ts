export interface IFAQ {
  id: number;
  question: string;
  question_uz: string;
  question_en: string;
  answer: string;
  answer_en: string;
  answer_uz: string;
}

export interface INews {
  id: number;
  image: string;
  text_en: string;
  text_ru: string;
  text_uz: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  url: string;
}

export interface IProduct {
  id: number;
  name: string;
  name_en: string;
  amount: number;
  name_uz: string;
  unit: string;
  unit_en: string;
  unit_uz: string;
  description: string;
  description_en: string;
  description_uz: string;
  image: string;
  product_count?: number;
  product_name?: string;
  product_price?: number;

  position: number;
  price: number;
  max_count: number;
  min_count: number;
  is_app: number;
  is_telegram: number;
  is_web: number;
}

export interface ISlider {
  id: number;
  url: string;
  category: null | string;
  brand: null | string;
  name: string;
  name_en: string;
  name_uz: string;
  description: string;
  description_en: string;
  description_uz: string;
  image: string;
  image_en: string | null;
  image_uz: string | null;
  mobile_image: string | null;
  mobile_image_en: string | null;
  mobile_image_uz: string | null;
  position: number;
}
export interface IRegion {
  id: number;
  name: string;
}

export type Payments = {
  Cash: string;
  Octo: string;
  Transfer: string;
};
export type IPages = {
  id: number;
  title_en: string;
  title_ru: string;
  title_uz: string;
  url: string;
};

export type OrderStatus = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
};

export interface IGetData {
  faq: IFAQ[];
  news: INews[];
  products: IProduct[];
  sliders: ISlider[];
  payments: Payments;
  regions: IRegion[];
  statuses: OrderStatus;
  pages: IPages[];

  call_center_phone: string;
}
