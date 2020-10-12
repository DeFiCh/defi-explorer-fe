import React, { EventHandler, useState } from "react";
import EllipsisText from "react-ellipsis-text";
import CopyToClipboard from "../CopyToClipboard";
import classnames from "classnames";
import QrCode from "../QrCode";
import { I18n } from "react-redux-i18n";
import styles from "./KeyValueLi.module.scss";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

interface KeyValueLiProps {
  copyable?: boolean | string;
  value?: string;
  popsQR?: any;
  uid?: any;
  label?: string;
  href?: string | boolean;
}

const KeyValueLi: React.FunctionComponent<KeyValueLiProps> = (
  props: KeyValueLiProps
) => {
  const [copied, changeCopied] = useState(false);

  const handleCopy = () => {
    changeCopied(true);
    setTimeout(() => {
      changeCopied(false);
    }, 600);
  };

  const prepareEllipsisHref = () => {
    if (props.href) {
      return (
        <Button to={props.href} tag={NavLink} color="link" className="p-0">
          <EllipsisText text={props.value} length={"50"} />
        </Button>
      );
    }
    return <EllipsisText text={props.value} length={"50"} />;
  };
  return (
    <div className={styles.keyValueLi}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.value}>
        <div
          className={classnames({ "d-flex": copied }, styles.copiedIndicator)}
        >
          {I18n.t("components.keyValueLi.copied")}
        </div>
        {prepareEllipsisHref()}
        {props.popsQR && (
          <QrCode value={props.value} uid={props.uid} qrClass={styles.qr} />
        )}
        {props.copyable && (
          <CopyToClipboard value={props.value!} handleCopy={handleCopy} />
        )}
      </div>
    </div>
  );
};

export default KeyValueLi;
