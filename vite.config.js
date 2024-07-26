import { dirname, resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aboutUs: resolve(__dirname, 'src/pages/acercaDeNosotros/acercadenosotros.html'),
        products: resolve(__dirname, 'src/pages/productos/productos.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        login1:resolve(__dirname, 'src/pages/login1/login1.html'),
        login2: resolve(__dirname, 'src/pages/login2/login2.html'),

        contact: resolve(__dirname, 'src/pages/contacto/contacto.html'),
        object: resolve(__dirname, 'src/pages/adminProductos/objetos.html'),
        cart: resolve(__dirname, 'src/pages/cart/cart.html'),
        checkout: resolve(__dirname, 'src/pages/cart/checkout.html'),
        policies: resolve(__dirname, 'src/pages/politicas/politica.html')
      },
      external: [
        'js/itemsController.js', // Sustituye 'nombre-del-modulo-problematico' con el nombre real del módulo
      ],
    },
  },
})

