

import React, { Fragment } from 'react';
import { Card, Col, Row } from 'reactstrap';
import { H6, Image, LI, P, UL } from '../../../../../AbstractElements';
import { formatDate } from '../../../../../_helper/utils';


export const SessionCard = ({ session }) => {

    return (
        <Col xl='12'>
        <Card>
          <Row className='blog-box blog-list'>
            <Col sm='5'>
              <Image attrImage={{ className: 'img-fluid sm-100-w', src: '', alt: '' }} />
            </Col>
            <Col sm='7'>
              <div className='blog-details'>
                <div className='blog-date digits'>
                  { session.stratedAt ?
                    <><span>{session.startedAt.getDate() }</span> {formatDate(session.startedAt, {month: 'long', year: 'numeric' })}</>
                    : <><span>{session.createdAt.getDate() }</span> {formatDate(session.createdAt,  {month: 'long', year: 'numeric' })}</>
                  }
                </div>
                <H6>{session.name}</H6>
                <div className='blog-bottom-content'>
                  <UL attrUL={{ className: 'blog-social flex-row' }}>
                    <LI>{'by: Paige Turner'}</LI>
                    <LI attrLI={{ className: 'digits' }}>{'15 Hits'}</LI>
                  </UL>
                  <hr />
                  <P attrPara={{ className: 'mt-0' }}>{session.description}</P>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    );
};