import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aboutUs: resolve(__dirname, 'src/pages/acercaDeNosotros/acercadenosotros.html'),
        products: resolve(__dirname, 'src/pages/productos/productos.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        contact: resolve(__dirname, 'src/pages/contacto/contacto.html'),
        object: resolve(__dirname, 'src/pages/adminProductos/objetos.html'),
        cart: resolve(__dirname, 'src/pages/cart/cart.html'),
        checkout: resolve(__dirname, 'src/pages/cart/checkout.html')
      },
      external: [
        'js/itemsController.js', // Sustituye 'nombre-del-modulo-problematico' con el nombre real del módulo
      ],
    },
  },
})

