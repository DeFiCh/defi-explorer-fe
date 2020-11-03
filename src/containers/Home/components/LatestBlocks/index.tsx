import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { fetchLatestBlocks } from '../../../Websocket/reducer';
import styles from '../../Home.module.scss';
import { Card, Table, Row, Col, Button } from 'reactstrap';
import { BLOCK_PAGE_BASE_PATH } from '../../../../constants';
import moment from 'moment';

interface LatestBlocksComponentProps extends RouteComponentProps {
  blocks: any[];
  fetchLatestBlocks: () => void;
}

const LatestBlocksComponent: React.FunctionComponent<LatestBlocksComponentProps> = (
  props: LatestBlocksComponentProps
) => {
  const { blocks, fetchLatestBlocks } = props;

  useEffect(() => {
    fetchLatestBlocks();
  }, []);

  const loadRows = useCallback(() => {
    return blocks.map((block) => (
      <tr key={block.hash}>
        <td>
          <Link to={`${BLOCK_PAGE_BASE_PATH}/${block.hash}`}>
            {block.height}
          </Link>
        </td>
        <td>
          <div>{moment(block.time).fromNow()}</div>
        </td>
        <td>
          <div>{block.transactionCount}</div>
        </td>
        <td>
          <div>{block.size}</div>
        </td>
      </tr>
    ));
  }, [blocks]);

  return (
    <>
      <h1>
        <Row>
          <Col xs='10'>
            {I18n.t('containers.homePage.latestBlock.latestBlockTitle')}
          </Col>
          <Col xs='2'>
            <Button
              color='link'
              className='float-right'
              onClick={() => props.history.push(BLOCK_PAGE_BASE_PATH)}
            >
              {I18n.t('containers.homePage.viewAll')}
            </Button>
          </Col>
        </Row>
      </h1>
      <div>
        <Card className={styles.card}>
          <div className={`${styles.tableResponsive} table-responsive-xl`}>
            <Table className={styles.table}>
              <thead>
                <tr>
                  <th>{I18n.t('containers.homePage.latestBlock.height')}</th>
                  <th>{I18n.t('containers.homePage.latestBlock.time')}</th>
                  <th>
                    {I18n.t('containers.homePage.latestBlock.transactionCount')}
                  </th>
                  <th>{I18n.t('containers.homePage.latestBlock.size')}</th>
                </tr>
              </thead>
              <tbody>{loadRows()}</tbody>
            </Table>
          </div>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    websocket: {
      blockResponse: { data },
    },
  } = state;
  return {
    blocks: data,
  };
};

const mapDispatchToProps = {
  fetchLatestBlocks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestBlocksComponent);
