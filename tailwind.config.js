/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en el logo FHERIA MAYOR
        emerald: {
          50: '#f7f4eb',    // Fondo Crema / Marfil
          100: '#ebe6d5',   // Crema bordes
          200: '#c2d6cc',
          300: '#83b2a1',
          400: '#2a7281',   // Azul Petróleo del toldo
          500: '#1e7a60',   // Verde Hoja del toldo
          600: '#146955',   // Verde Principal
          700: '#0d5343',   // Verde Bosque (Texto FHERIA)
          800: '#0a4235',   // Verde Oscuro
          900: '#0f3840',   // Mezcla Verde / Azul Noche
          950: '#0a2328',   // Azul Petróleo Profundo
        },
        sky: {
          500: '#2a7281',   // Azul Cían/Teal del toldo
          600: '#1a5d6c',   // Azul Petróleo Intenso
          700: '#124551',   // Azul Oscuro
        },
        amber: {
          50: '#fef9ee',
          100: '#fdf0d5',
          300: '#f6c374',
          400: '#d89b27',   // Mostaza Dorado (toldo y pan)
          500: '#c2851a',
          600: '#a36b13',
        },
        red: {
          100: '#fee2e2',
          500: '#ef4444',
          600: '#d92b34',   // Rojo Manzana
          700: '#b91c1c',
        }
      },
    },
  },
  plugins: [],
}