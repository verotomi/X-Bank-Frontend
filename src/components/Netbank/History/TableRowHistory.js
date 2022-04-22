import { formatAmount, translate } from "../../../assets/script/scripts";
import { OverlayTrigger, Popover } from "react-bootstrap";
import React, { Fragment } from "react";
import replace from "lodash/replace";

function TableRowHistory(props) {
  let tempComment = replace(props.col4, "Early withdrawal", "Betét feltörése");
  tempComment = replace(tempComment, "Cash withdrawal ", "Készpénzfelvétel");
  tempComment = replace(tempComment, "Cash withdrawal with creditcard", "Készpénzfelvétel bankkártyával");
  tempComment = replace(tempComment, "fund withdrawal", "tőke jóváírás");
  tempComment = replace(tempComment, "interest withdrawal", "kamat jóváírás");
  tempComment = replace(tempComment, "Random comment", "Véletlen-generált megjegyzés");
  tempComment = replace(tempComment, "Random partner", "Véletlen-generált partner");
  tempComment = replace(tempComment, "Saving", "Betétlekötés");
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header className="">Tranzakció részletei</Popover.Header>
      <Popover.Body>
        <table>
          <tr>
            <td rowSpan={2} className="thicker-font">
              Kapcsolódó számla:{" "}
            </td>
            <td>{translate(props.transaction.type)}</td>
          </tr>
          <tr>
            <td style={{ border: "0px" }}>{translate(props.transaction.number)}</td>
          </tr>
          <tr>
            <td className="thicker-font">Összeg: </td>
            <td className={props.direction === "in" ? "text-dark thicker-font" : "text-danger thicker-font"}>
              {formatAmount(props.transaction.amount) + " " + props.transaction.currency}
            </td>
          </tr>
          <tr>
            <td className="thicker-font">Tranzakció típusa: </td>
            <td>{translate(props.transaction.transaction_type)}</td>
          </tr>
          <tr>
            <td className="thicker-font">Tranzakció iránya: </td>
            <td>{translate(props.transaction.direction)}</td>
          </tr>
          <tr>
            <td className="thicker-font">Parter neve:</td>
            <td>
              {props.transaction.partner_name == null || props.transaction.partner_name === ""
                ? " - "
                : translate(props.transaction.partner_name)}
            </td>
          </tr>
          <tr>
            <td className="thicker-font">Partner számlaszáma: &nbsp;&nbsp;</td>
            <td>
              {props.transaction.partner_account_number == null || props.transaction.partner_account_number === ""
                ? " - "
                : props.transaction.partner_account_number}
            </td>
          </tr>
          <tr>
            <td className="thicker-font">Közlemény: </td>
            <td>{tempComment === "" ? " - " : translate(tempComment)}</td>
          </tr>
          <tr>
            <td className="thicker-font">Referenciaszám:&nbsp;&nbsp;&nbsp;</td>
            <td>{props.transaction.reference_number}</td>
          </tr>
          <tr>
            <td className="thicker-font">Könyvelés ideje: </td>
            <td>{props.transaction.arrived_on}</td>
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
          <td>{translate(props.col2)}</td>
          <td>{translate(props.col3)}</td>
          <td>{translate(tempComment)}</td>
          <td
            className={
              props.direction === "in"
                ? "text-dark right-aligned-column thicker-font"
                : "text-danger right-aligned-column thicker-font"
            }
          >
            {formatAmount(props.col5) + " " + props.currency}
          </td>
        </tr>
      </OverlayTrigger>
    </Fragment>
  );
}

export default TableRowHistory;
