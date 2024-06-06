import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";

import menuImg from '../../../assets/menu/banner3.jpg';
import dessertBgImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaBgImg from '../../../assets/menu/pizza-bg.jpg'
import saladBgImg from '../../../assets/menu/salad-bg.jpg';
import soupBgImg from '../../../assets/menu/soup-bg.jpg';

import useMenu from "../../../hooks/useMenu";
import SertionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Bistro | menu</title>
            </Helmet>
            <Cover img={menuImg} title={'our menu'}></Cover>

            {/* offered */}
            <SertionTitle
                heading="today's offer"
                subheading="Don't Miss"
            ></SertionTitle>
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert */}


            {/* dessert */}
            <MenuCategory items={dessert} title={'desert'} coverImg={dessertBgImg}></MenuCategory>
            <MenuCategory items={pizza} title={'pizza'} coverImg={pizzaBgImg}></MenuCategory>
            <MenuCategory items={salad} title={'salad'} coverImg={saladBgImg}></MenuCategory>
            <MenuCategory items={soup} title={'soup'} coverImg={soupBgImg}></MenuCategory>


        </div>
    );
};

export default Menu;