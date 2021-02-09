import React from 'react';
import capitalize from 'lodash/capitalize';
import { I18n } from 'react-redux-i18n';
import { Col, Row } from 'reactstrap';
import KeyValueLi from '../../../../components/KeyValueLi';
import { numberWithCommas } from '../../../../utils/utility';
import { DEFAULT_DECIMAL_PLACE } from '../../../../constants';

interface TokenPageProps {
  data: any;
}

const TokenDetails = (props: TokenPageProps) => {
  const { data } = props;

  return (
    <Row className='mb-5'>
      <Col xs='12'>
        <Row>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.name')}
              value={`${
                data.isLPS ? `Liquidity token for ${data.symbolKey}` : data.name
              }`}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.symbol')}
              value={`${data.symbolKey}`}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.tokenId')}
              value={`${data.tokenId}`}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.category')}
              value={`${data.category}`}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.decimal')}
              value={`${data.decimal}`}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.limit')}
              value={`${data.limit}`}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.mintable')}
              value={capitalize(data.mintable)}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.tradeable')}
              value={capitalize(data.tradeable)}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.isLPS')}
              value={capitalize(data.isLPS)}
            />
          </Col>

          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.minted')}
              value={`${numberWithCommas(data.minted, DEFAULT_DECIMAL_PLACE)}`}
            />
          </Col>
          {!!data.burned && (
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.tokenPage.burned')}
                value={`${numberWithCommas(
                  data.burned,
                  DEFAULT_DECIMAL_PLACE
                )}`}
              />
            </Col>
          )}
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.netSupply')}
              value={`${numberWithCommas(
                data.netSupply,
                DEFAULT_DECIMAL_PLACE
              )}`}
            />
          </Col>

          {!!data.burnAddress && (
            <Col xs='12' md='4'>
              <KeyValueLi
                label={I18n.t('containers.tokenPage.burnAddress')}
                value={data.burnAddress}
              />
            </Col>
          )}

          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.finalized')}
              value={capitalize(data.finalized)}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.creationHeight')}
              value={`${data.creationHeight}`}
            />
          </Col>
          <Col xs='12' md='4'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.destructionHeight')}
              value={`${data.destructionHeight}`}
            />
          </Col>
          {data.collateralAddress && data.collateralAddress !== 'undefined' && (
            <Col xs='12' md='8'>
              <KeyValueLi
                label={I18n.t('containers.tokenPage.collateralAddress')}
                value={data.collateralAddress}
              />
            </Col>
          )}
          <Col xs='12'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.creationTx')}
              value={`${data.creationTx}`}
              noEllipsis
            />
          </Col>
          <Col xs='12'>
            <KeyValueLi
              label={I18n.t('containers.tokenPage.destructionTx')}
              value={`${data.destructionTx}`}
              noEllipsis
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TokenDetails;
