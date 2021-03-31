import React, { useState } from "react";
import { I18n } from "react-redux-i18n";
import { Popover, PopoverBody } from "reactstrap";
import CopyToClipboard from "../CopyToClipboard";

interface Props {
  value: string;
  handleCopyFunction?: () => void;
  uid: string;
}

function CopyToClipIcon(props: Props) {
  const { value, handleCopyFunction, uid } = props;
  const [copied, changeCopied] = useState(false);
  const handleCopy = () => {
    changeCopied(true);
    if (handleCopyFunction) {
      handleCopyFunction();
    }
    setTimeout(() => {
      changeCopied(false);
    }, 600);
  };

  return (
    <>
      <span id={uid}>
        <CopyToClipboard value={value} handleCopy={handleCopy} />
      </span>
      <Popover placement="auto" isOpen={copied} target={uid} trigger="focus">
        <PopoverBody>{I18n.t("components.copyToClipIcon.copied")}</PopoverBody>
      </Popover>
    </>
  );
}

export default CopyToClipIcon;
