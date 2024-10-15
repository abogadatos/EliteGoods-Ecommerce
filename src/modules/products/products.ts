// import { Injectable } from '@nestjs/common';

// type Product = {
//   id: number;
//   productName: string;
//   description: string;
//   price: number;
//   stock: boolean;
//   imgUrl?: string;
//   rate?: number;
//   sale: boolean;
// };

// @Injectable()
// export class ProductsRepository {
//   private products: Product[] = [
//     {
//       id: 1,
//       productName: 'Laptop',
//       description:
//         'A high-performance laptop suitable for all your computing needs.',
//       price: 999.99,
//       stock: true,
//       imgUrl: 'https://example.com/laptop.jpg',
//       rate: 4.5,
//       sale: false,
//     },
//     {
//       id: 2,
//       productName: 'Smartphone',
//       description: 'A latest generation smartphone with cutting-edge features.',
//       price: 699.99,
//       stock: true,
//       imgUrl: 'https://example.com/smartphone.jpg',
//       rate: 4.7,
//       sale: true,
//     },
//     {
//       id: 3,
//       productName: 'Headphones',
//       description:
//         'Noise-cancelling over-ear headphones for immersive sound experience.',
//       price: 199.99,
//       stock: false,
//       imgUrl: 'https://example.com/headphones.jpg',
//       rate: 4.2,
//       sale: false,
//     },
//     {
//       id: 4,
//       productName: 'Smartwatch',
//       description:
//         'A smartwatch with multiple health tracking features and long battery life.',
//       price: 149.99,
//       stock: true,
//       imgUrl: 'https://example.com/smartwatch.jpg',
//       rate: 4.0,
//       sale: true,
//     },
//     {
//       id: 5,
//       productName: 'Camera',
//       description:
//         'A digital camera with high resolution and multiple shooting modes.',
//       price: 499.99,
//       stock: true,
//       imgUrl: 'https://example.com/camera.jpg',
//       rate: 4.6,
//       sale: false,
//     },
//     {
//       id: 6,
//       productName: 'Tablet',
//       description:
//         'A lightweight tablet with a vibrant display and fast performance.',
//       price: 399.99,
//       stock: false,
//       imgUrl: 'https://example.com/tablet.jpg',
//       rate: 4.3,
//       sale: true,
//     },
//     {
//       id: 7,
//       productName: 'Monitor',
//       description:
//         'A 24-inch monitor with full HD resolution and adjustable stand.',
//       price: 179.99,
//       stock: true,
//       imgUrl: 'https://example.com/monitor.jpg',
//       rate: 4.1,
//       sale: false,
//     },
//     {
//       id: 8,
//       productName: 'Keyboard',
//       description: 'A mechanical keyboard with customizable RGB lighting.',
//       price: 89.99,
//       stock: true,
//       imgUrl: 'https://example.com/keyboard.jpg',
//       rate: 4.4,
//       sale: true,
//     },
//     {
//       id: 9,
//       productName: 'Mouse',
//       description:
//         'A wireless mouse with ergonomic design and long battery life.',
//       price: 49.99,
//       stock: true,
//       imgUrl: 'https://example.com/mouse.jpg',
//       rate: 4.8,
//       sale: false,
//     },
//     {
//       id: 10,
//       productName: 'Printer',
//       description:
//         'A multifunction printer with wireless connectivity and high print speed.',
//       price: 129.99,
//       stock: false,
//       imgUrl: 'https://example.com/printer.jpg',
//       rate: 3.9,
//       sale: true,
//     },
//   ];

//   getAllProductsFilter(page: number, limit: number) {
//     const startProductIndex = (page - 1) * limit;
//     const endProductIndex = startProductIndex + +limit;
//     const productList = this.products.slice(startProductIndex, endProductIndex);

//     return productList.map((product) => product);
//   }

//   getProduct(id: number): Product {
//     return this.products.find((product) => product.id === id);
//   }

//   createProduct(newProduct: Product) {
//     const id = this.products.length + 1;
//     newProduct.id = id;

//     this.products.push(newProduct);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { imgUrl, ...productWithtoutURL } = newProduct;
//     return {
//       message: `Product created successfuly`,
//       newUserData: productWithtoutURL,
//     };
//   }

//   getProductByName(productName: string): Product {
//     const lowerCasedProductName = productName.toLowerCase();
//     return this.products.find(
//       (product) => product.productName.toLowerCase() === lowerCasedProductName,
//     );
//   }

//   updateUser(id: number, product: Partial<Product>) {
//     const oldProduct = this.products.find((producto) => producto.id === +id);
//     if (!oldProduct) {
//       return `Este producto no existe`;
//     }

//     const updatedProduct = { ...oldProduct, ...product };

//     const index = this.products.findIndex((producto) => producto.id === id);
//     this.products[index] = updatedProduct;

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     // const { password, ...userWithoutPassword } = updatedProduct;

//     return updatedProduct;
//   }

//   deleteProduct(id: number) {
//     const index = this.products.findIndex((producto) => producto.id === id);
//     if (index === -1) {
//       return `El producto con id ${id} no existe`;
//     }
//     const producto = this.products[index];

//     this.products.splice(index, 1);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     // const { sale, ...userWithoutPass } = producto;
//     // console.log(userWithoutPass);
//     // console.log(producto);
//     return producto;
//   }
// }
