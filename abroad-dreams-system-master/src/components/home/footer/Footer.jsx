import logo from '../../../assets/abroad-dreams-logo-dark.png';

const Footer = () => {
    return (
        <div>
            <footer className="footer p-5 bg-success mt-5 text-white font-bold">
                <div className="container">
                    <div className="row">
                        <aside className="col-md-4">
                            <img src={logo} className="img-fluid mb-3" alt="" />
                        </aside>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
