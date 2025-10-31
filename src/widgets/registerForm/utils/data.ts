import type { NavBarItem } from "~/widgets/navBar/types";

export const navBarItems: NavBarItem[] = [
    { title: 'Фильмы', route: 'movies', default: true},
    { title: 'Кинотеатры', route: 'cinemas'},
    { title: 'Мои билеты', route: 'my-tickets'},
    { title: 'Вход', route: 'auth/login'},
];

export const isActiveNavBarItem = (item: NavBarItem, currentRoute: string): boolean => {
    if (item.default && currentRoute === 'index') {
        return true;
    }
    return currentRoute === item.route;
}