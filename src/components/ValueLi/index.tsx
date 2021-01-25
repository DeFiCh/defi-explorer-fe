import React, { useState } from 'react';
import EllipsisText from 'react-ellipsis-text';
import CopyToClipboard from '../CopyToClipboard';
import classnames from 'classnames';
import { I18n } from 'react-redux-i18n';
import styles from './ValueLi.module.scss';

interface ValueLiProps {
  copyable?: boolean | string;
  value?: string;
  clickble?: boolean;
  onclick: ([any]?: any) => void;
  label?: string;
  textLimit?: number | string;
}

const ValueLi: React.FunctionComponent<ValueLiProps> = (
  props: ValueLiProps
) => {
  const [copied, changeCopied] = useState(false);

  const handleCopy = () => {
    changeCopied(true);
    setTimeout(() => {
      changeCopied(false);
    }, 600);
  };

  return (
    <div className={styles.keyValueLi}>
      <div className={styles.value}>
        <div {...(props.clickble && { onClick: props.onclick })}>
          <div
            className={classnames({ 'd-flex': copied }, styles.copiedIndicator)}
          >
            {I18n.t('components.keyValueLi.copied')}
          </div>
          {props.value ? (
            <EllipsisText
              className={props.clickble && styles.valueLink}
              text={props.value}
              length={Number(props.textLimit ?? `50`)}
            />
          ) : (
            '-'
          )}
        </div>
      </div>
      <div>
        {props.value && props.copyable && (
          <CopyToClipboard value={props.value!} handleCopy={handleCopy} />
        )}
      </div>
    </div>
  );
};

export default ValueLi;
