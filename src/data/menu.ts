export interface CustomizationOption {
  name: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  type: 'select' | 'checkbox';
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  preparationTime: number; // in minutes
  isVegetarian: boolean;
  isBestseller?: boolean;
  customization: CustomizationGroup[];
}

export const menuItems: MenuItem[] = [
  {
    id: 'burger-classic',
    name: 'Classic Cheeseburger',
    description: 'Juicy flame-grilled beef patty, melted cheddar, pickles, onions, lettuce, and our signature Steward sauce on a toasted brioche bun.',
    price: 249,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    preparationTime: 8,
    isVegetarian: false,
    isBestseller: true,
    customization: [
      {
        id: 'size',
        name: 'Choose Size',
        type: 'select',
        options: [
          { name: 'Regular Patty', price: 0 },
          { name: 'Double Patty', price: 80 }
        ]
      },
      {
        id: 'cheese',
        name: 'Cheese Option',
        type: 'select',
        options: [
          { name: 'Cheddar Cheese', price: 0 },
          { name: 'Extra Cheddar', price: 30 },
          { name: 'No Cheese', price: 0 }
        ]
      },
      {
        id: 'extras',
        name: 'Add Extras',
        type: 'checkbox',
        options: [
          { name: 'Crispy Bacon', price: 45 },
          { name: 'Sliced Jalapeños', price: 20 },
          { name: 'Extra Sauce', price: 15 }
        ]
      }
    ]
  },
  {
    id: 'burger-spicy-veg',
    name: 'Spicy Paneer Burger',
    description: 'Crispy fried cottage cheese patty coated in spicy marinade, topped with tandoori mayo, shredded lettuce, and sliced jalapeños.',
    price: 199,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80',
    preparationTime: 7,
    isVegetarian: true,
    customization: [
      {
        id: 'size',
        name: 'Choose Size',
        type: 'select',
        options: [
          { name: 'Regular Size', price: 0 },
          { name: 'Large Size (Extra Paneer)', price: 60 }
        ]
      },
      {
        id: 'extras',
        name: 'Add Extras',
        type: 'checkbox',
        options: [
          { name: 'Extra Slice Cheese', price: 30 },
          { name: 'Extra Spicy Mayo', price: 15 },
          { name: 'Pickled Gherkins', price: 15 }
        ]
      }
    ]
  },
  {
    id: 'burger-crispy-chicken',
    name: 'Crispy Chicken Burger',
    description: 'Crispy golden chicken breast fillet, creamy ranch dressing, fresh tomato slice, and crisp lettuce on a toasted sesame bun.',
    price: 229,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    preparationTime: 9,
    isVegetarian: false,
    isBestseller: true,
    customization: [
      {
        id: 'size',
        name: 'Choose Size',
        type: 'select',
        options: [
          { name: 'Single Fillet', price: 0 },
          { name: 'Double Fillet', price: 99 }
        ]
      },
      {
        id: 'extras',
        name: 'Add Extras',
        type: 'checkbox',
        options: [
          { name: 'Melted Cheese Slice', price: 30 },
          { name: 'Sautéed Mushrooms', price: 35 },
          { name: 'Crispy Onion Straws', price: 20 }
        ]
      }
    ]
  },
  {
    id: 'chicken-wings',
    name: 'Fiery BBQ Wings',
    description: 'Tender chicken wings tossed in our sweet and smoky honey BBQ sauce, served with celery sticks and blue cheese dip.',
    price: 279,
    category: 'Chicken',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80',
    preparationTime: 10,
    isVegetarian: false,
    customization: [
      {
        id: 'portion',
        name: 'Portion Size',
        type: 'select',
        options: [
          { name: '6 Pieces', price: 0 },
          { name: '12 Pieces', price: 199 }
        ]
      },
      {
        id: 'sauce',
        name: 'Extra Sauce Style',
        type: 'select',
        options: [
          { name: 'No Extra Sauce', price: 0 },
          { name: 'Spicy Buffalo Drizzle', price: 20 },
          { name: 'Creamy Ranch', price: 25 }
        ]
      }
    ]
  },
  {
    id: 'chicken-tenders',
    name: 'Crispy Chicken Tenders',
    description: 'Hand-breaded premium chicken breast strips fried to a perfect golden brown. Served with a honey mustard dipping sauce.',
    price: 219,
    category: 'Chicken',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    preparationTime: 6,
    isVegetarian: false,
    customization: [
      {
        id: 'portion',
        name: 'Portion Size',
        type: 'select',
        options: [
          { name: '4 Pieces', price: 0 },
          { name: '8 Pieces', price: 160 }
        ]
      },
      {
        id: 'dipping',
        name: 'Dipping Sauces',
        type: 'checkbox',
        options: [
          { name: 'Honey Mustard Dip', price: 0 },
          { name: 'Smoky BBQ Sauce', price: 15 },
          { name: 'Garlic Aioli', price: 20 }
        ]
      }
    ]
  },
  {
    id: 'fries-loaded',
    name: 'Steward Loaded Fries',
    description: 'Golden fries smothered in cheese sauce, chopped crispy bacon, spring onions, and a drizzle of spicy jalapeño cream.',
    price: 179,
    category: 'Fries & Sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    preparationTime: 5,
    isVegetarian: false,
    isBestseller: true,
    customization: [
      {
        id: 'size',
        name: 'Portion Size',
        type: 'select',
        options: [
          { name: 'Regular Size', price: 0 },
          { name: 'Monster Size (Double Fries)', price: 70 }
        ]
      },
      {
        id: 'style',
        name: 'Vegetarian Mode',
        type: 'select',
        options: [
          { name: 'Standard (With Bacon)', price: 0 },
          { name: 'No Bacon (Veg-Friendly)', price: -30 }
        ]
      }
    ]
  },
  {
    id: 'sides-onion-rings',
    name: 'Beer-Battered Onion Rings',
    description: 'Thick-cut sweet white onions, hand-dipped in craft beer batter and fried until ultra-crisp. Served with chipotle mayo.',
    price: 139,
    category: 'Fries & Sides',
    image: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=600&q=80',
    preparationTime: 5,
    isVegetarian: true,
    customization: [
      {
        id: 'size',
        name: 'Choose Size',
        type: 'select',
        options: [
          { name: 'Regular Ring Cup', price: 0 },
          { name: 'Large Share Box', price: 50 }
        ]
      }
    ]
  },
  {
    id: 'wrap-spicy-chicken',
    name: 'Spicy Chicken Wrap',
    description: 'Sliced crispy chicken tenders, hot pepper sauce, shredded lettuce, tomatoes, and jack cheese wrapped in a warm flour tortilla.',
    price: 189,
    category: 'Wraps',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=600&q=80',
    preparationTime: 6,
    isVegetarian: false,
    customization: [
      {
        id: 'size',
        name: 'Wrap Size',
        type: 'select',
        options: [
          { name: 'Standard Wrap', price: 0 },
          { name: 'Jumbo Wrap (Extra Fill)', price: 40 }
        ]
      },
      {
        id: 'cheese',
        name: 'Cheese Add-on',
        type: 'select',
        options: [
          { name: 'Cheddar Blend', price: 0 },
          { name: 'No Cheese', price: 0 },
          { name: 'Double Cheese', price: 30 }
        ]
      }
    ]
  },
  {
    id: 'wrap-garden-veg',
    name: 'Garden Veggie Wrap',
    description: 'Crispy falafel, hummus, cucumber slices, roasted bell peppers, feta cheese, and mixed greens in a spinach tortilla.',
    price: 169,
    category: 'Wraps',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=600&q=80', // Fallback Unsplash wrap URL
    preparationTime: 6,
    isVegetarian: true,
    customization: [
      {
        id: 'extras',
        name: 'Add Extras',
        type: 'checkbox',
        options: [
          { name: 'Extra Hummus', price: 20 },
          { name: 'Sliced Avocado', price: 40 },
          { name: 'Olives & Jalapeños', price: 25 }
        ]
      }
    ]
  },
  {
    id: 'beverage-shake',
    name: 'Double Chocolate Shake',
    description: 'Rich and creamy premium Belgian chocolate ice cream blended with dark chocolate sauce, topped with fresh whipped cream.',
    price: 149,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    preparationTime: 4,
    isVegetarian: true,
    isBestseller: true,
    customization: [
      {
        id: 'size',
        name: 'Cup Size',
        type: 'select',
        options: [
          { name: 'Medium Glass (350ml)', price: 0 },
          { name: 'Large Glass (500ml)', price: 35 }
        ]
      },
      {
        id: 'toppings',
        name: 'Add Toppings',
        type: 'checkbox',
        options: [
          { name: 'Extra Whipped Cream', price: 20 },
          { name: 'Chocolate Sprinkles', price: 15 },
          { name: 'Crushed Oreos', price: 30 }
        ]
      }
    ]
  },
  {
    id: 'beverage-cola',
    name: 'Steward Iced Fountain Cola',
    description: 'Refreshing classic fountain cola served over crushed ice. The perfect companion to any burger combo.',
    price: 89,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    preparationTime: 2,
    isVegetarian: true,
    customization: [
      {
        id: 'size',
        name: 'Size',
        type: 'select',
        options: [
          { name: 'Medium (400ml)', price: 0 },
          { name: 'Large (600ml)', price: 25 }
        ]
      },
      {
        id: 'ice',
        name: 'Ice Level',
        type: 'select',
        options: [
          { name: 'Normal Ice', price: 0 },
          { name: 'No Ice', price: 0 },
          { name: 'Extra Ice', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'dessert-apple-pie',
    name: 'Hot Apple Crumble Pie',
    description: 'Flaky golden pastry filled with spiced warm cinnamon apples, served with a scoop of premium vanilla bean ice cream.',
    price: 159,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    preparationTime: 6,
    isVegetarian: true,
    customization: [
      {
        id: 'upgrade',
        name: 'Add Extra Scoop',
        type: 'select',
        options: [
          { name: 'Vanilla Ice Cream', price: 0 },
          { name: 'Caramel Ice Cream Upgrade', price: 25 },
          { name: 'Double Scoop', price: 40 }
        ]
      }
    ]
  },
  {
    id: 'combo-classic',
    name: 'Classic Burger Meal Combo',
    description: 'The ultimate Steward meal. A Classic Cheeseburger, a serving of Hot French Fries, and a large Iced Fountain Cola.',
    price: 399,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80',
    preparationTime: 9,
    isVegetarian: false,
    isBestseller: true,
    customization: [
      {
        id: 'burger_upgrade',
        name: 'Burger Upgrade',
        type: 'select',
        options: [
          { name: 'Standard Cheeseburger', price: 0 },
          { name: 'Upgrade to Crispy Chicken', price: 30 }
        ]
      },
      {
        id: 'fries_size',
        name: 'Upgrade Fries Size',
        type: 'select',
        options: [
          { name: 'Medium Fries', price: 0 },
          { name: 'Large Loaded Fries Upgrade', price: 50 }
        ]
      },
      {
        id: 'drink_selection',
        name: 'Choose Beverage',
        type: 'select',
        options: [
          { name: 'Fountain Cola', price: 0 },
          { name: 'Double Chocolate Shake', price: 45 },
          { name: 'Diet Cola', price: 0 }
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  'All',
  'Burgers',
  'Chicken',
  'Fries & Sides',
  'Wraps',
  'Beverages',
  'Desserts',
  'Combos'
];
