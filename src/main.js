// Modules
import Vue from 'vue'
import VueRouter from 'vue-router'
import Sheetrock from 'sheetrock'

// Components
import Home from './components/Home.vue'
import Table from './components/Table.vue'

// Global modules
window.sheetrock = Sheetrock;

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{ path: '/d/:id', component: Table },
		{ path: '*', component: Home }
	]
});

new Vue({
	router,
	el: '#app',
	data() {
		return {
			msg: 'Hello world.'
		}
	}
});