import { formatAmount, translate } from "../../../assets/script/scripts";
import { OverlayTrigger, Popover } from "react-bootstrap";
import React, { Fragment } from "react";

function TableRowSavings(props) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header className="">Megtakarítás részletes adatai</Popover.Header>
      <Popover.Body>
        <table>
          <tr>
            <td className="thicker-font">Kapcsolódó számla: </td>
            <td>{translate(props.saving.bank_account_type)}</td>
          </tr>
          <tr>
            <td className="thicker-font">Megtakarítás típusa: &nbsp;&nbsp;</td>
            <td>{translate(props.saving.type)}</td>
          </tr>
          <tr>
            <td className="thicker-font">Állapot: </td>
            <td>{translate(props.saving.saving_status)}</td>
          </tr>
          <tr>
            <td className="thicker-font">Referenciaszám: </td>
            <td>{props.saving.reference_number}</td>
          </tr>
          <tr>
            <td className="thicker-font">Lekötés ideje: </td>
            <td>{props.saving.arrived_on}</td>
          </tr>
          <tr>
            <td className="thicker-font">Lekötött összeg: </td>
            <td>{formatAmount(props.saving.amount) + " " + props.saving.currency}</td>
          </tr>
          <tr>
            <td className="thicker-font">Lejárat dátuma: </td>
            <td>{props.saving.expire_date}</td>
          </tr>
          <tr>
            <td className="thicker-font">Lejáratkori összeg: </td>
            <td>
              {formatAmount(
                parseFloat(
                  ((props.saving.amount * props.saving.rate) / 100 / 365) * props.saving.duration +
                    parseFloat(props.saving.amount)
                ).toFixed(2)
              ) +
                " " +
                props.saving.currency}
            </td>
          </tr>
        </table>
      </Popover.Body>
    </Popover>
  );

  return (
    <Fragment>
      <OverlayTrigger placement="top" overlay={popover} delay="700">
        <tr className="help-cursor">
          <td>{props.col1}</td>
          <td>{props.col2}</td>
          <td>{props.col3}</td>
          <td>{props.col4}</td>
          <td className="right-aligned-column">{formatAmount(props.col5)}</td>
          <td className="center-aligned-column">{props.col6}</td>
          <td
            className={
              props.col7 === "Aktív"
                ? "text-success thicker-font center-aligned-column"
                : "text-danger thicker-font center-aligned-column"
            }
          >
            {props.col7}
          </td>
          <td>{props.col8}</td>
        </tr>
      </OverlayTrigger>
    </Fragment>
  );
}

export default TableRowSavings;
