import React, { Fragment } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { ProjectTitle } from "../../../../../Constant";

const ActivityTitleRow = ({ register, errors }) => {
    return (
        <Fragment>
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Titre</Label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Titre de l'activité *"
                            {...register("name", { required: true })}
                        />
                        <span style={{ color: "red" }}>
                            {errors.title && "Title is required"}
                        </span>
                    </FormGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ActivityTitleRow;
