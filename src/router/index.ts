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
					titleType: TitleTypeEnum.PIEROGARNIA,
				},
			},
			{
				path: 'recipe/add',
				name: RoutesNames.Add,
				component: () => import('@/views/Add.vue'),
				meta: {
					title: 'Pierogator świąteczny',
					titleType: TitleTypeEnum.PIEROGATOR,
				},
			},
			{
				path: 'recipe/generate',
				name: RoutesNames.Recipe,
				component: () => import('@/views/Recipe.vue'),
				meta: {
					title: 'Pierogator świąteczny',
					titleType: TitleTypeEnum.PIEROGATOR,
				},
			},
			{
				path: 'recipe/:id',
				name: RoutesNames.ItemPage,
				component: () => import('@/views/ItemPage.vue'),
				meta: {
					title: 'Pierogator świąteczny',
					titleType: TitleTypeEnum.PIEROGARNIA,
				},
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title.toString();
	}
	next();
});

export default router;
