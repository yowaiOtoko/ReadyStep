import { Col } from "react-bootstrap";
import { FormGroup, Input, InputGroup, InputGroupText, Label } from "reactstrap";

export const TaskEditActions = () => {


    return (
        <FormGroup className="row">
            <Label className="col-sm-3 col-form-label">{'Temps'}</Label>
            <Col sm="9">
                <InputGroup>
                    <InputGroupText><i className="icofont icofont-clock-time"></i></InputGroupText>
                    <Input className="form-control digits" type="number" placeholder="Minutes" />
                </InputGroup>
            </Col>
        </FormGroup>
    )
};

