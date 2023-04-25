

import React, { Fragment } from 'react';
import { Button, Card, Col, Row } from 'reactstrap';
import { H6, Image, LI, P, UL } from '../../../../../AbstractElements';
import { formatDate } from '../../../../../_helper/utils';
import { useHttp } from '../../../../../_helper/http/useHttp';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';


export const SessionCard = ({ session }) => {

  const history = useNavigate();
  const http = useHttp();
  const onJoinSession = (id) => {
    const promise = http.post(`api/app/session/${id}/join`).then((data) => {
      history(`/learn/session/show/${id}`);
    });

    toast.promise(promise, {
      // loading: 'Rejoindre...',
      error: 'Une erreur est survenue',
    });
  }
  return (
      <Col xl='12'>
      <Card>
        <Row className='blog-box blog-list'>
          <Col sm='5'>
          <Image attrImage={{ className: 'img-fluid sm-100-w', src: `${require('../../../../../assets/images/faq/1.jpg')}`, alt: '' }} />
          </Col>
          <Col sm='7'>
            <div className="d-flex justify-content-end pt-3">
              <Button onClick={() => onJoinSession(session.id)} className="btn btn-md btn-secondary me-2 ">
                  Rejoindre
              </Button>
            </div>
            <div className='blog-details'>
              <div className='blog-date digits'>
                { session.stratedAt ?
                  <><span>{(session.startedAt.getDate() + "").padStart(2, '0') }</span> {formatDate(session.startedAt, {month: 'long', year: 'numeric' })}</>
                  : <><span>{(session.createdAt.getDate() + "").padStart(2, '0') }</span> {formatDate(session.createdAt,  {month: 'long', year: 'numeric' })}</>
                }
              </div>
              <H6>{session.name}</H6>
              <div className='blog-bottom-content'>
                <UL attrUL={{ className: 'blog-social flex-row' }}>
                  <LI>Par {session.author}</LI>

                  <LI attrLI={{ className: 'digits' }}>
                    {
                      session.userCount ? `${session.userCount} Utilisateur ${session.userCount > 1 ? 's' : ''}`
                      : 'Aucun utilisateur'
                    }
                  </LI>
                </UL>
                <hr />
                <P attrPara={{ className: 'mt-0' }}>{session.description}</P>
              </div>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Card>
    </Col>
  );
};