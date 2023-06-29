const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					100: '#dff2e1',
					200: '#bfe4c2',
					300: '#9ed7a4',
					400: '#7ec985',
					500: '#5ebc67',
					600: '#4b9652',
					700: '#38713e',
					800: '#264b29',
					900: '#132615'
				}
				// primary: {
				// 	50: '#FFF5F2',
				// 	100: '#FFF1EE',
				// 	200: '#FFE4DE',
				// 	300: '#FFD5CC',
				// 	400: '#FFBCAD',
				// 	500: '#FE795D',
				// 	600: '#EF562F',
				// 	700: '#EB4F27',
				// 	800: '#CC4522',
				// 	900: '#A5371B'
				// }
			}
		}
	}
};

module.exports = config;
