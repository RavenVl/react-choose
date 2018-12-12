import {Button, ButtonGroup, Panel} from 'react-bootstrap';
import React, {Component} from 'react';

//import data from "../data/data";

class Group extends Component {
    render() {

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{this.props.title}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <ButtonGroup>
                        {this.props.data.map(elem => {
                                return <Button  bsStyle={elem.visible}
                                                disabled={elem.disable}
                                                key={elem.item}
                                               onClick={() => this.props.click(this.props.type, elem.item)}>
                                    {elem.item}
                                </Button>

                            }
                        )
                        }
                    </ButtonGroup>
                </Panel.Body>
            </Panel>

        );
    }
}

export default Group;