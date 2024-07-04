import { create } from 'zustand';

interface State {
  isSideMenuOpen: boolean;

  //No recibe ni regresa nada
  openSideMenu: () => void;
  closeSideMenu: () => void;
}
//nuestro create es de tipo <State>
export const useUIStore = create<State>()((set) => ({
 isSideMenuOpen: false,

 openSideMenu: () => set({isSideMenuOpen: true}),
 closeSideMenu: () => set({isSideMenuOpen: false}),
}))