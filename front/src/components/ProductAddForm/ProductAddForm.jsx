import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import { addProductAC } from '../../redux/actions/actions'
import { Form, Button } from 'react-bootstrap'
import Calendar from 'react-calendar';
import './productAddForm.css';

class ProductAddForm extends React.Component {
    state = {
        type: "Warranty",
        date: new Date(),
    }
    validateDate(date) {
        return (String(date.getMonth() + 1).replace(/^(.)$/, "0$1") + '/' + String(date.getDate()).replace(/^(.)$/, "0$1") + '/' + date.getFullYear());
    }
    handleChangeDate = date => this.setState({ date })
    handleSelectType = e => this.setState({ type: e.target.value })
    handleSubmit = async (event) => {
        console.log(this.validateDate(this.state.date));

        await this.props.addProduct([{ companyId: this.props.company._id, id: uuidv1(), type: this.state.type, requiredDate: this.validateDate(this.state.date) }])
        await this.props.handleClickToogle()
    }
    render() {
        return (
            <Form className="productAddForm">
                <Form.Group className="addForm-group">
                    <Form.Label>Please select product type</Form.Label>
                    <Form.Control as="select" onChange={this.handleSelectType} required>
                        <option>Warranty</option>
                        <option>Loan</option>
                        <option>SCS account</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Please select the date</Form.Label>
                    <div className="calendar">
                        <Calendar
                            onChange={this.handleChangeDate}
                            value={this.state.date}
                            minDate={new Date()}
                        />
                    </div>
                </Form.Group>
                <Button className="productAdd-button" onClick={this.handleSubmit}>Add Product</Button>
            </Form>
        )
    }
}

function mapStateToProps(store) {
    return {
        company: store.company,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: data => dispatch(addProductAC(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm);