import React from 'react';

const Invoice = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} style={{ maxWidth: '600px', margin: 'auto', paddingTop:'30' }}> {/* Adjust padding here */}
    <div className='text-center'>
    <div className='pt-2'></div>
      <h6 className='text-center'>{props.hardware_name}</h6>
      <a className='text-center text-decoration-none text-dark' style={{ fontSize: '11px' }}>📫 {props.hardware_address}</a><br />
      <a className='text-center text-decoration-none text-dark' style={{ fontSize: '11px' }}>📱 {props.hardware_phone}</a><br />
      <a className='text-center text-decoration-none text-dark' style={{ fontSize: '11px' }}>Invoice : {props.invoiceNumber}</a><br />
      <a className='text-center text-decoration-none text-dark' style={{ fontSize: '11px' }}>Cashier : {props.user}</a>
    </div>
    <table style={{ width: '100%', marginTop: '20px' , borderBottom: '1px dashed'}}>
      <thead>
        <tr style={{borderTop: '1px dashed', borderBottom: '1px dashed', marginTop: '2px'}}>
          <th style={{ fontSize: '11px' }}>Unit</th>
          <th style={{ fontSize: '11px' }}>Qty</th>
          <th style={{ fontSize: '11px' }}>Price</th>
          <th style={{ fontSize : '11px'}}>Discount</th>
          <th style={{ fontSize: '11px' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => (
          <React.Fragment key={index}>
            <tr>
              <td colSpan={'4'} style={{ fontSize: '13px' }}>{item.name}</td>
            </tr>
            <tr>
              <td style={{ fontSize: '11px', textAlign: "center" }}>{item.unit}</td>
              <td style={{ fontSize: '11px', textAlign: "center" }}>{item.quantity}</td>
              <td style={{ fontSize: '11px', textAlign: "center" }}>{item.price}</td>
              <td style={{ fontSize: '11px', textAlign: "center" }}>{item.discount}</td>
              <td style={{ fontSize: '11px',  textAlign: "right" }}>{item.quantity * item.price}</td>
            </tr>
          </React.Fragment>
        ))}
        <tr style={{ fontSize: '15px', borderTop: "1px dashed" , textAlign: "right"}}>
          <td colSpan={'3'}>Sub Total: </td>
          <td colSpan={'2'}>{props.items.reduce((acc, item) => acc + item.quantity * item.price, 0)}</td>

        </tr>

        <tr style={{ fontSize: '15px' , textAlign: "right"}}>
          <td colSpan={'3'}>Discount: </td>
          <td colSpan={'2'}>{props.items.reduce((acc, item) => acc + item.discount , 0)}</td>

        </tr>

        <tr style={{ fontSize: '15px' , textAlign: "right", borderBottom: "1px dashed"}}>
          <th colSpan={'3'}>Total: </th>
          <th colSpan={'2'}>{props.items.reduce((acc, item) => acc + item.quantity * item.price - item.discount, 0)}</th>

        </tr>

        <tr style={{ fontSize: '15px' , textAlign: "right", }}>
          <td colSpan={'3'}>Payment: </td>
          <td colSpan={'2'}>{props.payment}</td>

        </tr>

        <tr style={{ fontSize: '15px' , textAlign: "right", borderBottom: "1px dashed"}}>
          <th colSpan={'3'}>Balance: </th>
          <th colSpan={'2'}>{props.payment - props.items.reduce((acc, item) => acc + item.quantity * item.price - item.discount, 0)}</th>

        </tr>

        <tr style={{ fontSize: '11px', borderBottom: "1px dashed"}}>
          <td colSpan={'3'}>Date: {props.date}</td>
          <td colSpan={'2'} style={{ textAlign: 'right'}}>Time: {props.time}</td>

        </tr>

        <tr style={{ fontSize: '11px'}}>
          <td colSpan={'5'} style={{textAlign: 'center'}}>Thank you! Come Again</td>

        </tr>

        <tr style={{ fontSize: '11px'}}>
          <td colSpan={'5'} style={{textAlign: 'center'}}>www.bhanusunrisesolutions.io</td>

        </tr>
      </tbody>
    </table>
    
  </div>
));

Invoice.displayName = 'Invoice';
export default Invoice;
