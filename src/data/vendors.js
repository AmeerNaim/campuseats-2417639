const vendors = [
  {
    id: 'warung-selera-timur',
    name: 'Warung Selera Timur',
    location: 'Mahallah Ali, Block A, Ground Floor',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'wst-1', name: 'Nasi Kerabu Ayam Percik', description: 'Blue herb rice with grilled spiced chicken and keropok', price: 8.5, category: 'Rice', available: true },
      { id: 'wst-2', name: 'Mee Celup Special', description: 'Savory Thai-style noodle soup with beef slices and lime', price: 6.5, category: 'Noodles', available: true },
      { id: 'wst-3', name: 'Teh Beng Madu', description: 'Creamy iced milk tea topped with sweet honey foam', price: 3.5, category: 'Drinks', available: false },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with spicy sambal, tempeh, and rice', price: 9.0, category: 'Rice', available: true },
      { id: 'ami-2', name: 'Char Kuey Teow Basah', description: 'Wok-fried flat noodles with prawns, cockles, and chives', price: 6.5, category: 'Noodles', available: true },
      { id: 'ami-3', name: 'Air Bandung Cincau', description: 'Chilled rose syrup milk topped with grass jelly strips', price: 3.0, category: 'Drinks', available: true },
    ],
  },
  {
    id: 'koppiku-corner',
    name: 'Koppiku & Toast Corner',
    location: 'KICT Courtyard, Level 1',
    openHours: '8:00 am - 6:00 pm',
    isOpen: true,
    menu: [
      { id: 'kop-1', name: 'Iced Spanish Latte', description: 'Rich double-shot Arabica espresso with sweetened condensed milk', price: 7.9, category: 'Coffee', available: true },
      { id: 'kop-2', name: 'Smoked Beef Croissant', description: 'Buttery flaky croissant stuffed with smoked beef and cheddar', price: 8.5, category: 'Bakery', available: true },
      { id: 'kop-3', name: 'Matcha Yuzu Fizz', description: 'Refreshing sparkling yuzu citrus topped with ceremonial matcha', price: 8.0, category: 'Drinks', available: true },
    ],
  },
  {
    id: 'hot-crunch-grill',
    name: 'Hot & Crunch Grill',
    location: 'Mahallah Faruq, Cafeteria Wing',
    openHours: '11:30 am - 10:30 pm',
    isOpen: false,
    menu: [
      { id: 'hcg-1', name: 'Spicy Fire Chicken Rice', description: 'Crispy fried chicken glazed in fiery chili sauce with cheese dip', price: 10.5, category: 'Rice', available: true },
      { id: 'hcg-2', name: 'Loaded Cheesy Fries', description: 'Golden crinkle-cut fries drizzled with nacho cheese and beef bits', price: 6.0, category: 'Snacks', available: true },
      { id: 'hcg-3', name: 'Sparkling Blue Lagoon', description: 'Chilled citrus blue curacao soda with fresh mint leaves', price: 4.0, category: 'Drinks', available: true },
    ],
  },
]

export default vendors