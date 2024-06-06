import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';
const Featured = () => {
    return (
        <div className="featured-Item text-white pt-8 my-16 bg-fixed">
            <SectionTitle
                heading="featured Item"
                subheading="Check It Out"
            ></SectionTitle>

            <div className="md:flex bg-slate-500 bg-opacity-50  justify-center items-center pb-20 pt-12 px-32">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="ml-6">
                    <p>May 20, 2024</p>
                    <p className="uppercase">where can i get it</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae reprehenderit alias
                        tempore consequatur quos ullam commodi labore, velit soluta nam quaerat quisquam
                        facilis quam accusamus iste quidem? Nam sequi ipsum placeat.
                        Reprehenderit quam deserunt ut id, doloremque tenetur. Praesentium, numquam.

                    </p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>

        </div>
    );
};

export default Featured;