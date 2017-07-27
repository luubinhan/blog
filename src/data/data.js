const PRIMARY_NAVIGATION = [
	{
		name: "Home",
		href: '/',
		isActive: false,
	},
	{
		name: "Portfolio",
		href: '/portfolio',
		isActive: false,
	},
	{
		name: "Blog",
		href: '/blog',
		isActive: false,
		children: [
			{
				name: 'Javascript',
				href: '/javascript',
				isActive: false
			},
			{
				name: 'UX/UI',
				href: '/ux-ui',
				isActive: false
			},
			{
				name: 'CSS',
				href: '/css',
				isActive: false
			},
			{
				name: 'Wordpress',
				href: '/wordpress',
				isActive: false
			},
		]
	},	
	{
		name: "About",
		href: '/about',
		isActive: false,
	},		
]

export default {PRIMARY_NAVIGATION};