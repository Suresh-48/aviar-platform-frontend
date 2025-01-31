import React from 'react'
import{Card,Col,Container,Row} from 'react-bootstrap'

 const Admindashboard = () => {
  return (
    <div>
      <Container>
    <Row>
      <Col>
<Card className="col-5  texte-center  bg-light rounded shadow" style={{padding:"1cm",marginLeft:"5cm"}}>

Active Enroll courses
<b/>
<b/>
<p className="text-center text-primary">0</p>
</Card>
</Col>
<Col >
<Card className="col-5   bg-light rounded shadow mr-4" style={{padding:"1cm",marginRight:"5cm", }}>

Completed courses
<p className="text-center text-primary"> 0 </p>
</Card>
</Col>
<Col >
<Card className="col-5   bg-light rounded shadow mr-4" style={{padding:"1cm",marginRight:"5cm", }}>

Completed courses
<p className="text-center text-primary"> 0 </p>
</Card>
</Col>

</Row>
</Container>
</div>

  )
}
export default Admindashboard
