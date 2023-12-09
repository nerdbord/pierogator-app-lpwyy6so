// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { RoutesNames } from '@/enums/RoutesNames.enum';
import { TitleTypeEnum } from '@/enums/TitleType.enum';

const routes = [
	{
		path: '/',
		component: () => import('@/layouts/default/Layout.vue'),
		children: [
			{
				path: '',
				name: RoutesNames.Main,
				component: () => import('@/views/Main.vue'),
				meta: {
					title: 'Pierogarnia',
					titleType: TitleTypeEnum.a,
				},
			},
			{
				path: '/add',
				name: RoutesNames.Add,
				component: () => import('@/views/Add.vue'),
				meta: {
					title: 'Pierogator świąteczny',
					titleType: TitleTypeEnum.b,
				},
			},
			{
				path: ':id',
				name: RoutesNames.ItemPage,
				component: () => import('@/views/ItemPage.vue'),
				meta: {
					title: 'Pierogator świąteczny',
					titleType: TitleTypeEnum.b,
				},
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title.toString();
	}
	next();
});

export default router;
