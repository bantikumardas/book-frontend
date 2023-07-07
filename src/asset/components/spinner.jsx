import 'bootstrap/dist/css/bootstrap.min.css';

const Spinner = () => {
    return (
        <div>
            <div style={ {opacity: '1',position:'fixed', zIndex:'9999', width:'100%', height:'100%'}}>
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Spinner;