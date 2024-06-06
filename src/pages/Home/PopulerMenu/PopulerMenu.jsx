import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopulerMenu = () => {

    const [menu] = useMenu();
    const populer = menu.filter(item => item.category === 'popular');


    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const populerItems = data.filter(item => item.category === 'popular');
    //             setMenu(populerItems);
    //         })
    // }, [])
    return (
        <div className="mb-6">
            <section>
                <SectionTitle
                    heading={'From our menu'}
                    subheading={'Populer Items'}
                >
                </SectionTitle>

                <div className="grid md:grid-cols-2 gap-6">
                    {
                        populer.map(item => <MenuItem
                            key={item._id}
                            item={item}
                        >
                        </MenuItem>)
                    }
                </div>
                <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
            </section>
        </div>
    );
};

export default PopulerMenu;