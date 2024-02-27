
import React from 'react'
import { Container , Col , Row } from 'react-bootstrap'
export default function  FormContainer ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
        <Row className='justify-content-lg-center'>
            <Col xs={12} md= {6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}
