
const MenuItem = ({ item }) => {
    const { name, price, recipe, image } = item;
    return (
        <div className="flex space-x-6">
            <img style={{ borderRadius: '0 180px 180px 180px' }} className="w-[110px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;