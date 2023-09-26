export interface Product {
    name: string;
    sellername: string;
    price: string;
    description: string;
    productImage: File | null; // Use 'File' type for the image or 'null' if not selected
    category: string,
    sellerId: string
  }