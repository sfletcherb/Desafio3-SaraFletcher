const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.path = "./productsList.json";
    this.products = [];
  }

  // Método para crear el archivo.
  async readFile() {
    try {
      const fileContent = await fs.readFile(this.path, "utf8");
      return JSON.parse(fileContent);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.saveFile();
        return [];
      }
      console.log("Couldn't create field:", error);
      return [];
    }
  }

  // Metodo para Agregar un producto al arreglo products
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const fields = [title, description, price, thumbnail, code, stock];
      const notEmptyFields = fields.every((fieldEmpty) => fieldEmpty);
      if (!notEmptyFields) {
        throw new Error("All fields are required");
      }

      const codeExist = this.products.some((items) => items.code === code);
      if (codeExist) {
        throw new Error("The code already exists");
      }
      const newProduct = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(newProduct);
    } catch (error) {
      console.log("Couldn't add product:", error);
    }
  }

  // Método obtener productos según id
  async getProductById(id) {
    try {
      const content = await this.readFile();
      const findId = content.find((item) => item.id === id);
      console.log("The product is:", findId);
      return findId;
    } catch (error) {
      console.log("Couldn't find product");
    }
  }

  async updateProduct(id, products) {
    try {
      const index = this.products.findIndex((item) => item.id === id);

      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...products };
      } else {
        console.log("id not found");
      }
    } catch (error) {
      console.log("Couldn't update product", error);
    }
  }

  async deleteProduct(id) {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(content);

      const index = products.findIndex((item) => item.id === id);

      if (index !== -1) {
        products.splice(index, 1);

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      } else {
        console.log("Couldn't delete product");
      }
    } catch (error) {
      console.log("Couldn't delete product", error);
    }
  }

  async saveFile() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
      console.log("Saved product");
    } catch (error) {
      console.log("Couldn't save", error);
    }
  }
}

const productData = [
  ["producto1", "Prueba1", 100, "Sin imagen", "abc123", 10],
  ["producto2", "Prueba2", 200, "Sin imagen", "abc456", 20],
  ["producto3", "Prueba3", 300, "Sin imagen", "abc789", 30],
  ["producto4", "Prueba4", 400, "Sin imagen", "abc159", 40],
  ["producto5", "Prueba5", 500, "Sin imagen", "abc753", 50],
  ["producto6", "Prueba6", 600, "Sin imagen", "abc452", 60],
  ["producto7", "Prueba7", 700, "Sin imagen", "abc984", 70],
  ["producto8", "Prueba8", 800, "Sin imagen", "abc349", 80],
  ["producto9", "Prueba9", 900, "Sin imagen", "abc624", 90],
  ["producto10", "Prueba10", 1000, "Sin imagen", "abc963", 100],
];

module.exports = { ProductManager, productData };
