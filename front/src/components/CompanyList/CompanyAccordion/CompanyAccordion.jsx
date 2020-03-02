import React from 'react';
import { Accordion, Card, Button, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './companyAccordion.css';

export default function CompanyAccordion(props) {
    return (
        <Accordion defaultActiveKey="">
            {props.companies &&
                props.companies.map((company, index) =>
                    <Card className="card" key={index}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="button" eventKey={"" + index} >
                                {`${company._source.displayName}(${company._source.INN})`}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={"" + index} >
                            <Card.Body>
                                <ListGroup variant="null" className="card-body-list">
                                    <ListGroup.Item className="list-group-item">
                                        <Card.Text className="head">Full name: </Card.Text>
                                        <Card.Text className="body">{company._source.fullName}</Card.Text>
                                    </ListGroup.Item>
                                    {company._source.INN ?
                                        <ListGroup.Item className="list-group-item">
                                            <Card.Text className="head">INN: </Card.Text>
                                            <Card.Text className="body">{company._source.INN}</Card.Text>
                                        </ListGroup.Item>
                                        : <></>}
                                    {company._source.CPP ?
                                        <ListGroup.Item className="list-group-item">
                                            <Card.Text className="head">CPP: </Card.Text>
                                            <Card.Text className="body">{company._source.CPP}</Card.Text>
                                        </ListGroup.Item>
                                        : <></>}
                                    {company._source.OGRN ?
                                        <ListGroup.Item className="list-group-item">
                                            <Card.Text className="head">OGRN: </Card.Text>
                                            <Card.Text className="body">{company._source.OGRN}</Card.Text>
                                        </ListGroup.Item>
                                        : <></>}
                                    {company._source.legalAddress ?
                                        <ListGroup.Item className="list-group-item">
                                            <Card.Text className="head">Legal address: </Card.Text>
                                            <Card.Text className="body">{company._source.legalAddress.source}</Card.Text>
                                        </ListGroup.Item>
                                        : <></>}
                                    {company._source.actualAddress ?
                                        <ListGroup.Item className="list-group-item">
                                            <Card.Text className="head">Legal address: </Card.Text>
                                            <Card.Text className="body">{company._source.legalAddress.source}</Card.Text>
                                        </ListGroup.Item>
                                        : <></>}
                                    {company._source.OKVED && company._source.primaryOKVEDRefId ?
                                        <ListGroup.Item className="list-group-item">
                                            <Card.Text className="head">OKVED:</Card.Text>
                                            <ul className="body-ul">
                                                <li><div className="okved-head">primaryOKVEDRefId:</div><div className="okved-body">{company._source.primaryOKVEDRefId}</div></li>
                                                {company._source.OKVED.map((okved, i) =>
                                                    <li><div className="okved-head">OKVEDRefId:</div><div className="okved-body">{okved.OKVEDRefId}</div></li>
                                                )}
                                            </ul>
                                        </ListGroup.Item>
                                        : <></>}
                                </ListGroup>
                                        <LinkContainer to={`/companies/${company._id}/products`}>
                                                <Button className="products-button">Products</Button>
                                        </LinkContainer>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card >
                )
            }
        </Accordion >
    )
}

