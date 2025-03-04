import '../styles/navbar.scss';
import Badge from "@mui/material/Badge";
import logo from '../assets/logo-trans.svg';
import { ShoppingBasketOutlined} from "@mui/icons-material";

const Navbar = () => {
    return (
        <div>

            <div className="menu-header">

                {/* Vänsterlogga */}
                <div className="menu-logo">
                    <img src={logo} alt="Logotyp" />
                </div>

                {/* Höger: Kundvagn med badge */}
                <div className="menu-cart">
                    <Badge badgeContent={3} color="error">
                        <ShoppingBasketOutlined fontSize="large" />
                    </Badge>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
