// Arbol jerárquico completo para el acordeón de categorías
// Arbol jerárquico completo para el acordeón de categorías (28 Categorías)
export const CATEGORY_TREE = [
  {
    id: 'cat-alimentos',
    name: 'Alimentos',
    subcategories: [
      { id: 'sub-alim-1', name: 'Lácteos y Huevos' },
      { id: 'sub-alim-2', name: 'Harinas y Cereales' },
      { id: 'sub-alim-3', name: 'Pasta y Granos' },
      { id: 'sub-alim-4', name: 'Salsas' },
      { id: 'sub-alim-5', name: 'Aceites, Vinagres y Condimentos' },
      { id: 'sub-alim-6', name: 'Azúcar, Reposteria y Mezclas' },
      { id: 'sub-alim-7', name: 'Chocolates y Dulces' },
      { id: 'sub-alim-8', name: 'Enlatados y Envasados' },
      { id: 'sub-alim-9', name: 'Galletas y Ponques' },
      { id: 'sub-alim-10', name: 'Snacks' },
      { id: 'sub-alim-11', name: 'Café e Infusiones' },
      { id: 'sub-alim-12', name: 'Caldos y Sopas' },
      { id: 'sub-alim-13', name: 'Sabores del Mundo' }
    ]
  },
  {
    id: 'cat-frutas-verduras',
    name: 'Frutas y Verduras',
    subcategories: [
      { id: 'sub-fv-1', name: 'Frutas' },
      { id: 'sub-fv-2', name: 'Vegetales y Verduras' },
      { id: 'sub-fv-3', name: 'Colonia Tovar' }
    ]
  },
  {
    id: 'cat-carniceria',
    name: 'Carnicería y Pescadería',
    subcategories: [
      { id: 'sub-carn-1', name: 'Res' },
      { id: 'sub-carn-2', name: 'Pollo' },
      { id: 'sub-carn-3', name: 'Pescados y Mariscos' },
      { id: 'sub-carn-4', name: 'Cerdo' },
      { id: 'sub-carn-5', name: 'Parrillera' },
      { id: 'sub-carn-6', name: 'Cordero y Otros' }
    ]
  },
  {
    id: 'cat-panaderia',
    name: 'Panadería, Pasteleria y Charcutería',
    subcategories: [
      { id: 'sub-pan-1', name: 'Quesos' },
      { id: 'sub-pan-2', name: 'Jamón y Tocinetas' },
      { id: 'sub-pan-3', name: 'Salchichas y Chorizos' },
      { id: 'sub-pan-4', name: 'Panes' },
      { id: 'sub-pan-5', name: 'Pastelería' },
      { id: 'sub-pan-6', name: 'Coffee Market' },
      { id: 'sub-pan-7', name: 'Tu Zona Market Bakery' }
    ]
  },
  {
    id: 'cat-farmacia',
    name: 'Farmacia',
    subcategories: [
      { id: 'sub-farm-1', name: 'Malestar General, Gripe y Tos' },
      { id: 'sub-farm-2', name: 'Dolor General Y Relajantes' },
      { id: 'sub-farm-3', name: 'Cuidados Digestivos' },
      { id: 'sub-farm-4', name: 'Materiales Médicos y Quirúrgicos' },
      { id: 'sub-farm-5', name: 'Dermatologicos y Cuidados Intimos' },
      { id: 'sub-farm-6', name: 'Medicamentos' },
      { id: 'sub-farm-7', name: 'Psicotrópicos' },
      { id: 'sub-farm-8', name: 'Estimulantes' },
      { id: 'sub-farm-9', name: 'Cuidado de la Vista y Lentes' }
    ]
  },
  {
    id: 'cat-limpieza',
    name: 'Limpieza y Hogar',
    subcategories: [
      { id: 'sub-limp-1', name: 'Desinfectantes y Multiusos' },
      { id: 'sub-limp-2', name: 'Lavado de Ropa' },
      { id: 'sub-limp-3', name: 'Papel' },
      { id: 'sub-limp-4', name: 'Lavaplatos' },
      { id: 'sub-limp-5', name: 'Utensilios para Limpieza' },
      { id: 'sub-limp-6', name: 'Bolsas y Descartables' },
      { id: 'sub-limp-7', name: 'Ambientadores e Insecticidas' },
      { id: 'sub-limp-8', name: 'Campamento' }
    ]
  },
  {
    id: 'cat-licoreria',
    name: 'Licoreria',
    subcategories: [
      { id: 'sub-lic-1', name: 'Cervezas' },
      { id: 'sub-lic-2', name: 'Vinos y Espumantes' },
      { id: 'sub-lic-3', name: 'Ron' },
      { id: 'sub-lic-4', name: 'Whisky' },
      { id: 'sub-lic-5', name: 'Destilados y Aperitivos' },
      { id: 'sub-lic-6', name: 'Coolers y Accesorios' }
    ]
  },
  {
    id: 'cat-bebidas',
    name: 'Bebidas',
    subcategories: [
      { id: 'sub-beb-1', name: 'Bebidas Gaseosas' },
      { id: 'sub-beb-2', name: 'Jugos, Tés y Energizantes' },
      { id: 'sub-beb-3', name: 'En Polvo' },
      { id: 'sub-beb-4', name: 'Aguas' }
    ]
  },
  {
    id: 'cat-cuidado-personal',
    name: 'Cuidado Personal',
    subcategories: [
      { id: 'sub-cp-1', name: 'Splash y Perfumes' },
      { id: 'sub-cp-2', name: 'Cuidado del Cabello' },
      { id: 'sub-cp-3', name: 'Cuidado Corporal' },
      { id: 'sub-cp-4', name: 'Cuidado Facial' },
      { id: 'sub-cp-5', name: 'Maquillaje' },
      { id: 'sub-cp-6', name: 'Cuidado de Manos, Pies y Uñas' },
      { id: 'sub-cp-7', name: 'Cuidado Intimo' },
      { id: 'sub-cp-8', name: 'Higiene Bucal' },
      { id: 'sub-cp-9', name: 'Afeitado y Depilación' }
    ]
  },
  {
    id: 'cat-recargas',
    name: 'Recargas de Saldo Celular',
    subcategories: [
      { id: 'sub-rec-1', name: 'Recarga Saldo Movistar' }
    ]
  },
  {
    id: 'cat-congelados',
    name: 'Congelados y Refrigerados',
    subcategories: [
      { id: 'sub-cong-1', name: 'Masas y Pasapalos' },
      { id: 'sub-cong-2', name: 'Fruta y Verdura' },
      { id: 'sub-cong-3', name: 'Listo para Servir' }
    ]
  },
  {
    id: 'cat-helados',
    name: 'Helados y Postres',
    subcategories: [
      { id: 'sub-hel-1', name: 'Helados' },
      { id: 'sub-hel-2', name: 'Postres' }
    ]
  },
  {
    id: 'cat-bebes',
    name: 'Bebes',
    subcategories: [
      { id: 'sub-beb-1', name: 'Higiene' },
      { id: 'sub-beb-2', name: 'Alimentación' },
      { id: 'sub-beb-3', name: 'Accesorios Para Niños' }
    ]
  },
  {
    id: 'cat-cigarros',
    name: 'Cigarros',
    subcategories: [
      { id: 'sub-cig-1', name: 'Cigarrillos' }
    ]
  },
  {
    id: 'cat-electronicos',
    name: 'Electrónicos',
    subcategories: [
      { id: 'sub-elec-1', name: 'Electrodomésticos' },
      { id: 'sub-elec-2', name: 'Cuidado y Belleza' },
      { id: 'sub-elec-3', name: 'Celulares, Tablets y Routers' },
      { id: 'sub-elec-4', name: 'Accesorios para Celulares' },
      { id: 'sub-elec-5', name: 'Linea Blanca' }
    ]
  },
  {
    id: 'cat-mascotas',
    name: 'Mascotas',
    subcategories: [
      { id: 'sub-masc-1', name: 'Alimento' },
      { id: 'sub-masc-2', name: 'Cuidado y Accesorios' },
      { id: 'sub-masc-3', name: 'Juguetes y Snacks' },
      { id: 'sub-masc-4', name: 'Medicamentos para Mascotas' }
    ]
  },
  {
    id: 'cat-importado',
    name: 'Importado',
    subcategories: [
      { id: 'sub-imp-1', name: 'Alimentos Importados' },
      { id: 'sub-imp-2', name: 'Enlatados Importados' },
      { id: 'sub-imp-3', name: 'Snacks Importados' },
      { id: 'sub-imp-4', name: 'Bebidas Importadas' },
      { id: 'sub-imp-5', name: 'Hogar y Limpieza Importados' },
      { id: 'sub-imp-6', name: 'Utensilios Importados' },
      { id: 'sub-imp-7', name: 'Ropa Importada' },
      { id: 'sub-imp-8', name: 'Cuidado Personal Importado' },
      { id: 'sub-imp-9', name: 'Belleza Importado' },
      { id: 'sub-imp-10', name: 'Medicinas Importadas' },
      { id: 'sub-imp-11', name: 'Empaques con detalle' },
      { id: 'sub-imp-12', name: 'Mascotas Importados' },
      { id: 'sub-imp-13', name: 'Vitaminas y Suplementos Importados' }
    ]
  },
  {
    id: 'cat-hogar',
    name: 'Hogar',
    subcategories: [
      { id: 'sub-hog-1', name: 'Cocina y Baño' },
      { id: 'sub-hog-2', name: 'Decoración' },
      { id: 'sub-hog-3', name: 'Iluminación y Pilas' }
    ]
  },
  {
    id: 'cat-ferreteria',
    name: 'Ferreteria',
    subcategories: [
      { id: 'sub-ferr-1', name: 'Construcción' },
      { id: 'sub-ferr-2', name: 'Herramientas' },
      { id: 'sub-ferr-3', name: 'Cerraduras y Seguridad' },
      { id: 'sub-ferr-4', name: 'Plomeria' },
      { id: 'sub-ferr-5', name: 'Electricidad' },
      { id: 'sub-ferr-6', name: 'Pinturas' }
    ]
  },
  {
    id: 'cat-saludable',
    name: 'Saludable',
    subcategories: [
      { id: 'sub-sal-1', name: 'Harinas y Pastas Saludable' },
      { id: 'sub-sal-2', name: 'Aceites Saludables' },
      { id: 'sub-sal-3', name: 'Bebidas Saludables' },
      { id: 'sub-sal-4', name: 'Granos Saludables' },
      { id: 'sub-sal-5', name: 'Snack y Frutos Secos' },
      { id: 'sub-sal-6', name: 'Cereales y Granolas Saludables' },
      { id: 'sub-sal-7', name: 'Enlatados Saludables' },
      { id: 'sub-sal-8', name: 'Untables Saludables' },
      { id: 'sub-sal-9', name: 'Listo para Servir Saludable' },
      { id: 'sub-sal-10', name: 'Salsas y Condimentos Saludables' },
      { id: 'sub-sal-11', name: 'Endulzantes' },
      { id: 'sub-sal-12', name: 'Postres Saludables' }
    ]
  },
  {
    id: 'cat-papeleria',
    name: 'Papelería',
    subcategories: [
      { id: 'sub-pap-1', name: 'Oficina' },
      { id: 'sub-pap-2', name: 'Librería' }
    ]
  },
  {
    id: 'cat-jugueteria',
    name: 'Juguetería y Fiesta',
    subcategories: [
      { id: 'sub-jug-1', name: 'Juguete' },
      { id: 'sub-jug-2', name: 'Fiesta' }
    ]
  },
  {
    id: 'cat-automotriz',
    name: 'Automotriz',
    subcategories: [
      { id: 'sub-auto-1', name: 'Lubricantes y Fluidos' },
      { id: 'sub-auto-2', name: 'Baterias' },
      { id: 'sub-auto-3', name: 'Repuestos y Cuidado' },
      { id: 'sub-auto-4', name: 'Cauchos' }
    ]
  },
  {
    id: 'cat-deportes',
    name: 'Deportes',
    subcategories: [
      { id: 'sub-dep-1', name: 'Implementos' },
      { id: 'sub-dep-2', name: 'Accesorios' },
      { id: 'sub-dep-3', name: 'Suplementos' }
    ]
  },
  {
    id: 'cat-ropa',
    name: 'Ropa y Accesorios',
    subcategories: [
      { id: 'sub-rop-1', name: 'Calzados' },
      { id: 'sub-rop-2', name: 'Top Caballero' },
      { id: 'sub-rop-3', name: 'Bolsos y Accesorios' },
      { id: 'sub-rop-4', name: 'Gorras y Sombreros' }
    ]
  },
  {
    id: 'cat-delicatessen',
    name: 'Delicatessen',
    subcategories: []
  },
  {
    id: 'cat-navidad',
    name: 'Navidad',
    subcategories: [
      { id: 'sub-nav-1', name: 'Navidad Articulos' },
      { id: 'sub-nav-2', name: 'Sabores de Navidad' }
    ]
  },
  {
    id: 'cat-italiano',
    name: 'Bodegón Italiano',
    subcategories: [
      { id: 'sub-ita-1', name: 'Salsas Italianas' },
      { id: 'sub-ita-2', name: 'Aceites Italianos' },
      { id: 'sub-ita-3', name: 'Condimentos Italianos' },
      { id: 'sub-ita-4', name: 'Café e Infusiones Italianas' },
      { id: 'sub-ita-5', name: 'Charcuteria Italiana' },
      { id: 'sub-ita-6', name: 'Chocolates y Dulces Italianos' },
      { id: 'sub-ita-7', name: 'Enlatados Italianos' },
      { id: 'sub-ita-8', name: 'Galletas y Ponques Italianos' },
      { id: 'sub-ita-9', name: 'Snacks Italianos' },
      { id: 'sub-ita-10', name: 'Masas y Pasapalos Italianos' },
      { id: 'sub-ita-11', name: 'Pasta y Arroz Italiano' },
      { id: 'sub-ita-12', name: 'Licores y Bebidas Italianos' },
      { id: 'sub-ita-13', name: 'Vinagres Italianos' },
      { id: 'sub-ita-14', name: 'Harinas Italianas' },
      { id: 'sub-ita-15', name: 'Mermeladas y Siropes Italianos' },
      { id: 'sub-ita-16', name: 'Untables Italianos' },
      { id: 'sub-ita-17', name: 'Pescaderia Italiana' }
    ]
  }
];

// Lista simple de categorías para el Navbar
export const CATEGORIES = [
  { id: 'all', name: 'Todos los productos' },
  ...CATEGORY_TREE.map((c) => ({ id: c.id, name: c.name }))
];

// Banners Principales del Slider Superior
export const MAIN_BANNERS = [
  {
    id: 1,
    title: 'Manicure + Pedicure Express',
    subtitle: 'Tiempo récord de una hora con café de cortesía',
    badge: 'Agrégalo en tu carrito con 10% OFF',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Ahorra en tus Compras de la Semana',
    subtitle: 'Las mejores ofertas en charcutería, frutas y víveres',
    badge: 'Precios Especiales',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80'
  }
];

// Cards Promocionales Destacadas
export const PROMO_CARDS = [
  {
    id: 1,
    title: '14% Detergente Optima',
    discount: '-14%',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Nuggets Del Corral',
    discount: '-10%',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Combo de Limpieza',
    discount: '-10%',
    image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Útiles Escolares y más',
    discount: 'Especial',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=80'
  }
];

// Banners para la grilla de "Supermercado"
export const SUPERMARKET_BANNERS = [
  { id: 1, name: 'Alimentos', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Frutas y Verduras', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Carnicería y Pescadería', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Panadería, Pasteleria y Charcutería', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Farmacia', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Limpieza y Hogar', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Licoreria', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80' },
  { id: 9, name: 'Cuidado Personal', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80' },
  { id: 10, name: 'Recargas de Saldo Celular', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80' },
  { id: 11, name: 'Congelados y Refrigerados', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80' },
  { id: 12, name: 'Helados y Postres', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&auto=format&fit=crop&q=80' },
  { id: 13, name: 'Bebes', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80' },
  { id: 14, name: 'Cigarros', image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=800&auto=format&fit=crop&q=80' },
  { id: 15, name: 'Electrónicos', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80' },
  { id: 16, name: 'Mascotas', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80' },
  { id: 17, name: 'Importado', image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80' },
  { id: 18, name: 'Hogar', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80' },
  { id: 19, name: 'Ferreteria', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80' },
  { id: 20, name: 'Saludable', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80' },
  { id: 21, name: 'Papelería', image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&auto=format&fit=crop&q=80' },
  { id: 22, name: 'Juguetería y Fiesta', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80' },
  { id: 23, name: 'Automotriz', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80' },
  { id: 24, name: 'Deportes', image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80' },
  { id: 25, name: 'Ropa y Accesorios', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80' },
  { id: 26, name: 'Delicatessen', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80' },
  { id: 27, name: 'Navidad', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&q=80' },
  { id: 28, name: 'Bodegón Italiano', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80' }
];

// CATÁLOGO COMPLETO DE PRODUCTOS (AL MENOS 1 PRODUCTO POR CADA UNA DE LAS 28 CATEGORÍAS)
export const PRODUCTS = [
  // 1. Alimentos
  {
    id: 1,
    name: 'Harina de Maíz Blanco Precocida 1kg',
    category: 'Alimentos',
    subcategory: 'Harinas y Cereales',
    originalPriceUsd: 1.45,
    priceUsd: 1.25,
    discountPercentage: 14,
    primePriceUsd: 1.10,
    stock: 45,
    sku: 'ALIM-001',
    dimensions: '1kg',
    description: 'Harina de maíz blanco precocida ideal para la preparación de arepas y empanadas.',
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500&auto=format&fit=crop&q=80'
  },
  // 2. Frutas y Verduras
  {
    id: 2,
    name: 'Manzana Roja Red Delicious (Por kg)',
    category: 'Frutas y Verduras',
    subcategory: 'Frutas',
    originalPriceUsd: 3.50,
    priceUsd: 2.99,
    discountPercentage: 15,
    primePriceUsd: 2.70,
    stock: 40,
    sku: 'FRUT-001',
    dimensions: '1kg aprox.',
    description: 'Manzanas frescas, crujientes y muy dulces.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80'
  },
  // 3. Carnicería y Pescadería
  {
    id: 3,
    name: 'Pechuga de Pollo Fresca sin Piel (Por kg)',
    category: 'Carnicería y Pescadería',
    subcategory: 'Pollo',
    priceUsd: 4.80,
    primePriceUsd: 4.20,
    stock: 30,
    sku: 'CARN-001',
    dimensions: '1kg aprox.',
    description: 'Pechuga de pollo deshuesada y limpia de primera calidad.',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80'
  },
  // 4. Panadería, Pasteleria y Charcutería
  {
    id: 4,
    name: 'Queso Blanco Duro Criollo (500g)',
    category: 'Panadería, Pasteleria y Charcutería',
    subcategory: 'Quesos',
    originalPriceUsd: 4.20,
    priceUsd: 3.50,
    discountPercentage: 16,
    primePriceUsd: 3.10,
    stock: 25,
    sku: 'CHAR-001',
    dimensions: '500g',
    description: 'Queso blanco artesanal salado ideal para rallar.',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80'
  },
  // 5. Farmacia
  {
    id: 5,
    name: 'Alcohol Antiséptico 70% 500ml',
    category: 'Farmacia',
    subcategory: 'Materiales Médicos y Quirúrgicos',
    priceUsd: 1.80,
    primePriceUsd: 1.50,
    stock: 50,
    sku: 'FARM-001',
    dimensions: '500ml',
    description: 'Alcohol desinfectante de uso externo para curaciones e higiene.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80'
  },
  // 6. Limpieza y Hogar
  {
    id: 6,
    name: 'Detergente Multiuso en Polvo 1kg',
    category: 'Limpieza y Hogar',
    subcategory: 'Lavado de Ropa',
    originalPriceUsd: 3.15,
    priceUsd: 2.70,
    discountPercentage: 14,
    primePriceUsd: 2.40,
    stock: 35,
    sku: 'LIMP-001',
    dimensions: '1kg',
    description: 'Detergente con partículas cortagrasa para todo tipo de ropa.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80'
  },
  // 7. Licoreria
  {
    id: 7,
    name: 'Ron Añejo Reserva 750ml',
    category: 'Licoreria',
    subcategory: 'Ron',
    priceUsd: 12.50,
    primePriceUsd: 10.99,
    stock: 15,
    sku: 'LICO-001',
    dimensions: '750ml',
    description: 'Ron de barrica de roble con suave aroma a madera y vainilla.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&auto=format&fit=crop&q=80'
  },
  // 8. Bebidas
  {
    id: 8,
    name: 'Refresco Cola Sabor Original 2L',
    category: 'Bebidas',
    subcategory: 'Bebidas Gaseosas',
    priceUsd: 2.00,
    primePriceUsd: 1.75,
    stock: 50,
    sku: 'BEB-001',
    dimensions: '2 Litros',
    description: 'Refresco efervescente clásico para tus reuniones.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80'
  },
  // 9. Cuidado Personal
  {
    id: 9,
    name: 'Champú Restauración Profunda 400ml',
    category: 'Cuidado Personal',
    subcategory: 'Cuidado del Cabello',
    originalPriceUsd: 5.20,
    priceUsd: 4.50,
    discountPercentage: 13,
    primePriceUsd: 3.99,
    stock: 20,
    sku: 'CUID-001',
    dimensions: '400ml',
    description: 'Enriquecido con aceites naturales para cabello seco.',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80'
  },
  // 10. Recargas de Saldo Celular
  {
    id: 10,
    name: 'Recarga Digital Movistar $5',
    category: 'Recargas de Saldo Celular',
    subcategory: 'Recarga Saldo Movistar',
    priceUsd: 5.00,
    primePriceUsd: 4.90,
    stock: 100,
    sku: 'RECA-001',
    dimensions: 'Digital',
    description: 'Acreditación inmediata de saldo para líneas móviles.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80'
  },
  // 11. Congelados y Refrigerados
  {
    id: 11,
    name: 'Tequeños de Queso Congelados (Pack 20 unid)',
    category: 'Congelados y Refrigerados',
    subcategory: 'Masas y Pasapalos',
    priceUsd: 4.50,
    primePriceUsd: 3.90,
    stock: 25,
    sku: 'CONG-001',
    dimensions: '20 unidades',
    description: 'Tequeños hojaldrados rellenos de queso blanco abundante.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80'
  },
  // 12. Helados y Postres
  {
    id: 12,
    name: 'Helado Cremoso de Mantecado 1L',
    category: 'Helados y Postres',
    subcategory: 'Helados',
    priceUsd: 3.80,
    primePriceUsd: 3.30,
    stock: 18,
    sku: 'HELA-001',
    dimensions: '1 Litro',
    description: 'Helado cremoso artesanal de vainilla tradicional.',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&auto=format&fit=crop&q=80'
  },
  // 13. Bebes
  {
    id: 13,
    name: 'Pañales Etapa 3 (Paquete 30 unid)',
    category: 'Bebes',
    subcategory: 'Higiene',
    priceUsd: 9.50,
    primePriceUsd: 8.70,
    stock: 30,
    sku: 'BEBE-001',
    dimensions: '30 unidades',
    description: 'Pañales ultra absorbentes con ajuste anatómico.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80'
  },
  // 14. Cigarros
  {
    id: 14,
    name: 'Cajetilla de Cigarrillos Mentolados 20s',
    category: 'Cigarros',
    subcategory: 'Cigarrillos',
    priceUsd: 3.20,
    primePriceUsd: 2.90,
    stock: 40,
    sku: 'CIGA-001',
    dimensions: '20 cigarrillos',
    description: 'Fórmula clásica refrescante.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&auto=format&fit=crop&q=80'
  },
  // 15. Electrónicos
  {
    id: 15,
    name: 'Audífonos Inalámbricos Bluetooth 5.0',
    category: 'Electrónicos',
    subcategory: 'Accesorios para Celulares',
    priceUsd: 14.99,
    primePriceUsd: 12.99,
    stock: 15,
    sku: 'ELEC-001',
    dimensions: 'Estuche compacto',
    description: 'Sonido HD con cancelación de ruido pasiva y batería duradera.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=80'
  },
  // 16. Mascotas
  {
    id: 16,
    name: 'Alimento Seco para Perros Adultos 2kg',
    category: 'Mascotas',
    subcategory: 'Alimento',
    priceUsd: 6.90,
    primePriceUsd: 5.99,
    stock: 22,
    sku: 'MASC-001',
    dimensions: '2kg',
    description: 'Sabor a carne y pollo con multivitaminas para la salud digestiva.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80'
  },
  // 17. Importado
  {
    id: 17,
    name: 'Chocolates Surtidos Importados 200g',
    category: 'Importado',
    subcategory: 'Snacks Importados',
    priceUsd: 5.50,
    primePriceUsd: 4.80,
    stock: 12,
    sku: 'IMPO-001',
    dimensions: '200g',
    description: 'Selección de bombones finos de chocolate con leche.',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80'
  },
  // 18. Hogar
  {
    id: 18,
    name: 'Sartén Antiadherente de Aluminio 24cm',
    category: 'Hogar',
    subcategory: 'Cocina y Baño',
    priceUsd: 8.90,
    primePriceUsd: 7.90,
    stock: 20,
    sku: 'HOGA-001',
    dimensions: '24cm',
    description: 'Sartén de teflón reforzado con mango térmico antideslizante.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80'
  },
  // 19. Ferreteria
  {
    id: 19,
    name: 'Juego de Destornilladores de Precisión (6 Pzas)',
    category: 'Ferreteria',
    subcategory: 'Herramientas',
    priceUsd: 4.20,
    primePriceUsd: 3.60,
    stock: 35,
    sku: 'FERR-001',
    dimensions: 'Set 6 piezas',
    description: 'Puntas magnéticas cromadas para reparación electrónica y mecánica.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'
  },
  // 20. Saludable
  {
    id: 20,
    name: 'Granola Orgánica con Miel y Frutos Secos 300g',
    category: 'Saludable',
    subcategory: 'Cereales y Granolas Saludables',
    priceUsd: 3.60,
    primePriceUsd: 3.10,
    stock: 25,
    sku: 'SALU-001',
    dimensions: '300g',
    description: 'Sin azúcar refinada añadida, rica en fibra y antioxidantes.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=80'
  },
  // 21. Papelería
  {
    id: 21,
    name: 'Cuaderno Espiral Carta 100 Hojas',
    category: 'Papelería',
    subcategory: 'Librería',
    priceUsd: 1.50,
    primePriceUsd: 1.20,
    stock: 60,
    sku: 'PAPE-001',
    dimensions: '100 Hojas',
    description: 'Hojas de alto gramaje con cuadrícula limpia para estudiantes y oficina.',
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=500&auto=format&fit=crop&q=80'
  },
  // 22. Juguetería y Fiesta
  {
    id: 22,
    name: 'Set de Globos Multicolores para Fiesta (50 Pzas)',
    category: 'Juguetería y Fiesta',
    subcategory: 'Fiesta',
    priceUsd: 2.20,
    primePriceUsd: 1.80,
    stock: 45,
    sku: 'JUGU-001',
    dimensions: '50 unidades',
    description: 'Globos de látex biodegradables de alta resistencia.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80'
  },
  // 23. Automotriz
  {
    id: 23,
    name: 'Aceite de Motor Semi-Sintético 15W-40 1L',
    category: 'Automotriz',
    subcategory: 'Lubricantes y Fluidos',
    priceUsd: 6.50,
    primePriceUsd: 5.80,
    stock: 28,
    sku: 'AUTO-001',
    dimensions: '1 Litro',
    description: 'Protección avanzada contra el desgaste y calor en motores a gasolina.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80'
  },
  // 24. Deportes
  {
    id: 24,
    name: 'Balón de Fútbol Profesional N° 5',
    category: 'Deportes',
    subcategory: 'Implementos',
    priceUsd: 11.90,
    primePriceUsd: 9.99,
    stock: 14,
    sku: 'DEPO-001',
    dimensions: 'Tamaño 5',
    description: 'Cubierta sintética cosida a mano ideal para césped y cancha dura.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80'
  },
  // 25. Ropa y Accesorios
  {
    id: 25,
    name: 'Franela de Algodón Cuello Redondo Hombre',
    category: 'Ropa y Accesorios',
    subcategory: 'Top Caballero',
    priceUsd: 7.50,
    primePriceUsd: 6.20,
    stock: 30,
    sku: 'ROPA-001',
    dimensions: 'Talla M',
    description: 'Algodón 100% transpirable de horma cómoda.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=80'
  },
  // 26. Delicatessen
  {
    id: 26,
    name: 'Aceitunas Verdes Rellenas de Pimentón 250g',
    category: 'Delicatessen',
    subcategory: 'Gourmet',
    priceUsd: 2.90,
    primePriceUsd: 2.50,
    stock: 20,
    sku: 'DELI-001',
    dimensions: '250g',
    description: 'Aceitunas españolas seleccionadas en salmuera aromática.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80'
  },
  // 27. Navidad
  {
    id: 27,
    name: 'Luces LED Navideñas Multicolores (100 Focos)',
    category: 'Navidad',
    subcategory: 'Navidad Articulos',
    priceUsd: 4.90,
    primePriceUsd: 3.99,
    stock: 40,
    sku: 'NAVI-001',
    dimensions: '8 metros',
    description: 'Serie de luces de bajo consumo con regulador de secuencias.',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500&auto=format&fit=crop&q=80'
  },
  // 28. Bodegón Italiano
  {
    id: 28,
    name: 'Salsa Passata de Tomate Italiano 700g',
    category: 'Bodegón Italiano',
    subcategory: 'Salsas Italianas',
    originalPriceUsd: 3.80,
    priceUsd: 3.10,
    discountPercentage: 18,
    primePriceUsd: 2.70,
    stock: 22,
    sku: 'ITAL-001',
    dimensions: '700g',
    description: 'Puré de tomate madurado al sol importado de Italia.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80'
  }
];