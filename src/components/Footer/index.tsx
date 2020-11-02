import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import styles from './Footer.module.scss';
import {
  DEFICHAIN_IO_SITE,
  GITHUB_LINK,
  WHITE_PAPER_LINK,
  BLOCK_PAGE_BASE_PATH,
  RICH_LIST_PATH,
  TRANSACTION_BASE_PATH,
  BROADCAST_MESSAGE_PATH,
  VERIFY_MESSAGE_PATH,
  POOL_PATH,
  TOKEN_BASE_PATH,
  FOOTER_DEFICHAIN_STAMP,
  ANCHOR_PAGE,
} from '../../constants';

const FooterComponent = () => (
  <>
    <footer className={styles.footer}>
      <Row>
        <Col xs='6' md='4'>
          <Row>
            <Col xs='12' className='mb-3'>
              <h5>
                {I18n.t('components.footerComponent.explorer.explorerTitle')}
              </h5>
            </Col>
            <Col xs='6'>
              <Link to={BLOCK_PAGE_BASE_PATH}>
                {I18n.t('components.footerComponent.explorer.blocks')}
              </Link>
            </Col>
            <Col xs='6'>
              <Link to={RICH_LIST_PATH}>
                {I18n.t('components.footerComponent.explorer.richList')}
              </Link>
            </Col>
            <Col xs='6'>
              <Link to={TRANSACTION_BASE_PATH}>
                {I18n.t('components.footerComponent.explorer.transactions')}
              </Link>
            </Col>
            <Col xs='6'>
              <Link to={BROADCAST_MESSAGE_PATH}>
                {I18n.t('components.footerComponent.explorer.broadcastMessage')}
              </Link>
            </Col>
            <Col xs='6'>
              <Link to={VERIFY_MESSAGE_PATH}>
                {I18n.t('components.footerComponent.explorer.verifyMessage')}
              </Link>
            </Col>
            <Col xs='6'>
              <Link to={TOKEN_BASE_PATH}>
                {I18n.t('components.footerComponent.explorer.tokens')}
              </Link>
            </Col>
            <Col xs='6'>
              <Link to={POOL_PATH}>
                {I18n.t('components.footerComponent.explorer.pool')}
              </Link>
            </Col>
            <Col xs='6'>
              <Link to={ANCHOR_PAGE}>
                {I18n.t('components.footerComponent.explorer.anchoredBlocks')}
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs='6' md='2'>
          <Row>
            <Col xs='12' className='mb-3'>
              <h5>
                {I18n.t('components.footerComponent.deFiChain.deFiChainTitle')}
              </h5>
            </Col>
            <Col xs='12'>
              <a href={DEFICHAIN_IO_SITE} target='_blank'>
                {I18n.t('components.footerComponent.deFiChain.defiChainLink')}
              </a>
            </Col>
            <Col xs='12'>
              <a href={GITHUB_LINK} target='_blank'>
                {I18n.t('components.footerComponent.deFiChain.gitHubLink')}
              </a>
            </Col>
            <Col xs='12'>
              <a href={WHITE_PAPER_LINK} target='_blank'>
                {I18n.t('components.footerComponent.deFiChain.whitePaperLink')}
              </a>
            </Col>
          </Row>
        </Col>
        <Col xs='12' md='6'>
          <Row>
            <Col xs='12' className='mb-3'>
              &nbsp;
            </Col>
            <Col xs='12'>
              <p>{I18n.t('components.footerComponent.about.aboutContent')}</p>
              <p>
                {I18n.t('components.footerComponent.about.forMoreInfoNotice')}{' '}
                <a
                  className={styles.primaryLink}
                  href={DEFICHAIN_IO_SITE}
                  rel='nofollow'
                  target='_blank'
                >
                  {I18n.t('components.footerComponent.about.defiChainLink')}
                </a>
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs='12' className='text-secondary'>
          {FOOTER_DEFICHAIN_STAMP}
        </Col>
      </Row>
    </footer>
  </>
);

export default FooterComponent;
