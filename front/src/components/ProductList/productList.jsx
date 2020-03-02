import React from 'react';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import { getProductsFetchAC } from '../../redux/actions/actions'
import { Card, Button, ListGroup } from 'react-bootstrap'
import './productList.css';
import ProductAddForm from '../ProductAddForm/ProductAddForm'

class ProductList extends React.PureComponent {
    state = {
        addProductToogle: false,
    }
    componentDidMount() {
        this.props.getProductsFetch(this.props.match.params.id)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.company._id !== this.props.company._id) {
            this.props.getProductsFetch(this.props.match.params.id)
        }
    };

    handleClickToogle = async () => {
        await this.setState({ addProductToogle: !this.state.addProductToogle })
    }

    render() {
        return (
            this.state.addProductToogle ?
            <ProductAddForm handleClickToogle={this.handleClickToogle}/>
            : this.props.company._id ?
                <Card className="card">
                    <Card.Header>
                        {`${this.props.company._source.displayName}(${this.props.company._source.INN})`}
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="null" className="card-body-list">
                            <ListGroup.Item className="list-group-item">
                                <Card.Text className="head">Full name: </Card.Text>
                                <Card.Text className="body">{this.props.company._source.fullName}</Card.Text>
                            </ListGroup.Item>
                            {this.props.company._source.INN ?
                                <ListGroup.Item className="list-group-item">
                                    <Card.Text className="head">INN: </Card.Text>
                                    <Card.Text className="body">{this.props.company._source.INN}</Card.Text>
                                </ListGroup.Item>
                                : <></>}
                            {this.props.company._source.CPP ?
                                <ListGroup.Item className="list-group-item">
                                    <Card.Text className="head">CPP: </Card.Text>
                                    <Card.Text className="body">{this.props.company._source.CPP}</Card.Text>
                                </ListGroup.Item>
                                : <></>}
                            {this.props.company._source.OGRN ?
                                <ListGroup.Item className="list-group-item">
                                    <Card.Text className="head">OGRN: </Card.Text>
                                    <Card.Text className="body">{this.props.company._source.OGRN}</Card.Text>
                                </ListGroup.Item>
                                : <></>}
                            {this.props.company._source.legalAddress ?
                                <ListGroup.Item className="list-group-item">
                                    <Card.Text className="head">Legal address: </Card.Text>
                                    <Card.Text className="body">{this.props.company._source.legalAddress.source}</Card.Text>
                                </ListGroup.Item>
                                : <></>}
                            {this.props.company._source.actualAddress ?
                                <ListGroup.Item className="list-group-item">
                                    <Card.Text className="head">Legal address: </Card.Text>
                                    <Card.Text className="body">{this.props.company._source.legalAddress.source}</Card.Text>
                                </ListGroup.Item>
                                : <></>}
                            {this.props.company._source.OKVED && this.props.company._source.primaryOKVEDRefId ?
                                <ListGroup.Item className="list-group-item">
                                    <Card.Text className="head">OKVED:</Card.Text>
                                    <ul className="body-ul">
                                        <li><div className="product-head">primaryOKVEDRefId:</div><div className="product-body">{this.props.company._source.primaryOKVEDRefId}</div></li>
                                        {this.props.company._source.OKVED.map((okved, i) =>
                                            <li key={i}><div className="product-head">OKVEDRefId:</div><div className="product-body">{okved.OKVEDRefId}</div></li>
                                        )}
                                    </ul>
                                </ListGroup.Item>
                                : <></>}
                            {this.props.products[0] ?
                                < ListGroup.Item className="list-group-item">
                                    <Card.Text className="head">Products:</Card.Text>
                                    <ul className="body-ul">
                                        {this.props.products.map((product, index) =>
                                            <>
                                                <li><div className="product-head">Id:</div><div className="product-body">{product.id}</div></li>
                                                <li><div className="product-head">Type:</div><div className="product-body">{product.type}</div></li>
                                                <li><div className="product-head">Required Date:</div><div className="product-body">{product.requiredDate}</div></li>
                                            </>
                                        )}
                                    </ul>
                                </ListGroup.Item>
                                : <Button className="products-button" onClick={this.handleClickToogle}>Add Product</Button>
                            }
                        </ListGroup>

                    </Card.Body>
                </Card >
                : <></>
        )
    }
}
function mapStateToProps(store) {
    return {
        company: store.company,
        products: store.products,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsFetch: data => dispatch(getProductsFetchAC(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
