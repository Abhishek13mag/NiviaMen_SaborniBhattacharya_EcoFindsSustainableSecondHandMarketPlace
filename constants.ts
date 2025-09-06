
import type { User, Product } from './types';
import { Category } from './types';

export const LOGO_URL = '/logo.jpg';

export const CATEGORIES = Object.values(Category);

export const INITIAL_USERS: User[] = [
    { id: 'user-1', username: 'Alice', email: 'alice@example.com', password: 'password123', image: 'https://picsum.photos/seed/alice/200' },
    { id: 'user-2', username: 'Bob', email: 'bob@example.com', password: 'password123', image: 'https://picsum.photos/seed/bob/200' },
];

export const INITIAL_PRODUCTS: Product[] = [
    {
        id: 'prod-1',
        title: 'Vintage Leather Jacket',
        description: 'A stylish and durable vintage leather jacket from the 80s. In great condition.',
        price: 75.00,
        category: Category.FASHION,
        imageUrls: [
            'https://picsum.photos/seed/jacket-front/600/400',
            'https://picsum.photos/seed/jacket-back/600/400',
            'https://picsum.photos/seed/jacket-detail/600/400'
        ],
        sellerId: 'user-2',
        quantity: 1,
        condition: "Used - Good",
        brand: "RetroStyle",
        model: "Classic Biker",
        dimensions: "N/A",
        weight: "1.5kg",
        material: "Leather",
        color: "Black",
        originalPackaging: false,
        manualIncluded: false,
        workingCondition: "Fully functional, minor wear on cuffs."
    },
    {
        id: 'prod-2',
        title: 'Used GoPro Hero 8',
        description: 'Slightly used GoPro Hero 8 action camera. Comes with all original accessories and packaging.',
        price: 220.50,
        category: Category.ELECTRONICS,
        imageUrls: [
            'https://picsum.photos/seed/gopro-main/600/400',
            'https://picsum.photos/seed/gopro-accessories/600/400',
            'https://picsum.photos/seed/gopro-in-box/600/400'
        ],
        sellerId: 'user-1',
        quantity: 1,
        condition: "Used - Like New",
        yearOfManufacture: 2020,
        brand: "GoPro",
        model: "Hero 8 Black",
        dimensions: "6.6cm x 4.8cm x 2.8cm",
        weight: "126g",
        material: "Plastic",
        color: "Black",
        originalPackaging: true,
        manualIncluded: true,
        workingCondition: "Perfect working order. No scratches on lens."
    },
    {
        id: 'prod-3',
        title: 'Antique Wooden Chair',
        description: 'A beautiful hand-carved wooden chair. Perfect as a decorative piece.',
        price: 120.00,
        category: Category.HOME_GARDEN,
        imageUrls: [
            'https://picsum.photos/seed/chair-front/600/400',
            'https://picsum.photos/seed/chair-side/600/400',
            'https://picsum.photos/seed/chair-carving/600/400'
        ],
        sellerId: 'user-2',
        quantity: 1,
        condition: "Used - Fair",
        brand: "Handmade",
        model: "N/A",
        dimensions: "90cm x 45cm x 45cm",
        weight: "5kg",
        material: "Oak Wood",
        color: "Dark Brown",
        originalPackaging: false,
        manualIncluded: false,
        workingCondition: "Structurally sound, has some cosmetic scratches due to age."
    },
    {
        id: 'prod-4',
        title: 'Complete Harry Potter Book Set',
        description: 'Hardcover set of all 7 Harry Potter books. Minimal wear and tear.',
        price: 90.00,
        category: Category.BOOKS_MEDIA,
        imageUrls: [
            'https://picsum.photos/seed/books-set/600/400',
            'https://picsum.photos/seed/books-spines/600/400',
            'https://picsum.photos/seed/books-open/600/400'
        ],
        sellerId: 'user-1',
        quantity: 1,
        condition: "Used - Very Good",
        brand: "Scholastic",
        model: "Hardcover Box Set",
        dimensions: "25cm x 15cm x 20cm",
        weight: "4kg",
        material: "Paper",
        color: "Multicolor",
        originalPackaging: true,
        manualIncluded: false,
        workingCondition: "All pages intact, spines are in great shape."
    },
    {
        id: 'prod-5',
        title: 'Abstract Canvas Painting',
        description: 'A large, modern abstract painting on canvas. Perfect for a living room centerpiece.',
        price: 180.00,
        category: Category.COLLECTIBLES_ART,
        imageUrls: [
            'https://picsum.photos/seed/painting-main/600/400',
            'https://picsum.photos/seed/painting-detail/600/400'
        ],
        sellerId: 'user-2',
        quantity: 1,
        condition: "Used - Good",
        brand: "Unknown Artist",
        model: "N/A",
        dimensions: "120cm x 80cm",
        weight: "3kg",
        material: "Canvas, Acrylic",
        color: "Blue, Gold",
        originalPackaging: false,
        manualIncluded: false,
        workingCondition: "Excellent condition."
    },
    {
        id: 'prod-6',
        title: 'RC Hobby Car',
        description: 'A fast and fun remote control car for hobbyists. Includes battery and charger.',
        price: 150.00,
        category: Category.HOBBIES,
        imageUrls: [
            'https://picsum.photos/seed/rccar-action/600/400',
            'https://picsum.photos/seed/rccar-remote/600/400',
            'https://picsum.photos/seed/rccar-side/600/400'
        ],
        sellerId: 'user-1',
        quantity: 1,
        condition: "Used - Like New",
        brand: "Traxxas",
        model: "Slash 4x4",
        dimensions: "56cm x 29cm x 19cm",
        weight: "2.6kg",
        material: "Plastic/Metal",
        color: "Red",
        originalPackaging: true,
        manualIncluded: true,
        workingCondition: "Tested and works perfectly."
    },
    {
        id: 'prod-7',
        title: 'Minimalist Desk Lamp',
        description: 'Modern and sleek LED desk lamp with adjustable brightness. Barely used.',
        price: 25.00,
        category: Category.HOME_GARDEN,
        imageUrls: [
            'https://picsum.photos/seed/lamp-on/600/400',
            'https://picsum.photos/seed/lamp-off/600/400'
        ],
        sellerId: 'user-1',
        quantity: 1,
        condition: "Used - Like New",
        brand: "Unbranded",
        model: "LED-101",
        dimensions: "40cm height",
        weight: "500g",
        material: "Aluminum",
        color: "Silver",
        originalPackaging: false,
        manualIncluded: false,
        workingCondition: "Works perfectly."
    },
    {
        id: 'prod-8',
        title: 'Designer Sunglasses',
        description: 'Stylish sunglasses with UV protection. No scratches on the lenses.',
        price: 85.00,
        category: Category.FASHION,
        imageUrls: [
            'https://picsum.photos/seed/sunglasses-main/600/400',
            'https://picsum.photos/seed/sunglasses-case/600/400',
            'https://picsum.photos/seed/sunglasses-side/600/400'
        ],
        sellerId: 'user-2',
        quantity: 1,
        condition: "Used - Very Good",
        brand: "Ray-Ban",
        model: "Aviator",
        dimensions: "N/A",
        weight: "31g",
        material: "Metal",
        color: "Gold",
        originalPackaging: true,
        manualIncluded: false,
        workingCondition: "Excellent condition, no flaws."
    },
];