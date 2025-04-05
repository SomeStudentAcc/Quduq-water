export interface UserData {
    author_id: string 
    birthdate: string;
    bottle: number;
    cashback: string;
    credit: string;
    date: string;
    description: string
    first_name: string;
    full_name: string;
    gender: number;
    id: number;
    info: string 
    is_active: number;
    is_blocked: number;
    is_moderated: number;
    last_name: string;
    last_order_date: string 
    last_visit: string;
    moderated: string 
    moderated_at: string 
    parent_id: string 
    passport_image: string 
    passport_serial: string;
    price_list_id: number;
    second_name: string;
    system: string;
    type: string;
  }

  export interface Phone {
    number: string;
  }

  export interface IGetMe{
    data: UserData;
    phones: Phone[]
  }
  