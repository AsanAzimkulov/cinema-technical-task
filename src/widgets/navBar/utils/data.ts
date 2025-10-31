import { computed } from 'vue'
import type { NavBarItem } from "~/widgets/navBar/types";
import { useAuthStore } from '~/shared/store/auth'

export function getNavBarItems(): NavBarItem[] {
    const authStore = useAuthStore()
    const items: NavBarItem[] = [
        { title: 'Фильмы', route: '/', default: true},
        { title: 'Кинотеатры', route: '/cinemas'},
        { title: 'Мои билеты', route: '/my-tickets'},
    ]
    
    if (authStore.isAuthenticated) {
        items.push({ title: 'Выход', route: '/logout', action: 'logout' })
    } else {
        items.push({ title: 'Вход', route: '/auth/login' })
    }
    
    return items
}

export const isActiveNavBarItem = (item: NavBarItem, currentRoute: string | undefined): boolean => {
    if (!currentRoute) return false
    if (item.default && currentRoute === 'index') {
        return true;
    }
    return currentRoute === item.route.replace('/', '');
}