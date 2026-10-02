export interface Product {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  promoPrice?: number;
  kitPrice: number; // Kit com 10 unidades
  image: string;
  badge?: string;
  weight: string;
  highlights: string[];
  ingredients: string[];
  calories: string;
  temperature: string;
  bestPairedWith: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'croissant-misto',
    name: 'Croissant Folhado Clássico',
    category: 'Massa Folhada Francesa',
    shortDesc: 'Massa folhada amanteigada ultra crocante, recheada com queijo derretido e presunto nobre.',
    fullDesc: 'Mais de 72 camadas de massa folhada feita com manteiga de primeira linha. Dourado por fora, macio e farto por dentro com queijo muçarela premium e presunto especial selecionado.',
    price: 14.90,
    kitPrice: 119.00,
    image: '/images/croissant-folhado-presunto-queijo.jpeg',
    badge: 'Mais Vendido ⭐',
    weight: '160g',
    highlights: ['72 dobras folhadas', 'Manteiga pura', 'Queijo derretido'],
    ingredients: ['Farinha de trigo especial', 'Manteiga pura 82% lipídios', 'Presunto nobre', 'Queijo muçarela', 'Gema caipira para dourar'],
    calories: '340 kcal',
    temperature: 'Servido bem quentinho e crocante',
    bestPairedWith: 'Café espresso ou cappuccino cremoso'
  },
  {
    id: 'folhado-frango-gergelim',
    name: 'Folhado Dourado de Frango Cremoso',
    category: 'Especialidade da Casa',
    shortDesc: 'Frango desfiado artesanal com tempero de ervas finas, massa folhada dourada e sementes de gergelim.',
    fullDesc: 'Uma obra de arte da panificação artesanal. Peito de frango suculento cozido lentamente com especiarias naturais, envolto em massa folhada leve e coberta com gergelim tostado aromático.',
    price: 15.90,
    kitPrice: 125.00,
    image: '/images/folhado-gourmet-frango-gergelim.jpeg',
    badge: 'Chef Choice 🔥',
    weight: '175g',
    highlights: ['Recheio farto de ponta a ponta', 'Crosta de gergelim', 'Ervas frescas'],
    ingredients: ['Peito de frango desfiado', 'Massa folhada artesanal', 'Requeijão cremoso', 'Gergelim tostado', 'Ervas aromáticas'],
    calories: '320 kcal',
    temperature: 'Crocância máxima ao sair do forno',
    bestPairedWith: 'Suco natural de laranja ou chá gelado'
  },
  {
    id: 'empadinha-frango-cremoso',
    name: 'Empadinha Gourmet Real de Frango',
    category: 'Tradição Artesanal',
    shortDesc: 'Massa podre tradicional que derrete delicadamente na boca com farto recheio de frango cremoso.',
    fullDesc: 'A verdadeira empada gourmet. Receita de família com massa amanteigada finíssima que se desfaz a cada mordida, recheada até a borda com peito de frango temperado e toque aveludado de requeijão.',
    price: 9.90,
    promoPrice: 8.90,
    kitPrice: 79.00,
    image: '/images/empadinha-gourmet-frango-cremoso.jpeg',
    badge: 'Derrete na Boca 🤤',
    weight: '120g',
    highlights: ['Massa podre perfeita', 'Sem caldo ralo, só frango', 'Requeijão legítimo'],
    ingredients: ['Massa amanteigada tradicional', 'Peito de frango selecionado', 'Requeijão culinário', 'Azeite de oliva extravirgem', 'Ervas frescas'],
    calories: '280 kcal',
    temperature: 'Quentinha com massa super macia',
    bestPairedWith: 'Café coado na hora ou espresso'
  },
  {
    id: 'esfiha-frango-dourada',
    name: 'Esfiha Assada Supremo de Frango',
    category: 'Assados Artesanais',
    shortDesc: 'Massa leve e fofinha com acabamento dourado e gergelim, recheada com frango desfiado bem temperado.',
    fullDesc: 'Massa assada com fermentação lenta de 24 horas para garantir leveza digestiva. Coberta com gergelim nobre e recheada com peito de frango desfiado úmido e suculento.',
    price: 10.90,
    kitPrice: 89.00,
    image: '/images/esfiha-assada-frango-dourada.jpeg',
    badge: 'Leve & Fofinha ✨',
    weight: '140g',
    highlights: ['Fermentação lenta 24h', 'Assada no ponto ouro', 'Massa macia'],
    ingredients: ['Farinha selecionada', 'Peito de frango artesanal', 'Gergelim branco e dourado', 'Cebola fresca', 'Especiarias árabes'],
    calories: '260 kcal',
    temperature: 'Macia e perfumada',
    bestPairedWith: 'Refrigerante gelado ou mate com limão'
  },
  {
    id: 'esfiha-carne-especial',
    name: 'Esfiha Assada Especial de Carne',
    category: 'Assados Artesanais',
    shortDesc: 'Carne bovina de primeira temperada com cebola fresca, tomate, especiarias e orégano.',
    fullDesc: 'Feita com corte bovino nobre moído na hora e temperado com limão fresco, tomate concassé, cebola roxa e orégano aromático sobre a massa fofa artesanalmente assada.',
    price: 11.90,
    kitPrice: 95.00,
    image: '/images/esfiha-assada-carne-especial.jpeg',
    badge: 'Receita Tradicional 🥩',
    weight: '140g',
    highlights: ['Carne nobre moída na hora', 'Toque de limão e orégano', 'Massa dourada artesanal'],
    ingredients: ['Carne bovina magra nobre', 'Tomate fresco', 'Cebola', 'Orégano selecionado', 'Limão tahiti', 'Massa assada leve'],
    calories: '275 kcal',
    temperature: 'Assada e suculenta',
    bestPairedWith: 'Guaraná bem gelado ou cerveja artesanal'
  }
];

export const COMBOS = [
  {
    id: 'combo-degustacao',
    title: 'Combo Degustação Gourmet',
    desc: '1 Croissant Folhado + 1 Folhado Frango + 1 Empadinha Real + 1 Refrigerante / Suco',
    items: ['1x Croissant Misto Folhado', '1x Folhado Frango Gergelim', '1x Empadinha Gourmet', '1x Bebida Gelada'],
    price: 34.90,
    originalPrice: 45.00,
    save: 'Economize R$ 10,10',
    popular: false,
    tag: 'Individual Premium'
  },
  {
    id: 'kit-festa-25',
    title: 'Caixa Festa Premium (25 Unidades)',
    desc: 'Mix perfeito para reuniões e aniversários: 5 Croissants + 5 Folhados Frango + 5 Empadas + 5 Esfihas Frango + 5 Esfihas Carne.',
    items: ['5x Croissant Misto', '5x Folhado Frango Gergelim', '5x Empadinhas Gourmet', '5x Esfihas Frango', '5x Esfihas Carne'],
    price: 199.00,
    originalPrice: 260.00,
    save: 'Economize R$ 61,00',
    popular: true,
    tag: 'O Mais Pedido 🎉'
  },
  {
    id: 'kit-banquete-50',
    title: 'Banquete Corporativo & Eventos (50 Unidades)',
    desc: '50 salgados artesanais de tamanho grande servidos quentinhos na caixa térmica personalizada com entrega pontual.',
    items: ['10x Croissant Misto', '10x Folhado Frango', '10x Empadinhas', '10x Esfihas Frango', '10x Esfihas Carne', 'Embalagem Térmica Grátis'],
    price: 369.00,
    originalPrice: 510.00,
    save: 'Economize R$ 141,00',
    popular: false,
    tag: 'Melhor Custo Benefício 👑'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Dra. Mariana Vasconcelos',
    role: 'Pediu para reunião de diretoria',
    comment: 'O croissant folhado e a empada foram os maiores sucessos no nosso evento de empresa! Massa levíssima, nada engordurada e com recheio de verdade. Todo mundo perguntou o contato!',
    rating: 5,
    location: 'São Paulo, SP'
  },
  {
    name: 'Carlos Eduardo Silveira',
    role: 'Cliente Fiel dos Fins de Semana',
    comment: 'A empadinha de frango derrete na boca de verdade! É difícil achar salgado hoje em dia que não seja pura massa com recheio micho. O Luís entrega qualidade de padaria 5 estrelas.',
    rating: 5,
    location: 'Campinas, SP'
  },
  {
    name: 'Juliana Mendes',
    role: 'Aniversário em família (Kit 50 un)',
    comment: 'Chegou tudo quentinho, crocante e na hora combinada. A esfiha de carne e o folhado de gergelim são simplesmente espetaculares. Já salvei o contato para todas as festas.',
    rating: 5,
    location: 'São Paulo, SP'
  }
];

export const FAQS = [
  {
    q: 'Como os salgados são entregues e chegam quentinhos?',
    a: 'Nossos salgados saem do forno poucos minutos antes do envio e são transportados em caixas térmicas reforçadas e seladas para garantir que a crocância e o calor permaneçam intactos até a sua mesa.'
  },
  {
    q: 'Com quanto tempo de antecedência preciso fazer meu pedido?',
    a: 'Para pedidos individuais ou lanches rápidos, atendemos via delivery em 30 a 50 minutos. Para caixas de festas e eventos (25 a 100+ unidades), recomendamos agendar com pelo menos 3 horas de antecedência ou no dia anterior.'
  },
  {
    q: 'Como posso reaquecer caso sobre para mais tarde?',
    a: 'Basta colocar no forno pré-aquecido a 180°C por 6 a 8 minutos, ou na Airfryer a 160°C por 4 a 5 minutos. Eles voltam a ficar com a casquinha 100% crocante como recém-saídos do forno! (Evite micro-ondas para preservar a textura folhada).'
  },
  {
    q: 'Quais são as formas de pagamento aceitas?',
    a: 'Aceitamos PIX com confirmação instantânea, Cartões de Crédito/Débito (levamos a maquininha ou link de pagamento seguro) e dinheiro.'
  },
  {
    q: 'Vocês atendem eventos corporativos e festas grandes?',
    a: 'Sim! Temos condições e valores especiais para grandes volumes com caixas térmicas personalizadas e faturamento para empresas se necessário.'
  }
];

export const WHATSAPP_PHONE = '5511999999999'; // Pode ser alterado facilmente
