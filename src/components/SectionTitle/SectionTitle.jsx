

const SectionTitle = ({ subheading, heading }) => {
    return (
        <div className="w-4/12 mx-auto text-center my-6">
            <p className="text-yellow-600">---{subheading}---</p>
            <h3 className="text-3xl border-y-4 py-4 uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;