/** @type {import('tailwindcss').Config} */
module.exports ={
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      keyframes:{
        
        border_animate_combined: {
          '0%': { borderColor: '#4c51bf' }, // Equivalent to bg-indigo-600
          '50%': { borderColor: 'transparent' },
          '100%': { borderColor: '#4c51bf' },
        },
        brightness: {
          '0%': { filter: 'brightness(4%)' },
          '15%': { filter: 'brightness(5%)' },
          '30%': { filter: 'brightness(6%)' },
          '50%': { filter: 'brightness(7%)' },
          '75%': { filter: 'brightness(8%)' },
          '100%': { filter: 'brightness(9%)' },
        },
        fadeInOut: {
          '0%' : { opacity: '0.05' },
          '25%': { opacity: '0.07' },
          '75%': { opacity: '0.08' },
          '100%': { opacity: '0.10' },
        },
        tyspeed:{
             "0%":{width:"0"},
             "100%":{width:"100%"}
        },
       blink:{
           "100%":{borderColor:"transparent"}
       }, 
       gradient: {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
        mypulse: {
          "0%": { backgroundColor:"rgba(255, 255, 0, 0.3)" },
          "25%": {backgroundColor:"rgba(255, 255, 0, 0.4)" },// Start transparent
          "50%":{ backgroundColor: "rgba(255, 255, 0, 0.7)" },
          "75%":{ backgroundColor: "rgba(255, 255, 0, 0.7)" }, // Yellow with some transparency
          "100%": { backgroundColor:"rgba(255, 255, 0, 0.8)" }, // Back to transparent
        },
        Bord: {
          "0%": { 
            borderLeftColor: "rgba(0, 0, 0, 1)", 
            borderLeftWidth: "8px", 
           
          },
          "25%": { 
            borderLeftColor: "rgba(0, 0, 0, 1)", 
            borderLeftWidth: "8px", 
           
          },
          "50%": { 
            borderLeftColor: "rgba(0, 0, 0, 1)", 
            borderLeftWidth: "8px", 
            
          },
          "75%": { 
            borderTopColor: "rgba(0, 0, 0, 1)", 
            borderTopWidth: "8px", 
          
          },
          "100%": { 
            // borderLeftColor: "transparent", 
            borderRightWidth: "8px", 
            borderRighttColor: "rgba(0, 0, 0, 1)",
          },
        },
      },
      
      fontFamily:{
        fontRoboto:[ "Roboto", "sans-serif"],
        fontRubik:[ "Rubik", "sans-serif"],
        fontRobotoSlab:["Roboto Slab", "serif"],
        fontOswald:["Oswald", "sans-serif"],
        fontMerriweather:["Merriweather Sans", 'serif']
      },
      backgroundImage:{
        bgImage:"url('/public/Gemini_Generated_Image_i8xn1ti8xn1ti8xn.png')",
        GoogleImg:"url('/public/icons8-google-48.png')",
        techClubImg:"url('/public/9508803_26807.jpg')",
        artsClubImg:"url('/public/1283624_663.jpg')",
        conicGradient: 'repeating-conic-gradient(from var(--a), #7e22ce 0%, #9333ea 5%, transparent 5%, transparent 40%, #7e22ce 50%)',
        spinnerImg:"url('/public/spinner-svgrepo-com.svg')",
      },
      animation:{
        mypulse:" mypulse 2s ease-in forwards",
        Bord:" Bord 3s ease-in infinite",
        tyspeed:" tyspeed 4s steps(20) 1s forwards",
        blink:" 1s step-end infinite",
        mybrightness:" brightness 2s ease-in infinite ",
        fadeInOut: 'fadeInOut 3s ease-in-out infinite',
        
      
      },
     
      scrollbar: {
        width: '1rem',  // Set custom width
        height: '1.5rem', // Set custom height
      },
      borderRadius: {
        'custom-shape': '69% 31% 35% 47% / 42% 42% 58% 58%',
      },
  
  },
  plugins: [
    function ({ addUtilities }) {
      // Add keyframes for spinConic
      const keyframes = {
        '@keyframes spinConic': {
          '0%': { '--a': '0deg' },
          '100%': { '--a': '360deg' },
        },
      };

      // Add utility for the animation
      const utilities = {
        '.animate-spinConic': {
          animation: 'spinConic 4s linear infinite',
        },
        '.bg-conicGradient': {
          '--a': '0deg',
          background:
            'repeating-conic-gradient(from var(--a), #7e22ce 0%, #9333ea 5%, transparent 5%, transparent 40%, #7e22ce 50%)',
        },
      };

      // Add keyframes and utilities
      addUtilities(keyframes, ['responsive', 'hover']);
      addUtilities(utilities, ['responsive', 'hover']);
    },
    require('tailwind-scrollbar'),
    require('tailwind-clip-path'),
    require('@tailwindcss/aspect-ratio'),
    
  ],
}
}
