"use client"
import qs from 'query-string'
import { useEffect, useState } from "react"


export const  categories =[
  {
     title: "Téléphone & objets connectés",
     url: ""
  },
  {
    title: "Tv,Son,Photo",
    url: "/browse-products/Tv - Son - Photo"
 },
 {
    title: "Informatique & Gaming",
    url: "/browse-products/Electronics"
 },
 {
    title: "Electroménager",
    url: "/browse-products/Electroménager"
 },
 {
    title: "Maison - Cuisine - Déco",
    url: "/browse-products/Maison%20-%20Cuisine%20-%20Deco"
 },
 {
    title: "Beauté - Santé",
    url: "/browse-products/Beauté - Santé"
 },
 {
    title: "Vêtements - Chaussures - Bijoux - Accessoires",
    url: "/browse-products/vetements"
 },
 {
    title: "Bébé & Jouets",
    url: "/browse-products/Bébé & Jouets"
 },
 {
    title: "Sport",
    url: "/browse-products/sport"
 },
 
 {
    title: "Auto Moto",
    url: ""
 },
 {
    title: "Brico - Jardin - Animalerie",
    url: ""
 },
 {
    title: "Librairie",
    url: ""
 },
 {
    title: "Epicerie fine",
    url: ""
 },
];

export const footerCols2 = [
    'Engagements',
    'Modes et frais de livraison',
    'Politique de Retour',
    'Garantie',
    'Utiliser un coupon',
    'Assistance',
    'FAQ',
    'Accès espace vendeur'
]

export const footercols3 = [
    'CGU/CGV',
    'Données personnelles et cookies',
    'Mentions légales'
]


export const useCategoryNames = () => {
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const mediaQuery = window.matchMedia('(max-width: 768px)');
     setIsMobile(mediaQuery.matches);
 
     const handleMediaQueryChange = (event:any) => {
       setIsMobile(event.matches);
     };
 
     mediaQuery.addEventListener('change', handleMediaQueryChange);
     return () => {
       mediaQuery.removeEventListener('change', handleMediaQueryChange);
     };
   }, []);
 
   const categoryNames = [
     {
       id: "545458783212121",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_5__1.webp',
       name: 'Maison - Cuisine - Deco',
       imageBanner: isMobile
         ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_maison/output_image_30_.webp'
         : 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_maison/output_image_29_.webp',
     },
     {
       id: "545458783212121656565989845454545e4fdfdfdf",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_1.webp',
       name: 'Electronics',
       imageBanner: isMobile
         ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/BANNIERES-N1_mobile2-gaming.webp'
         : 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/SLIDE-N1-2-gaming.webp',
     },
     {
       id: "45554489663333660000zzdsdsd9890",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_6__1.webp',
       name :'Tv - Son - Photo',
       imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/Mobile_tv-son_image_22_.webp'  :  "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/desktiop_tv_son_image_21_.webp"
      
    },
   
    {
       id: "455544896633336600000",
       showcaseImage: 'https://www.marjanemall.ma/media/wysiwyg/category/n1_sport/Webp/output_image_12_.webp',
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_2__1.webp',
       name :'sport',
       imageBanner:  isMobile ? "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_sport/BANNIERES-N1_mobile8_image_22_.webp" : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_sport/SLIDE-N1-8-sport_image_21_.webp"
    },
    {
      
      name:"Electroménager",
      image:"/images/soso.webp",
      imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_elctromege/output_image_37_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_elctromege/output_image_36_.webp",
      id:"8989ef656565fdfd554dsoand45454545"
    },
    
    
    {
       id: "0022559694998989dfdfdfd",
       image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_8__1.webp',
       name :"Bébé & Jouets",
       imageBanner: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/BANNIERES-N1_mobile6-b_b_jouet_image_23_.webp" :  "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/SLIDE-N1-6-b_b_joeut_image_24_.webp"
    },

    {
     id: "0022559694454549889",
     image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_9__1.webp',
     name :'Beauté - Santé',
     imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_beaute/output_image_13_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_beaute/output_image_14_.webp"
  },
  
  {
     id: "0022559694",
     image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_7__1.webp',
     name :'vetements',
     imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_mode/output_image_26_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_mode/output_image_25_.webp"
  },
  {
    id: "002887iiuiuip2559694",
    image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_7__1.webp',
    name :'Brico - Jardin - Animalerie',
    imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bricolage/output_image_24_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bricolage/output_image_23_.webp"
 },
   ];
   // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bricolage/output_image_24_.webp">
 
   // Update the imageBanner property for each category based on isMobile
   const updatedCategoryNames = categoryNames.map(category => ({
     ...category,
   }));
 
   return updatedCategoryNames;
 };
 

 export const countryOptions = [
   { value: 'us', label: 'United States', },
   { value: 'ca', label: 'Canada' ,},
   { value: 'ma', label: 'Morocco' ,},
   { value: 'ar', label: 'Argentina' },
   { value: 'au', label: 'Australia' },
   { value: 'br', label: 'Brazil' },
   { value: 'cn', label: 'China' },
   { value: 'fr', label: 'France' },
   { value: 'de', label: 'Germany' },
   { value: 'in', label: 'India' },
   { value: 'id', label: 'Indonesia' },
   { value: 'it', label: 'Italy' },
   { value: 'jp', label: 'Japan' },
   { value: 'mx', label: 'Mexico' },
   { value: 'ng', label: 'Nigeria' },
   { value: 'pk', label: 'Pakistan' },
   { value: 'ph', label: 'Philippines' },
   { value: 'ru', label: 'Russia' },
   { value: 'sa', label: 'Saudi Arabia' },
   { value: 'za', label: 'South Africa' },
   { value: 'kr', label: 'South Korea' },
   { value: 'es', label: 'Spain' },
   { value: 'se', label: 'Sweden' },
   { value: 'ch', label: 'Switzerland' },
   { value: 'tr', label: 'Turkey' },
   { value: 'ae', label: 'United Arab Emirates' },
   { value: 'gb', label: 'United Kingdom' },
   { value: 'vn', label: 'Vietnam' },
   // Add more countries as needed
 ];

export  const maisonSmSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_72_.webp";
export  const maisonUrl = "/browse-products?categoryName=Maison%20-%20Cuisine%20-%20Deco";
export  const maisonBigSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_72_.webp"
export  const beautySmSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_69_.webp";
export const beauryBigSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_69_.webp";
export  const beauryUrl = "/browse-products?categoryName=Beauté%20-%20Santé";
export  const techSmSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_70__1.webp";
export const techBigSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_70__1.webp";
export  const techUrl = "/browse-products?categoryName=Tv%20-%20Son%20-%20Photo";
export  const bebeSmSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_71_.webp";
export const bebeBigSrc = "https://www.marjanemall.ma/media/wysiwyg/category/output_image_71_.webp";
export  const bebeUrl = "/browse-products?categoryName=Bébé%20&%20Jouets";
// <source media="(min-width:768px)" data-srcset="https://www.marjanemall.ma/media/wysiwyg/category/output_image_71_.webp" srcset="https://www.marjanemall.ma/media/wysiwyg/category/output_image_71_.webp">

export const subCategories = [
   {
      url: "/browse-products?categoryName=Tv%20-%20Son%20-%20Photo",
      title:"Tv-Son-Photo",
      img:"/images/pc_image-removed.png",
      id:"6659898540000088eee"
 },
 {
   url: "/browse-products?categoryName=Electronics",
   title:"Téléphone & Objets connectés",
   img:"/images/phone_image-removed.png",
   id:"565698900033+698989edf"
},
{
   url: "/browse-products?categoryName=Electronics",
   title:"Informatique - Gaming",
   img:"/images/gaming_image-removed.png",
   id:"989454546565666888777555fdfd"
},
{
   url: "/browse-products?categoryName=Electroménager",
   title:"Electroménager",
   img:"/images/electro_image-removed.png",
   id:"998989899zdsdsfdfd"
},
{
   url: "/browse-products?categoryName=Maison - Cuisine - Deco",
   title:"Maison - Cuisine - Deco",
   img:"/images/deco_image-removed.png",
   id:"8989ef65656545454545"
},

{
   url: "/browse-products?categoryName=sport",
   title:"Sport",
   img:"/images/sport_image.removed.png",
   id:"98568565654532323eeref656"
},
{
   url: "/browse-products?categoryName=Bébé & Jouets",
   title:"Bébé & Jouets",
   img:"/images/jouet_image-removed.png",
   id:"ddf987875"
},
{
   url: "/browse-products?categoryName=Brico - Jardin - Animalerie",
   title:"Brico - Jardin - Animalerie",
   img:"/images/jardin_image-removed.png",
   id:"zzée8986560033.+6+6"
},
]


export const useBrands =  () => {
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const mediaQuery = window.matchMedia('(max-width: 768px)');
     setIsMobile(mediaQuery.matches);
 
     const handleMediaQueryChange = (event:any) => {
       setIsMobile(event.matches);
     };
 
     mediaQuery.addEventListener('change', handleMediaQueryChange);
     return () => {
       mediaQuery.removeEventListener('change', handleMediaQueryChange);
     };
   }, []);
   // <source media="(max-width:768px)" data-srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/output_image_7_.webp" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/output_image_7_.webp">
   const brands = [
      {
         url: "aeg",
         src: '/images/aeg-brand.png',
         imageBanner: isMobile ?  'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/output_image_7_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/output_image_5_.webp"
         
      },
      {
         url: 'bella maison',
         src:  '/images/bella-maison-brand.png',
         imageBanner: ""
      },
      {
         url: 'kitea',
         src:  '/images/kitea-brand-me.png',
         imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/category/Kitea/banner-mobile-kitea_2_.webp' : 'https://www.marjanemall.ma/media/wysiwyg/category/Kitea/banner-web-kitea_2_.webp'
      },
      {
         url: 'bosch',
         src:  '/images/bosch-brand.png',
         imageBanner: ""
      },
      {
         url: 'tefal',
         src:  '/images/tefal-brand.png',
         imageBanner: ""
      },
     
      {
         url: 'taurus',
         src:  '/images/taurus-brand.png',
         imageBanner: ""
      },
   
   ]
   const updatedBrands = brands.map(brand => ({
      ...brand,
    }));
  
    return updatedBrands;
}








export const useMakeupBrands =  () => {
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const mediaQuery = window.matchMedia('(max-width: 768px)');
     setIsMobile(mediaQuery.matches);
 
     const handleMediaQueryChange = (event:any) => {
       setIsMobile(event.matches);
     };
 
     mediaQuery.addEventListener('change', handleMediaQueryChange);
     return () => {
       mediaQuery.removeEventListener('change', handleMediaQueryChange);
     };
   }, []);
   // <source media="(max-width:768px)" data-srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/output_image_7_.webp" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/output_image_7_.webp">
   const brands = [
      {
         url: "LOREAL",
         src: '/images/loreal.png',
         imageBanner:""
         
      },
      {
         url: 'VICHY',
         src:  '/images/vichy.png',
         imageBanner: ""
      },
      {
         url: 'BYS',
         src:  '/images/bys.png',
         imageBanner: ""
      },
      {
         url: 'LA ROCHE-POSAY',
         src:  '/images/larocheposay.png',
         imageBanner: ""
      },
      {
         url: 'URIAGE',
         src:  '/images/Uriage.png',
         imageBanner: ""
      },
     //<source media="(max-width:768px)" data-srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/output_image_2_.webp" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/output_image_2_.webp">
      {
         url: 'Maybelline',
         src:  '/images/maybelline.png',
         imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/output_image_2_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/cat_icon_scroll/output_image_4_.webp"
      },
   
   ]
   const updatedMakeupBrands = brands.map(brand => ({
      ...brand,
    }));
  
    return updatedMakeupBrands;
}

export const useTechBrands = () => {
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const mediaQuery = window.matchMedia('(max-width: 768px)');
     setIsMobile(mediaQuery.matches);
 
     const handleMediaQueryChange = (event:any) => {
       setIsMobile(event.matches);
     };
 
     mediaQuery.addEventListener('change', handleMediaQueryChange);
     return () => {
       mediaQuery.removeEventListener('change', handleMediaQueryChange);
     };
   }, []);
 
   const techBrands = [
     {
       url: "Samsung",
       src: '/images/samsung.png',
       imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/Banner_subcateg_hp/banner_mob_web.webp' : 'https://www.marjanemall.ma/media/wysiwyg/Banner_subcateg_hp/Banner_desktop_web.webp'
     },
     {
       url: 'HP',
       src: '/images/hp.png',
       imageBanner: ""
     },
     {
       url: 'CANON',
       src: '/images/canon.png',
       imageBanner: ""
     },
     {
       url: 'BOSE',
       src: '/images/bose-logo_1.png',
       imageBanner: ""
     },
     {
       url: 'JBL',
       src: '/images/JBL.png',
       imageBanner: ""
     },
     {
       url: 'APPLE',
       src: '/images/Apple.png',
       imageBanner: ""
     },
   ];
 
   const updatedTechBrands = techBrands.map(brand => ({
     ...brand,
   }));
 
   return updatedTechBrands;
 };



 export const useClothesBrands = () => {
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const mediaQuery = window.matchMedia('(max-width: 768px)');
     setIsMobile(mediaQuery.matches);
 
     const handleMediaQueryChange = (event:any) => {
       setIsMobile(event.matches);
     };
 
     mediaQuery.addEventListener('change', handleMediaQueryChange);
     return () => {
       mediaQuery.removeEventListener('change', handleMediaQueryChange);
     };
   }, []);
 
   const clothesBrands = [
      // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/category/BRANDS/marwa/BANNER-MM-MARWA-MOBILE.webp">
     {
       url: "marwa",
       src: '/images/marwa.png',
       imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/category/BRANDS/marwa/BANNER-MM-MARWA-MOBILE.webp' : 'https://www.marjanemall.ma/media/wysiwyg/category/BRANDS/marwa/BANNER-MM-MARWA-Desktop.webp'
     },
     {
       url: 'nike',
       src: '/images/nike.png',
       imageBanner: ""
     },
     {
      // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/slider-celio-mobile.webp">
       url: 'celio',
       src: '/images/celio.png',
       imageBanner: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/slider-celio-mobile.webp" : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/brand_banner/slider-celio-Desktop.webp"
     },
     {
       url: 'puma',
       src: '/images/puma.png',
       imageBanner: ""
     },
     {
       url: 'champion',
       src: '/images/CHAMPION.png',
       imageBanner: ""
     },
     {
       url: 'converse',
       src: '/images/Converse.png',
       imageBanner: ""
     },
   ];
 
   const updatedclothesBrands = clothesBrands.map(brand => ({
     ...brand,
   }));
 
   return updatedclothesBrands;
 };

   
 
  

  

  
  export const useBebeBrands = () => {
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const mediaQuery = window.matchMedia('(max-width: 768px)');
     setIsMobile(mediaQuery.matches);
 
     const handleMediaQueryChange = (event:any) => {
       setIsMobile(event.matches);
     };
 
     mediaQuery.addEventListener('change', handleMediaQueryChange);
     return () => {
       mediaQuery.removeEventListener('change', handleMediaQueryChange);
     };
   }, []);
 
   const BebeBrands = [
      {
        url: "DODOT",
        src: '/images/Dodot.png',
        imageBanner: ""
      },
      {
        url: 'CHICCO',
        src: '/images/chicco.png',
        imageBanner: ""
      },
      {
        url: 'PAMPERS',
        src: '/images/pampers.png',
        imageBanner: ""
      },
      {
        url: 'MUSTELA',
        src: '/images/mustela.png',
        imageBanner: ""
      },
      {
        url: 'MEDELA',
        src: '/images/Medela.png',
        imageBanner: ""
      },
      {
        url: 'PHILIPS AVENT',
        src: '/images/Philips_avent.png',
        imageBanner: ""
      },
    ];
 
   const updatedBebeBrands = BebeBrands.map(brand => ({
     ...brand,
   }));
 
   return updatedBebeBrands;
 };



 export const categoriesSideBar = [
  {
    id: "545458783212121",
    icon: "/images/deco.png",
    name: 'Maison - Cuisine - Deco',
    url:"/browse-products?categoryName=Maison%20-%20Cuisine%20-%20Deco"
  },
  {
    id: "545458783212121656565989845454545e4fdfdfdf",
    icon: "/images/game.png",
    name: 'Electronics',
    url:'/browse-products?categoryName=Electronics'
    
  },
 
  {
    id: "45554489663333660000zzdsdsd9890",
    icon: "/images/tv-son.png",
    name :'Tv - Son - Photo',
    url: "/browse-products?categoryName=Tv%20-%20Son%20-%20Photo",
   
 },

 {
    id: "455544896633336600000",
    icon: "/images/sport.png" ,
    name :'sport',
    url: "/browse-products?categoryName=sport",
   
 },
 {
   
   name:"Electroménager",
   icon:"/images/electro.png",
   url:'/browse-products?categoryName=Electroménager',
   id:"8989ef656565fdfd554dsoand45454545"
 },
 
 {
    id: "0022559694998989dfdfdfd",
    icon: "/images/bebe.png",
    name :'Bébé & Jouets',
    url: "/browse-products?categoryName=Bébé%20&%20Jouets",
 
 },
 // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/BANNIERES-N1_mobile6-b_b_jouet_icon_23_.webp">
 {
  id: "0022559694454549889",
  icon: "/images/beaute.png",
  name :'Beauté - Santé',
  url: "/browse-products?categoryName=Beauté%20-%20Santé",
 
},

{
  id: "0022559694",
  icon: "/images/mode.png",
  name :'vetements',
  url: "/browse-products?categoryName=vetements",
},

];

export const brandsSideBar = [
  {
    id: "545458783212,fd,fdnf,df121",
    icon: "/images/logo-apple.png",
    name: 'Apple',
     url:"/browse-boutique-brand?brandName=apple"
    
  },
  {
    id: "5454587832121216sdsdsdszzz56565989845454545e4fdfdfdf",
    icon: "/images/samsung-icon.png",
    name: 'samsung',
    url:"/browse-boutique-brand?brandName=samsung"
  },
 
  {
    id: "45554489663333660000zzdsdsd9890",
    icon: "/images/hp-icon.png",
    name :'Hp',
    url:"/browse-boutique-brand?brandName=hp"
   
 },

 {
    id: "455544896633336600000",
    icon: "/images/ni.png" ,
    name :'Nike',
    url:"/browse-boutique-brand?brandName=nike"
 },
 {
   
   name:"Adidas",
   icon:"/images/adidas.png",
   id:"898dddee9ef656565fdfd554dsoand45454545",
   url:"/browse-boutique-brand?brandName=adidas"
 },
 
 {
    id: "0022559694998989dfdfdfd",
    icon: "/images/puma1.png",
    name :'Puma',
    url:"/browse-boutique-brand?brandName=puma"
 
 },

 {
  id: "0022559694454549889",
  icon: "/images/shoe.png",
  name:"Converse",
  url:"/browse-boutique-brand?brandName=converse"
},

{
  id: "002kkkk2559694",
  icon: "/images/loreal-paris.png",
  name :"L'oreal paris",
  url:"/browse-boutique-brand?brandName=LOREAL"
},
{
  id: "00ddeaaa2kkkk2559694",
  icon: "/images/posay.png",
  name :"La roche posay",
  url:"/browse-boutique-brand?brandName=LA ROCHE-POSAY"
},
{
  id: "00ddeaaa2kkkk2559694",
  icon: "/images/may.png",
  name :"Maybelline new york",
  url:"/browse-boutique-brand?brandName=Maybelline"
 
},

];


export const filterCategories = [
   {
     label: "Maison - Cuisine - Deco",
     value: "maison - cuisine - deco"
   },
   {
    label: "Sport",
    value: "sport"
  },
  {
    label: "Electronics",
    value: "electronics"
  },
  {
    label: "Bébé & Jouets",
    value: "bébé & jouets"
  },
  {
    label: "Beauté - Santé",
    value: "beauté - santé"
  },
  {
    label: "vetements",
    value: "vetements"
  },
  {
    label: "Brico - Jardin - Animalerie",
    value: "brico - jardin - animalerie"
  },
  {
    label: "Electroménager",
    value: "electroménager"
  },
 
]

export const filterBrands = [
  {
    label: "Nike",
    value: "nike"
  },
  {
   label: "Adidas",
   value: "adidas"
 },
 {
   label: "Puma",
   value: "puma"
 },
 {
   label: "Marwa",
   value: "marwa"
 },

 {
   label: "Converse",
   value: "converse"
 },
 {
   label: "vetements",
   value: "vetements"
 },
 {
   label: "aeg",
   value: "Aeg"
 },
 {
   label: "Kitea",
   value: "kitea"
 },
 {
  label: "bosch",
  value: "bosch"
},
{
  label: "Tefal",
  value: "tefal"
},
{
  label: "Taurus",
  value: "taurus"
},
{
  label: "Bella maison",
  value: "bella maison"
},
{
  label: "Apple",
  value: "apple"
},
{
  label: "Sumsung",
  value: "sumsung"
},
{
  label: "Hp",
  value: "hp"
},
{
  label: "Canon",
  value: "canon"
},
{
  label: "Bose",
  value: "bose"
},
{
  label: "Jbl",
  value: "jbl"
},
{
  label: "Loreal",
  value: "loreal"
},
{
  label: "LA roche-posay",
  value: "la roche-posay"
},
{
  label: "Maybelline",
  value: "maybelline"
},
{
  label: "Uriage",
  value: "uriage"
},
{
  label: "Vichy",
  value: "Vichy"
},
{
  label: "Bose",
  value: "bose"
},
{
  label: "Dodot",
  value: "dodot"
},
{
  label: "Chicco",
  value: "chicco"
},
{
  label: "Mustela",
  value: "mustela"
},
{
  label: "Philips avent",
  value: "philips avent"
},
{
  label: "Medela",
  value: "medela"
},
{
  label: "Pampers",
  value: "pampers"
},

]
export const filterRating = [
    {
       value: "5",
       label: "5",
    },
    {
      value: "4",
      label: "4",
   },
    {
      value: "3",
      label: "3",
    },
    {
     value: "1",
     label:"1"
     }
]
interface URlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({params, key, value}:URlQueryParams)=> {
  const currentUrl = qs.parse(params)
  currentUrl[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  }, {
    skipNull: true
  })
}

interface RemoveURlQueryParams {
params: string;
keysToRemove: string[];

}
export const removeKeysFromQuery = ({params, keysToRemove}:RemoveURlQueryParams)=> {
const currentUrl = qs.parse(params)
keysToRemove.forEach((key)=> {
   delete currentUrl[key]
})
return qs.stringifyUrl({
  url: window.location.pathname,
  query: currentUrl
}, {
  skipNull: true
})
}