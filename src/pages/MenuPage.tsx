import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {IMenuItem} from "../interfaces/MenuItemInterface.ts";
import MenuItem from "../components/MenuItem.tsx";


const MenuPage: React.FC = () => {
    // Hämta alla menyobjekt från Redux-statet
    const items = useSelector((state: RootState) => state.menu.items);

    return (
        <div className="menu-page">
            <h1>Meny</h1>
            {items.map((item: IMenuItem) => (
                <MenuItem key={item.id} />
            ))}
        </div>
    );
};

export default MenuPage;