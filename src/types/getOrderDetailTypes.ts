export interface Order {
    id: number;
    udid: string | null;
    client_id: number;
    chat_id: string | null;
    region_id: number;
    type: number;
    system_type: string;
    name: string;
    phone: string;
    second_phone: string;
    third_phone: string;
    address_id: number;
    address: string;
    home: string;
    entrance: string;
    floor: string;
    apartment: string;
    door: string;
    door_image: string | null;
    is_apartment: number;
    has_elevator: number;
    latitude: string;
    longitude: string;
    is_location_changed: number;
    point: string;
    inn: number;
    organization: string | null;
    description: string;
    payment_method: string;
    payment_date: string | null;
    total_price: number;
    delivery_price: number;
    delivery_date: string;
    delivery_type: number;
    delivery_time: string | null;
    is_paid: number;
    transaction_id: string | null;
    card_id: string | null;
    cancel_reason: string | null;
    bill_file: string | null;
    state: number;
    driver_id: string | null;
    driver_status: string | null;
    paid: number;
    delivered_at: string | null;
    is_confirmed: number;
    confirmed_at: string | null;
    created_date: string;
    created_user: string | null;
    edited_user: string | null;
    edited_date: string | null;
  }
  
  export interface Item {
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    product_count: number;
    fact: number;
    product_price: number;
    total_price: number;
    description: string | null;
  }
  
  export interface OrderResponse {
    success: boolean;
    bottle: number;
    order: Order;
    items: Item[];
  }



  const response: OrderResponse = {
    success: true,
    bottle: 0,
    order: {
      id: 135268,
      udid: null,
      client_id: 104078,
      chat_id: null,
      region_id: 4980,
      type: 1,
      system_type: "Web",
      name: "Abdulloh",
      phone: "998935077000",
      second_phone: "",
      third_phone: "",
      address_id: 4980,
      address: "улица Шаршара, 97",
      home: "",
      entrance: "",
      floor: "",
      apartment: "",
      door: "",
      door_image: null,
      is_apartment: 0,
      has_elevator: 0,
      latitude: "",
      longitude: "",
      is_location_changed: 0,
      point: "",
      inn: 0,
      organization: null,
      description: "TEST ZAKAZ",
      payment_method: "Cash",
      payment_date: null,
      total_price: 283000,
      delivery_price: 0,
      delivery_date: "1970-01-01",
      delivery_type: 0,
      delivery_time: null,
      is_paid: 0,
      transaction_id: null,
      card_id: null,
      cancel_reason: null,
      bill_file: null,
      state: 2,
      driver_id: null,
      driver_status: null,
      paid: 0,
      delivered_at: null,
      is_confirmed: 0,
      confirmed_at: null,
      created_date: "2025-02-03 16:44:38",
      created_user: null,
      edited_user: null,
      edited_date: null,
    },
    items: [
      {
        id: 46409,
        order_id: 135268,
        product_id: 100004,
        product_name: "Ручка держатель Двойной",
        product_count: 9,
        fact: 0,
        product_price: 30000,
        total_price: 270000,
        description: null,
      },
      {
        id: 46410,
        order_id: 135268,
        product_id: 100002,
        product_name: "Вода 10л",
        product_count: 1,
        fact: 0,
        product_price: 13000,
        total_price: 13000,
        description: null,
      },
    ],
  };
  
  