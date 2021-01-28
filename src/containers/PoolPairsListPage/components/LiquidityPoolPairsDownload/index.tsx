import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { DEFICHAIN_DOWNLOAD_SITE } from '../../../../constants/settings';
import addliqCards from '../../../../assets/img/addliq-cards.png';
import styles from '../../PoolPairsListPage.module.scss';

const LiquidityPoolPairsDownload = () => {
  const downloadNow = () => {
    window.open(DEFICHAIN_DOWNLOAD_SITE, '_blank');
  };

  return (
    <Card className='mb-5'>
      <CardBody className='pb-0'>
        <Row>
          <Col md={6} sm={12} className={styles.lpBackgroundImg}>
            <img src={addliqCards} className={styles.lpDownloadImg} />
          </Col>
          <Col md={6} sm={12} className={styles.lpDownloadDescriptionWrapper}>
            <div className={`mb-2 ${styles.downloadDescription}`}>
              {I18n.t('containers.poolPairPage.liquidityPoolPairsDownload')}
            </div>
            <Button color='primary' onClick={downloadNow}>
              {I18n.t('containers.poolPairPage.downloadNow')}
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default LiquidityPoolPairsDownload;
