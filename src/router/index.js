import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadingView from '../views/LoadingView.vue'
import HelloWorld from "@/components/HelloWorld.vue";
import RealFileTreeView from "@/views/RealFileTreeView.vue";
import FolderViewComponent from "@/components/FolderViewComponent";
import AppendFileToArchiveView from "@/views/AppendFileToArchiveView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: 'archive_view',
                components: {
                    content: HelloWorld
                }
            },
            {
                path: 'real_file_tree',
                components: {
                    content: RealFileTreeView,
                    file_tree: FolderViewComponent,
                }
            },
            {
                path: 'append_file_to_archive_view',
                components: {
                    content: AppendFileToArchiveView,
                    file_tree: FolderViewComponent,
                }
            },
        ]
    },
    {
        path: '/loading',
        name: 'loading',
        component: LoadingView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
